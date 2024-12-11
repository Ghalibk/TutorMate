import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Services.css"
import robot from "../assets/robot.jpeg";
import book from "../assets/book.png";
import todo1 from "../assets/todo1.png";
import question from "../assets/question.png";
function Services(props){
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
};
return (
    <div className="PageContainer">
      {/* Horizontal container at the top */}
      <div className="TopContainer">
        <div className="TopText">
          <h2>How can I assist you in  <h2 className="CourseID">Course ID? {props.CourseID}</h2></h2>
          
        </div>
        <img src={robot} alt="Robot" className="TopImage" />
      </div>
      {/* Services container */}
      <div className="Services">
        <div className="Service">
          <img src={question} alt="Quiz" className="ServiceImage question" />
          <button className="btn-generate" onClick={() => handleNavigate("/quizzes")}>
            Quiz
          </button>
        </div>
        <div className="Service">
            <img src={book} alt="Summary" className="ServiceImage book" />
          <button   className="btn-generate" onClick={() => handleNavigate("/modulechoice")}>
                  Summary
          </button>
        </div>
        <div className="Service">
        <img src={todo1} alt="To-Do" className="ServiceImage todo1" />
         <button className="btn-generate" onClick={() => handleNavigate("/todo")}>
         To-Do
       </button>
        </div>
      </div>
    </div>
  );
}

export default Services;
