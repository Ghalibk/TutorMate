import React from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./Todo.css"
function Todo(props) {
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
                    <div className="Todo">
                        <h3 className="Title">To Do:</h3>
                        <br />
                        <p className="description">{props.description}</p>
                        <button className="ShowSteps">Show Steps:</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Todo

