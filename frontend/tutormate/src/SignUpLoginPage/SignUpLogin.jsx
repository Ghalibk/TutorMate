import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpLogin.css";

function SignUpLogin() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    window.location.href = '/signup';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">SignUp/Login</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSignUpClick}>
          Sign Up
        </div>
        <div className="submit" onClick={handleLoginClick}>
          Login
        </div>
      </div>
    </div>
  );
}

export default SignUpLogin;
