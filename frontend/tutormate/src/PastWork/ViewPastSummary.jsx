import React from 'react'
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./ViewPastSummary.css"
function ViewPastSummary(props) {
    const handleNavigate = (path) => {
        window.location.href = path;
      };
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="SummaryContainer">
                        <h3 className="SummaryID">Summary ID: {props.QuizID}</h3>
                        <p className="SummaryModule">This is a Summary on {props.Module}</p>
                        <button className="ViewSummary" onClick={() => handleNavigate("/displaysummary")}>View Summary</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewPastSummary



