import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";

import "./Quizzes.css";

function Quizzes() {
  const [module, setModule] = useState(""); // to choose the modules
  const [difficulty, setDifficulty] = useState(""); // to set the level of difficulty
  const [numQuestions, setNumQuestions] = useState(5); // settle number of questuons to 5: default
  const [quizGenerated, setQuizGenerated] = useState(false); // to track whether a quiz is generated or not

  const handleGenerateQuiz = () => {
    //generate the quizz

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
            {/*// forms modules, difficulty, and num of questions */}
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
                    <option value="Module 1">Module 1</option>
                    <option value="Module 2">Module 2</option>
                    <option value="Module 3">Module 3</option>
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
                    min="1" //set minimum
                    max="50" // set maximum
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
                <button onClick={() => setQuizGenerated(false)} className="btn-reset">
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
