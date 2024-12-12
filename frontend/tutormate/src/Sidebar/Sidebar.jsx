import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../assets/Logo.png"

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar">
      <img src={Logo} alt="" className="Logo" onClick={() => handleNavigate("/dashboard")}/>
      <ul>
        <li onClick={() => handleNavigate("/profilepage")}>Profile</li><hr />
        <li onClick={() => handleNavigate("/dashboard")}>Dashboard</li><hr />
        <li onClick={() => handleNavigate("/pastwork")}>Past Work</li><hr />
        <li onClick={() => handleNavigate("/calendarview")}>Calendar</li><hr />
        <li className="logout" onClick={() => handleNavigate("/")}>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
