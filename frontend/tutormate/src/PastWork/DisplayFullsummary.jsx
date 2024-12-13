import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./DisplayFullsummary.css";

function DisplayFullsummary() {
  const location = useLocation();
  const [summary, setSummary] = useState(null); // State to hold the full summary
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Extract parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const fullsummaryId = queryParams.get("fullsummary_id");

    if (!fullsummaryId) {
      setError("Missing required full summary ID in the query string.");
      setLoading(false);
      return;
    }

    // API call to fetch the full summary
    fetch(`/api/get-fullsummary/?fullsummary_id=${fullsummaryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch full summary.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status === "success" && data.summary) {
          // Extract the nested summary object
          const extractedSummary = data.summary.summary;
          setSummary(extractedSummary); // Set the extracted summary
        } else {
          throw new Error(data.message || "Error fetching full summary.");
        }
      })
      .catch((err) => {
        console.error("Error fetching full summary:", err);
        setError(err.message || "Failed to fetch full summary.");
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
            <p>Loading summary...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : summary ? (
            <div className="FullSum">
              <h3 className="title">{summary.title || "Summary"}</h3>
              <p className="content">{summary.content}</p>
              <div className="sections">
                {summary.sections?.map((section, index) => (
                  <div key={index} className="section">
                    <h4>{section.section_title}</h4>
                    <p>{section.section_summary}</p>
                  </div>
                ))}
              </div>
              {summary.conclusion && (
                <div className="conclusion">
                  <h4>Conclusion</h4>
                  <p>{summary.conclusion}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No summary available for this module.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayFullsummary;
