import React from 'react'
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./BulletPoint.css"
function BulletPoint(props) {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <div className="BulletPt">
                        <h3 className="title">Summary:</h3><br />
                        <p className="summary">{props.Summary}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BulletPoint
