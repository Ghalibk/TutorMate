import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Services.css"
function Services(props){
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
    return(
        <div className="Services">
            <div className="Quizzes">
                <img src="" alt="" className="Quiz-image" />
                <h3 className="CourseID">Course ID: {props.CourseID}</h3>
                <p className="QuizDesc">Generate a quiz for you to practice specific modules!</p>
                <button className="TakeQuiz" onClick={() => handleNavigate("/quizzes")}>Take Quiz</button>
            </div>
            <div className="Summary">
                <img src="" alt="" className="Summary-image" />
                <h3 className="CourseID">Course ID: {props.CourseID}</h3>
                <p className="SummaryDesc">Generate a summary of the module or modules of your choice!</p>
                <button className="Generate-Summary" onClick={() => handleNavigate("/modulechoice")}>Generate Summary</button>

            </div>
            <div className="ToDO">
                <img src="" alt="" className="ToDo-image" />
                <h3 className="CourseID">Course ID: {props.CourseID}</h3>
                <p className="ToDoDesc">Get help with your To do assignments by following the steps generated</p>
                <button className="HelpToDo" onClick={() => handleNavigate("/todo")}>Get Help With The To Do</button>

            </div>
        </div>
    )
}
export default Services
