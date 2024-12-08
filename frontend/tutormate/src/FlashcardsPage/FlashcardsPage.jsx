import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FlashcardArray from "../Flashcards/FlashcardArray.jsx";



function FlashcardsPage() {
  const cards = [
    { id: 1, frontHTML: "Front 1", backHTML: "Back 1" },
    { id: 2, frontHTML: "Front 2", backHTML: "Back 2" },
    { id: 3, frontHTML: "Front 3", backHTML: "Back 3" },
    { id: 4, frontHTML: "Front 4", backHTML: "Back 4" },
    { id: 5, frontHTML: "Front 5", backHTML: "Back 5" },
  ];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <FlashcardArray cards={cards} />
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;