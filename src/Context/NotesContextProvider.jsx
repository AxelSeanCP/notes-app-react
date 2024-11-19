import { useState } from "react";
import PropType from "prop-types";
import axios from "axios";
import { NotesContext } from "./NotesContext";

function NotesContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = "http://localhost:3000";

  const register = async (username, fullname, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/users`,
        {
          username,
          fullname,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const response = await axios.post(
        `${API_URL}/authentications`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const responseData = await response.data;
        const { accessToken, refreshToken } = responseData.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
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

      const response = await axios.delete(`${API_URL}/authentications`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          refreshToken: refreshToken,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        alert("Successfully Logout");
        console.log("Logout successfull");
      }
    } catch (error) {
      alert("Logout failed. Please try again");
      console.error("Logout error: ", error.response?.data || error.message);
    }
  };

  const contextValue = { isAuthenticated, register, login, logout };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}

NotesContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default NotesContextProvider;
