import React from 'react'
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./FullSummary.css"
function FullSummary(props) {

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="FullSum">
                        <h3 className="title">Summary:</h3><br />
                        <p className="summary">{props.Summary}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullSummary
