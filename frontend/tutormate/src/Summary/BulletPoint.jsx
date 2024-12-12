import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./BulletPoint.css";

function BulletPoint() {
  const location = useLocation();
  const [bulletPoints, setBulletPoints] = useState([]); // State to hold the bullet points
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Extract course ID and module from the URL
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseid");
    const module = queryParams.get("module");

    if (!courseId || !module) {
      setError("Missing course ID or module in the query parameters.");
      setLoading(false);
      return;
    }

    // API call to generate bullet point summary
    fetch("/api/generate-bulletpoints/", {
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
          throw new Error("Failed to generate bullet points.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);

        if (data.status === "success") {
          try {
            // Safely parse the bullet points
            const parsedData = JSON.parse(data.summary.bullet_points);
            const bulletPoints = parsedData?.bullet_points || [];
            setBulletPoints(bulletPoints);
          } catch (err) {
            console.error("Error parsing bullet points:", err);
            throw new Error("Invalid format for bullet points.");
          }
        } else {
          throw new Error(data.message || "Error generating bullet points.");
        }
      })
      .catch((err) => {
        console.error("Error fetching bullet points:", err);
        setError(err.message || "Failed to fetch bullet points.");
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
          ) : bulletPoints && bulletPoints.length > 0 ? (
            <div className="BulletPt">
              <h3 className="title">Summary:</h3>
              <ul className="summary">
                {bulletPoints.map((point) => (
                  <li key={point.id}>{point.text}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No bullet point summary available for this module.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BulletPoint;
