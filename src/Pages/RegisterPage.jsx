import "./CSS/RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="registerpage">
      <div className="registerpage-container">
        <header>
          <h1>Welcome to Notes App</h1>
          <p>Please Register to Continue</p>
        </header>
        <div className="registerpage-fields">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Full Name" />
          <input type="password" placeholder="Password" />
          <button>Register</button>
        </div>
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
