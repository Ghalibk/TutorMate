import React from 'react'
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./DisplayQuiz.css"

function DisplayQuiz(props){

    return (
            <div className="dashboard">
                <Sidebar />
                <div className="main">
                    <SearchBar />
                    <div className="content">
                        <div className="DisplayQuiz">
                            <h3 className="title">Quiz:</h3><br />
                            <p className="Quiz">{props.Quiz}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
    
}
export default DisplayQuiz

