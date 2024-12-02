import React from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./ModuleChoice.css"
function ModuleChoice() {
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
                    <div className="Module">
                        <h3 className="title">Choose the modules you want to Summarise:</h3>
                        <div className="CheckBoxes">
                            <div className="CheckBoxes">
                                <label>
                                    <input type="checkbox" name="option" /> Module 1
                                </label>
                                <label>
                                    <input type="checkbox" name="option" /> Module 2
                                </label>
                                <label>
                                    <input type="checkbox" name="option" /> Module 3
                                </label>
                            </div>

                        </div>
                        <button className="Next" onClick={() => handleNavigate("/summaryopt")}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModuleChoice
