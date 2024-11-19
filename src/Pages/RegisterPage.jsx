import "./CSS/RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { NotesContext } from "../Context/NotesContext";

const RegisterPage = () => {
  const { register } = useContext(NotesContext);
  const [input, setInput] = useState({
    username: "",
    fullname: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, fullname, password } = input;
    if (username !== "" && fullname !== "" && password !== "") {
      register(username, fullname, password);
      navigate("/login");
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

  return (
    <div className="registerpage">
      <div className="registerpage-container">
        <header>
          <h1>Welcome to Notes App</h1>
          <p>Please Register to Continue</p>
        </header>
        <form onSubmit={handleSubmit} className="registerpage-fields">
          <input
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="Username"
          />
          <input
            type="text"
            name="fullname"
            onChange={handleInput}
            placeholder="Full Name"
          />
          <input
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
        <p className="registerpage-login">
          Already have an account?{" "}
          <span>
            <Link to="/login">Login here</Link>
          </span>
        </p>
        <div className="registerpage-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
