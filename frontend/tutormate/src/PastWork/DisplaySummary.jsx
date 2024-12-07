import React from 'react'
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./DisplaySummary.css"

function DisplaySummary(props){

    return (
            <div className="dashboard">
                <Sidebar />
                <div className="main">
                    <SearchBar />
                    <div className="content">
                        <div className="DisplaySummary">
                            <h3 className="title">Summary:</h3><br />
                            <p className="Summary">{props.Summary}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
    
}
export default DisplaySummary

