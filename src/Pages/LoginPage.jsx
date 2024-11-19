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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded">
        <header className="text-center mb-4">
          <h1 className="hj fw-bold">Welcome to Notes App</h1>
          <p className="text-muted">Please Login to Continue</p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control border border-secondary"
              type="text"
              name="username"
              onChange={handleInput}
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control border border-secondary"
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Password"
            />
          </div>
          <button
            className="btn btn-lg btn-white border border-dark p-2 w-100 button-hover"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <span>
            <Link to="/register" className="text-primary text-decoration-none">
              Register here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
