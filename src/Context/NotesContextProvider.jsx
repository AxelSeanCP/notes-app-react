import { useState, useEffect } from "react";
import PropType from "prop-types";
import { jwtDecode } from "jwt-decode";
import api from "../utils/AxiosApiHelper";
import { NotesContext } from "./NotesContext";

function NotesContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  //Users
  const searchUser = async (username) => {
    try {
      const response = await api.get(`/users?username=${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { users } = response.data.data;
        return users;
      }
    } catch (error) {
      alert("Search user failed. Please try again");
      console.error(
        "Search User Error: ",
        error.response?.data || error.message
      );
    }
  };

  //Authentications
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      const { fullname } = JSON.parse(user);

      setIsAuthenticated(true);
      setUser(fullname);
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
        localStorage.clear();

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
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/notes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  const getNoteById = async (noteId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/notes/${noteId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { note } = response.data.data;
        return note;
      }
    } catch (error) {
      alert("Get detail note failed. Please try again");
      console.error("Get Note error: ", error.response?.data || error.message);
    }
  };

  const addNote = async (title, body, tags) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(
        "/notes",
        { title, tags, body },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Add notes successfull");
      }
    } catch (error) {
      alert("Add notes failed. Please try again");
      console.error("Add Notes error: ", error.response?.data || error.message);
    }
  };

  const editNote = async (noteId, title, body, tags) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(
        `/notes/${noteId}`,
        { title, body, tags },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Edit notes successfull");
      }
    } catch (error) {
      alert("Edit notes failed. Please try again");
      console.error(
        "Edit Notes error: ",
        error.response?.data || error.message
      );
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.delete(`/notes/${noteId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Delete notes successfull");
      }
    } catch (error) {
      alert("Delete notes failed. Please try again");
      console.error(
        "Delete Notes error: ",
        error.response?.data.message || error.message
      );
    }
  };

  //Collaborations
  const addCollaborator = async (noteId, userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(
        "/collaborations",
        { noteId: noteId, userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Add collaborator successfull");
        console.log("Add Collaborator successfull");
      }
    } catch (error) {
      alert("Add collaborator failed. Please try again");
      console.error(
        "Add Collaborator Error: ",
        error.response?.data || error.message
      );
    }
  };

  const deleteCollaborator = async (noteId, userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.delete("/collaborations", {
        data: { noteId, userId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Delete collaborator successfull");
        console.log("Delete Collaborator successfull");
      }
    } catch (error) {
      alert("Delete collaborator failed. Please try again");
      console.error(
        "Delete Collaborator Error: ",
        error.response?.data || error.message
      );
    }
  };

  const contextValue = {
    isAuthenticated,
    user,
    searchUser,
    register,
    login,
    logout,
    getNotes,
    getNoteById,
    editNote,
    deleteNote,
    addNote,
    addCollaborator,
    deleteCollaborator,
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
