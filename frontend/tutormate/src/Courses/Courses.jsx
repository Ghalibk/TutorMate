import React from 'react'
import "./Courses.css"
import { useNavigate } from "react-router-dom";
function Courses(props){
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
  };
    return(
        <div className="Courses" onClick={() => handleNavigate("/servicespage?courseid=" + props.CourseID)}>
            <img src={props.CoursePic} alt="" className="Course-image" />
            <div className="grade-circle"><p>{props.LetterGrade}</p><p>{props.OverallGrade}%</p></div>
            <div className="Course-details">
            <h3 className="Course-name">{props.CourseName}</h3>
            <h3 className="Course-semester">Semester: {props.CourseSemester}</h3>
        </div>
        </div>
    )


}
export default Courses
