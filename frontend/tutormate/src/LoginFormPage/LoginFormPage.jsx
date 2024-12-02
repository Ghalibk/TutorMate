import React, { useState } from "react";
import Outlook_Icon from "../assets/outlook_icon.webp";


function LoginFormPage() {
  const handleLogin = () => {
    window.location.href = '/login/';
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
    
      <div className="submit-container">
      <button className="outlook-button" onClick={handleLogin}>
        <img src={Outlook_Icon} alt="Outlook Icon" />
        Login with Outlook
      </button>
      </div>
    </div>
  );
}

export default LoginFormPage;
