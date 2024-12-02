import React from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./SummaryOpt.css"
function SummaryOpt() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        window.location.href = path;
    }
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="Options">
                        <h3 className="Title">Choose a summary type!</h3>
                        <button className="flashcard" onClick={() => handleNavigate("/flashcardspage")}>Flashcards</button>
                        <button className="BulletPoints" onClick={() => handleNavigate("/bulletpoint")}>Bullet Points</button>
                        <button className="FullSummary" onClick={() => handleNavigate("/fullsummary")}>Full Summary</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SummaryOpt
