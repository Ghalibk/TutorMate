import React, { useEffect, useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

function Courses(props) {
  const navigate = useNavigate();
  const [overlayColor, setOverlayColor] = useState("");

  // Generate a random see-through color
  useEffect(() => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.3)`; // Alpha 0.3 for transparency
    setOverlayColor(randomColor);
  }, []); // Run once when the component mounts

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className="Courses"
      onClick={() =>
        handleNavigate("/servicespage?courseid=" + props.CourseID)
      }
    >
      <div
        className="Course-image"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src={props.CoursePic}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            pointerEvents: "none", // Allow clicks to pass through
            borderRadius: "10px", // Match the image border radius
          }}
        ></div>
      </div>
      <div className="grade-circle">
        {props.LetterGrade} : {props.OverallGrade}%
      </div>
      <div className="Course-details">
        <h3 className="Course-name">{props.CourseName}</h3>
        <h3 className="Course-semester">Semester: {props.CourseSemester}</h3>
      </div>
    </div>
  );
}

export default Courses;
