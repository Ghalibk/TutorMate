import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import User_Icon from "../assets/user_icon.png";
import Email_Icon from "../assets/email_icon.png";
import Password_Icon from "../assets/password_icon.png";
import Outlook_Icon from "../assets/outlook_icon.webp";

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpTokenClick = () => {
    window.location.href = '/token';
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>
      <div className="login-with-outlook">
        <button className="outlook-button">
          <img src={Outlook_Icon} alt="Outlook Logo" />
          Sign Up with Outlook
        </button>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={User_Icon} alt="" />
          <input type="name" placeholder="Name" />
        </div>
        <div className="input">
          <img src={Email_Icon} alt="" />
          <input type="email" placeholder="E-mail address" />
        </div>
        <div className="input">
          <img src={Password_Icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="input">
          <img src={Password_Icon} alt="" />
          <input type="password" placeholder="Re-enter Password" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSignUpTokenClick}>
          Sign Up
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
