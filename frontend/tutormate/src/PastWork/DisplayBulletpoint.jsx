import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./DisplayBulletpoint.css";

function DisplayBulletpoint() {
  const location = useLocation();
  const [bulletPoints, setBulletPoints] = useState([]); // State to hold the bullet points
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const bulletPointId = queryParams.get("bulletpoint_id");

    if (!bulletPointId) {
      setError("Missing bullet point ID in the query parameters.");
      setLoading(false);
      return;
    }

    fetch(`/api/get-bulletpoint/?bulletpoint_id=${bulletPointId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bullet points.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);

        if (data.status === "success" && data.bullet_points?.bullet_points) {
          setBulletPoints(data.bullet_points.bullet_points); // Access the nested array
        } else {
          throw new Error(data.message || "Error fetching bullet points.");
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

export default DisplayBulletpoint;
