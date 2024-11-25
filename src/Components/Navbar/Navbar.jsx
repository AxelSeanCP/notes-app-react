import { Link } from "react-router-dom";
import "./Navbar.css";
import { NotesContext } from "../../Context/NotesContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(NotesContext);

  return (
    <div className="d-flex justify-content-between p-3 shadow-sm">
      <div className="nav-title d-flex align-items-center gap-2">
        <p className="m-0 fs-2 text-dark fw-bold nav-title-text">Notes App</p>
      </div>
      <div className="nav-login d-flex align-items-center gap-4">
        <p className="m-0 text-dark">Logged in as {user}</p>
        <Link style={{ textDecoration: "none" }} to="/about">
          <p className="m-0 text-primary">About Us</p>
        </Link>
        <Link to="/logout">
          <button className="btn btn-outline-dark rounded-pill">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
