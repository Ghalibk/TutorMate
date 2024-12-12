import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Services.css";
import robot from "../assets/robot.jpeg";
import book from "../assets/book.png";
import todo1 from "../assets/todo1.png";
import question from "../assets/question.png";
let id;

function Services() {
  const navigate = useNavigate();
  const location = useLocation(); // To access query parameters
  const [courseName, setCourseName] = useState("Loading...");
  const [courseID, setCourseID] = useState(null);

  // Extract course ID from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    id = queryParams.get("courseid");
    setCourseID(id);

    // Fetch course name from API
    if (id) {
      fetch(`/api/course-name/?courseid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch course name");
          }
          return response.json();
        })
        .then((data) => {
          setCourseName(data.name || "Course not found"); // Set course name from API
        })
        .catch((error) => {
          console.error("Error fetching course name:", error);
          setCourseName("Error loading course name"); // Handle error state
        });
    }
  }, [location.search]);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="PageContainer">
      {/* Horizontal container at the top */}
      <div className="TopContainer">
        <div className="TopText">
          <h2>
            How can I assist you in{" "}
            <h2 className="CourseID">{courseName}</h2>
          </h2>
        </div>
        <img src={robot} alt="Robot" className="TopImage" />
      </div>
      {/* Services container */}
      <div className="Services">
        <div className="Service">
          <img src={question} alt="Quiz" className="ServiceImage question" />
          <button
            className="btn-generate"
            onClick={() => handleNavigate("/quizzes?courseid=" + id)}
          >
            Quiz
          </button>
        </div>
        <div className="Service">
          <img src={book} alt="Summary" className="ServiceImage book" />
          <button
            className="btn-generate"
            onClick={() => handleNavigate("/modulechoice?courseid=" + id)}
          >
            Summary
          </button>
        </div>
        <div className="Service">
          <img src={todo1} alt="To-Do" className="ServiceImage todo1" />
          <button
            className="btn-generate"
            onClick={() => handleNavigate("/todo?courseid=" + id)}
          >
            To-Do
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services;
