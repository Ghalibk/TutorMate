import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./ViewPastSummary.css";

function ViewPastSummary() {
  const [flashcards, setFlashcards] = useState([]); // State for flashcards
  const [bulletPoints, setBulletPoints] = useState([]); // State for bullet points
  const [fullSummaries, setFullSummaries] = useState([]); // State for full summaries
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    fetch("/api/get-summaries/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status === "success") {
          setFlashcards(data.flashcards || []);
          setBulletPoints(data.bullet_points || []);
          setFullSummaries(data.full_summaries || []);
        } else {
          setError(data.message || "Failed to fetch summaries.");
        }
      })
      .catch((err) => {
        console.error("Error fetching summaries:", err);
        setError(err.message || "Failed to load summaries.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          {loading ? (
            <p>Loading summaries...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="SummariesContainer">
              <div className="FlashcardsSection">
                <h3>Flashcards</h3>
                {flashcards.length > 0 ? (
                  flashcards.map((flashcard) => (
                    <div key={flashcard.flashcard_id} className="SummaryCard">
                      <h3 className="SummaryID">
                        {flashcard.course_name} ({flashcard.flashcard_id})
                      </h3>
                      <p className="SummaryModule">Module: {flashcard.module_name}</p>
                      <button
                        className="ViewSummary"
                        onClick={() =>
                          handleNavigate(`/displayflashcard?flashcard_id=${flashcard.flashcard_id}`)
                        }
                      >
                        View Flashcard
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No flashcards available.</p>
                )}
              </div>

              <div className="BulletPointsSection">
                <h3>Bullet Points</h3>
                {bulletPoints.length > 0 ? (
                  bulletPoints.map((bulletPoint) => (
                    <div key={bulletPoint.bulletpoint_id} className="SummaryCard">
                      <h3 className="SummaryID">
                        {bulletPoint.course_name} ({bulletPoint.bulletpoint_id})
                      </h3>
                      <p className="SummaryModule">Module: {bulletPoint.module_name}</p>
                      <button
                        className="ViewSummary"
                        onClick={() =>
                          handleNavigate(`/displaybulletpoint?bulletpoint_id=${bulletPoint.bulletpoint_id}`)
                        }
                      >
                        View Bullet Points
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No bullet points available.</p>
                )}
              </div>

              <div className="FullSummariesSection">
                <h3>Full Summaries</h3>
                {fullSummaries.length > 0 ? (
                  fullSummaries.map((fullSummary) => (
                    <div key={fullSummary.fullsummary_id} className="SummaryCard">
                      <h3 className="SummaryID">
                        {fullSummary.course_name} ({fullSummary.fullsummary_id})
                      </h3>
                      <p className="SummaryModule">Module: {fullSummary.module_name}</p>
                      <button
                        className="ViewSummary"
                        onClick={() =>
                          handleNavigate(`/displayfullsummary?fullsummary_id=${fullSummary.fullsummary_id}`)
                        }
                      >
                        View Full Summary
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No full summaries available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPastSummary;
