import React from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./PastWork.css";
function PastWork() {
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    window.location.href = path;
  };
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="Choices">
                        <div className="PastQuiz">
                            <h3 className="text">View your past Quizzes!</h3>
                            <button className="ViewPastQuiz" onClick={() => handleNavigate("/viewpastquiz")}>Past Quizzes</button>
                        </div>
                        <div className="PastSummaries">
                            <h3 className="text">View your past Summaries!</h3>
                            <button className="ViewPastSummary" onClick={() => handleNavigate("/viewpastsummary")}>Past Summaries</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PastWork








