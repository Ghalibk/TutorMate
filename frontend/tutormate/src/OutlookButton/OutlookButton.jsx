import React from "react";
import { useNavigate } from "react-router-dom";
import Outlook_Icon from "../assets/outlook_icon.webp"; // Path to the Outlook icon
import "./OutlookButton.css"; // Styling for the button page

function OutlookButtonPage() {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    window.location.href = "/login"; // Redirect to the login form page
  };

  return (
    <div className="outlook-button-container">
      <button className="outlook-button" onClick={handleRedirectToLogin}>
        <img src={Outlook_Icon} alt="Outlook Icon" />
        Login with Outlook
      </button>
    </div>
  );
}

export default OutlookButtonPage;
