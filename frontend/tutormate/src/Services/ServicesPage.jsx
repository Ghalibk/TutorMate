import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Services from "../Services/Services.jsx";
import Sidebar from "../Sidebar/Sidebar";

function ServicesPage() {
    const navigate = useNavigate();

    const handleNavigateServicesPage = () => {
        window.location.href = '/servicespage';
    };
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    <Services></Services>
                </div>
            </div>
        </div>
    )


}
export default ServicesPage