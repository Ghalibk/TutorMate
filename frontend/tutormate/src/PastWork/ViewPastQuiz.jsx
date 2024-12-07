import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./ViewPastQuiz.css"
function ViewPastQuiz(props) {
    const handleNavigate = (path) => {
        window.location.href = path;
      };
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="QuizContainer">
                        <h3 className="QuizID">Quiz ID: {props.QuizID}</h3>
                        <p className="QuizModule">This is a quiz on {props.Module}</p>
                        <button className="ViewQuiz" onClick={() => handleNavigate("/displayquiz")} >View Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewPastQuiz



