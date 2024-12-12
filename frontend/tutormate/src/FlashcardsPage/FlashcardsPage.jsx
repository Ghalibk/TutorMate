import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FlashcardArray from "../Flashcards/FlashcardArray.jsx";

function FlashcardsPage() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseid");
    const module = queryParams.get("module");

    if (!courseId || !module) {
      setError("Missing course ID or module in the query parameters.");
      setLoading(false);
      return;
    }

    console.log("Payload sent to API:", { course_id: courseId, module_name: module });

    fetch("/api/generate-flashcards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: courseId,
        module_name: module,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate flashcards.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status === "success") {
          // Check if flashcards is a string and parse it if necessary
          const parsedFlashcards =
            typeof data.flashcards === "string"
              ? JSON.parse(data.flashcards).flashcards
              : data.flashcards;
    
          setCards(Array.isArray(parsedFlashcards) ? parsedFlashcards : []);
        } else {
          throw new Error(data.message || "Error generating flashcards.");
        }
      })
      .catch((err) => {
        console.error("Error fetching flashcards:", err);
        setError(err.message || "Failed to fetch flashcards.");
      })
      .finally(() => {
        setLoading(false); // Mark loading as complete
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
            <p>No flashcards available for this module. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;
