import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title">
        <p>Notes App</p>
      </div>
      <div className="nav-login">
        <p>Login as</p>
        <Link style={{ textDecoration: "none" }} to="/about">
          About Us
        </Link>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
