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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded">
        <header className="text-center mb-4">
          <h1 className="h1 fw-bold">Welcome to Notes App</h1>
          <p className="text-muted">Please Register to Continue</p>
        </header>
        <div>
          <div className="mb-3">
            <input
              className="form-control border border-secondary"
              type="text"
              name="username"
              onChange={handleInput}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control border border-secondary"
              type="text"
              name="fullname"
              onChange={handleInput}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control border border-secondary"
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Password"
              required
            />
          </div>
          <button
            className="btn btn-outline-dark btn-lg p-2 w-100"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Login here
          </Link>
        </p>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <input type="checkbox" className="me-2" id="terms" />
          <label htmlFor="terms" className="text-muted small">
            By continuing, I agree to the terms of use & privacy policy
          </label>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
