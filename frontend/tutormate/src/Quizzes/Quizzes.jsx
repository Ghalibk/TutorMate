import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For extracting the course ID from the URL
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";

import "./Quizzes.css";

function Quizzes() {
  const location = useLocation(); // To access the URL query parameters
  const [courseId, setCourseId] = useState(null); // Store the course ID
  const [modules, setModules] = useState([]); // List of modules fetched from the API
  const [module, setModule] = useState(""); // Selected module
  const [difficulty, setDifficulty] = useState(""); // Selected difficulty
  const [numQuestions, setNumQuestions] = useState(5); // Number of questions
  const [quizGenerated, setQuizGenerated] = useState(false); // Whether the quiz is generated

  // Extract the course ID from the URL and fetch the list of modules
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

  const handleGenerateQuiz = () => {
    // Handle quiz generation logic here
    setQuizGenerated(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div className="quizzes-container">
            <h2>Generate Your Quiz</h2>
            {/* Forms for modules, difficulty, and number of questions */}
            {!quizGenerated ? (
              <div className="quiz-form">
                <div className="form-group">
                  <label>Select a Module</label>
                  <select
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
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

                <div className="form-group">
                  <label>Select Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="input-select"
                  >
                    <option value="">Choose Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="difficult">Difficult</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Questions</label>
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    min="1"
                    max="50"
                    className="input-number"
                  />
                </div>

                <button onClick={handleGenerateQuiz} className="btn-generate">
                  Generate Quiz
                </button>
              </div>
            ) : (
              <div className="quiz-generated">
                <h3>Quiz Generated for {module}</h3>
                <p>Difficulty: {difficulty}</p>
                <p>Number of Questions: {numQuestions}</p>
                {/* Here you can render the quiz questions dynamically */}
                <button
                  onClick={() => setQuizGenerated(false)}
                  className="btn-reset"
                >
                  Reset Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
