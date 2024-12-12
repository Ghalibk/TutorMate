import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./Todo.css";

function Todo() {
  const location = useLocation();
  const [courseId, setCourseId] = useState(null);
  const [assignmentNames, setAssignmentNames] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("courseid");
    setCourseId(id);

    if (id) {
      fetch(`/api/todo-course/?courseid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch To-Do items");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            setAssignmentNames(data.assignment_names || []);
            setMessage(data.message || "");
          } else {
            setError(data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching To-Do items:", err);
          setError("Failed to load To-Do items.");
          setLoading(false);
        });
    } else {
      setError("Course ID is missing from the URL.");
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div className="Todo">
            <h3 className="Title">To-Do Assignments:</h3>
            <br />
            {loading ? (
              <p className="loading">Loading...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : assignmentNames.length > 0 ? (
              <ul className="assignment-list">
                {assignmentNames.map((name, index) => (
                  <li key={index} className="assignment-item">
                    {name}
                  </li>
                ))}
                <button className="ShowSteps">Show Steps:</button>
              </ul>
            ) : (
              <p className="no-items">{message || "No To-Do items found."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
