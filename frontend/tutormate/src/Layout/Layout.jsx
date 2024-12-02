import React from "react";
import { Outlet } from "react-router-dom"; // Outlet is used to render nested routes
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* This is where the page content will be displayed */}
      </div>
    </div>
  );
}

export default Layout;
