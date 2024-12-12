import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./FullSummary.css";

function FullSummary() {
  const location = useLocation();
  const [summary, setSummary] = useState(null); // State to hold the full summary
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Extract parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseid");
    const module = queryParams.get("module");
    const summaryType = queryParams.get("summarytype");

    if (!courseId || !module || !summaryType) {
      setError("Missing required parameters in the query string.");
      setLoading(false);
      return;
    }

    // API call to generate the full summary
    fetch("/api/generate-fullsummary/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: courseId,
        module_name: module,
        summary_type: summaryType,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate full summary.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status === "success") {
          // Parse the summary if it's a JSON string
          const parsedSummary =
            typeof data.summary === "string"
              ? JSON.parse(data.summary).summary
              : data.summary;

          setSummary(parsedSummary); // Set the parsed summary
        } else {
          throw new Error(data.message || "Error generating full summary.");
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

export default FullSummary;
