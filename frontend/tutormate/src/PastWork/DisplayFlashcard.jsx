import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FlashcardArray from "../Flashcards/FlashcardArray.jsx";

function DisplayFlashcard() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const flashcardId = queryParams.get("flashcard_id");
  
    if (!flashcardId) {
      setError("Missing flashcard ID in the query parameters.");
      setLoading(false);
      return;
    }
  
    console.log("Fetching flashcards for ID:", flashcardId);
  
    fetch(`/api/get-flashcard/?flashcard_id=${flashcardId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flashcards.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status === "success" && data.flashcards?.flashcards) {
          setCards(data.flashcards.flashcards || []);
        } else {
          throw new Error(data.message || "Error fetching flashcards.");
        }
      })
      .catch((err) => {
        console.error("Error fetching flashcards:", err);
        setError(err.message || "Failed to fetch flashcards.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          {loading ? (
            <p>Loading flashcards...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : cards.length > 0 ? (
            <FlashcardArray cards={cards} />
          ) : (
            <p>No flashcards available. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayFlashcard;
