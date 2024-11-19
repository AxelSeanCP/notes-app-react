import "./CSS/LoginPage.css";
import { Link } from "react-router-dom";
import { NotesContext } from "../Context/NotesContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(NotesContext);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = input;
    if (username !== "" && password !== "") {
      await login(username, password);
      navigate("/");
    } else {
      alert("Please fill out all fields");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginpage">
      <div className="loginpage-container">
        <header>
          <h1>Welcome to Notes App</h1>
          <p>Please Login to Continue</p>
        </header>
        <form onSubmit={handleSubmit} className="loginpage-fields">
          <input
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
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
