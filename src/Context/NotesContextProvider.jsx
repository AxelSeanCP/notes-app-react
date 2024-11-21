import { useState, useEffect } from "react";
import PropType from "prop-types";
import { jwtDecode } from "jwt-decode";
import api from "../utils/AxiosApiHelper";
import { NotesContext } from "./NotesContext";

function NotesContextProvider({ children }) {
  //Authentications
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    if (token) {
      setIsAuthenticated(true);
      setUser(user.fullname);
    }
    setIsLoading(false);
  }, []);

  const register = async (username, fullname, password) => {
    try {
      const response = await api.post("/users", {
        username,
        fullname,
        password,
      });

      if (response.status === 201) {
        console.log("Register successfull");
        alert("Register successfull");
      }
    } catch (error) {
      alert("Register failed. Please try again");
      console.error("Register error: ", error.response?.data || error.message);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/authentications", {
        username: username,
        password: password,
      });

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const decoded = jwtDecode(accessToken);
        const userId = decoded.id;

        const userResponse = await api.get(`/users/${userId}`);
        const user = userResponse.data.data.user;

        localStorage.setItem("user", JSON.stringify(user));

        setIsAuthenticated(true);
        setUser(user.fullname);

        alert("Successfully Logged In");
        console.log("Login successfull");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials");
      console.error("Login error: ", error.response?.data || error.message);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await api.delete("/authentications", {
        data: { refreshToken },
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setIsAuthenticated(false);
        setUser("");

        console.log("Logout successfull");
      }
    } catch (error) {
      alert("Logout failed. Please try again");
      console.error("Logout error: ", error.response?.data || error.message);
    }
  };

  //Notes
  const getNotes = async () => {
    try {
      const response = await api.get("/notes");

      if (response.status === 200) {
        const { notes } = response.data.data;
        return notes || [];
      }
    } catch (error) {
      alert("Get notes failed. Please try again");
      console.error("Get Notes error: ", error.response?.data || error.message);
      return [];
    }
  };

  const contextValue = {
    isAuthenticated,
    user,
    register,
    login,
    logout,
    getNotes,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {!isLoading ? children : <div>Loading.....</div>}
    </NotesContext.Provider>
  );
}

NotesContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default NotesContextProvider;
