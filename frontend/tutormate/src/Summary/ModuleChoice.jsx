import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./ModuleChoice.css"
function ModuleChoice() {
    const location = useLocation(); 
    const [modules, setModules] = useState([]); 
    const [courseId, setCourseId] = useState(null);
    const [selectedModule, setSelectedModule] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("courseid");
        setCourseId(id);
    
        if (id) {
          // Fetch modules from the API
          fetch(`/api/modules/?courseid=${id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch modules");
              }
              return response.json();
            })
            .then((data) => {
              setModules(data.modules || []); // Set the modules from the API response
            })
            .catch((error) => {
              console.error("Error fetching modules:", error);
              setModules([]); // Reset modules in case of an error
            });
        }
      }, [location.search]);

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
                      <h3 className="title">Choose the module you want to Summarize:</h3>
                      <div className="ModuleSelect">
                          <select
                              value={selectedModule} // state to keep track of the selected module
                              onChange={(e) => setSelectedModule(e.target.value)} // update state on selection
                              className="input-select"
                          >
                              <option value="">Choose Module</option>
                              {modules.map((mod) => (
                                  <option key={mod.id} value={mod.file_name}>
                                      {mod.file_name}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <button
                          className="Next"
                          onClick={() =>
                              handleNavigate(
                                  `/summaryopt?courseid=${courseId}&module=${selectedModule}`
                              )
                          }
                          disabled={!selectedModule} // disable button if no module is selected
                      >
                          Next
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
  
}
export default ModuleChoice
