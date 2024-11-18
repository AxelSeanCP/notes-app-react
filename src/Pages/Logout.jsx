import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";

const Logout = () => {
  const { logout } = useContext(NotesContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null;
};

export default Logout;
