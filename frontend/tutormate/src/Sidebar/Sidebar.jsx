import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar">
      <h2 onClick={() => handleNavigate("/dashboard")}>TutorMate</h2>
      <ul>
        <li onClick={() => handleNavigate("/profilepage")}>Profile</li><hr />
        <li onClick={() => handleNavigate("/dashboard")}>Dashboard</li><hr />
        <li onClick={() => handleNavigate("/calendarview")}>Calendar</li><hr />
        <li onClick={() => handleNavigate("/settings")}>Settings</li>
        <li className="logout" onClick={() => handleNavigate("/")}>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
