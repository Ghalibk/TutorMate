import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./SummaryOpt.css";

function SummaryOpt() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract courseid and module from the current URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseid");
  const module = queryParams.get("module");

  const handleNavigate = (path, summaryType) => {
    // Build the new URL with all query parameters
    const newPath = `/${path}?courseid=${courseId}&module=${encodeURIComponent(
      module
    )}&summarytype=${summaryType}`;
    navigate(newPath); // Use `navigate` to redirect
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div className="Options">
            <h3 className="Title">Choose a summary type!</h3>
            <button
              className="flashcard"
              onClick={() => handleNavigate("flashcardspage", "flashcards")}
            >
              Flashcards
            </button>
            <button
              className="BulletPoints"
              onClick={() => handleNavigate("bulletpoint", "bulletpoints")}
            >
              Bullet Points
            </button>
            <button
              className="FullSummary"
              onClick={() => handleNavigate("fullsummary", "fullsummary")}
            >
              Full Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryOpt;
