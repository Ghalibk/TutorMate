import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpLogin.css";
import Logo from "../assets/logo.png";

function SignUpLogin() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    window.location.href = '/signup';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="main-layout">
      {/* Logo at the top */}
      <img src={Logo} alt="Logo" className="Logo" />
      
      {/* Card containing header and buttons */}
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
    </div>
  );
}

export default SignUpLogin;
