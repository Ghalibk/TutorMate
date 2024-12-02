import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Courses from "../Courses/Courses.jsx"
import "./Dashboard.css";


function Dashboard() {
  
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          <Courses></Courses>
          <Courses></Courses>
          <Courses></Courses>
          <Courses></Courses>
          <Courses></Courses>
          <Courses></Courses>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
