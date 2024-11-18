import "./CSS/LoginPage.css";
import { Link } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(NotesContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  useEffect(() => {
    alert("Please login");
  }, []);

  return (
    <div className="loginpage">
      <div className="loginpage-container">
        <header>
          <h1>Welcome to Notes App</h1>
          <p>Please Login to Continue</p>
        </header>
        <div className="loginpage-fields">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
        </div>
        <p className="loginpage-register">
          Don&apos;t have an account?{" "}
          <span>
            <Link to="/register">Register here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
