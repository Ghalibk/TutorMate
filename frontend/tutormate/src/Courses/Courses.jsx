import React from 'react'
import "./Courses.css"
import { useNavigate } from "react-router-dom";
function Courses(props){
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
  };
    return(
        <div className="Courses" onClick={() => handleNavigate("/servicespage")}>
            <img src={props.CoursePic} alt="" className="Course-image" />
            <h3 className="Course-code">Course ID: {props.CourseID}</h3>
            <h3 className="Course-name">Course name: {props.CourseName}</h3>
            <h3 className="Course-semester">Semester: {props.CourseSemester}</h3>
        </div>
    )


}
export default Courses
