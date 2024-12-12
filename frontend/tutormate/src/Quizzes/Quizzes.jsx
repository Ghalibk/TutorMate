import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar.jsx";

import "./Quizzes.css";

function Quizzes() {
  const location = useLocation();
  const [courseId, setCourseId] = useState(null);
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("courseid");
    setCourseId(id);

    if (id) {
      fetch(`/api/modules/?courseid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch modules");
          }
          return response.json();
        })
        .then((data) => {
          setModules(data.modules || []);
        })
        .catch((error) => {
          console.error("Error fetching modules:", error);
          setModules([]);
        });
    }
  }, [location.search]);

  const handleGenerateQuiz = () => {
    if (!module || !difficulty || !numQuestions) {
      setError("Please select a module, difficulty, and number of questions.");
      return;
    }

    setError(null);

    fetch("/api/generate-quiz/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: courseId,
        module_name: module,
        difficulty: difficulty,
        num_questions: numQuestions,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate quiz");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setQuiz(data.quiz.quiz);
          setQuizGenerated(true);
          setShowResults(false); // Reset results view
          setAnswers({});
          setScore(0);
        } else {
          throw new Error(data.message || "Error generating quiz");
        }
      })
      .catch((error) => {
        console.error("Error generating quiz:", error);
        setError("Failed to generate the quiz. Please try again.");
      });
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;

    quiz.questions.forEach((question) => {
      if (answers[question.question_id] === question.correct_option) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setShowResults(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div className="quizzes-container">
            <h2>Generate Your Quiz</h2>
            {error && <p className="error">{error}</p>}
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
                <h3>{quiz?.title || "Quiz"}</h3>
                <div className="quiz-questions">
                  {quiz?.questions?.map((question) => (
                    <div key={question.question_id} className="quiz-question">
                      <p>
                        <strong>Q{question.question_id}:</strong>{" "}
                        {question.question_text}
                      </p>
                      <ul>
                        {question.options.map((option) => (
                          <li key={option.option_id}>
                            <label>
                              <input
                                type="radio"
                                name={`question_${question.question_id}`}
                                value={option.option_id}
                                onChange={() =>
                                  handleAnswerChange(
                                    question.question_id,
                                    option.option_id
                                  )
                                }
                              />
                              {option.option_id.toUpperCase()}: {option.text}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {!showResults ? (
                  <button onClick={handleSubmitQuiz} className="btn-submit">
                    Submit Quiz
                  </button>
                ) : (
                  <div className="quiz-results">
                    <h4>Your Score: {score} / {quiz.questions.length}</h4>
                    {quiz.questions.map((question) => (
                      <div key={question.question_id} className="quiz-result">
                        <p>
                          <strong>Q{question.question_id}:</strong>{" "}
                          {question.question_text}
                        </p>
                        <p>
                          <strong>Your Answer:</strong>{" "}
                          {answers[question.question_id]?.toUpperCase() || "Not Answered"}
                        </p>
                        <p>
                          <strong>Correct Answer:</strong>{" "}
                          {question.correct_option.toUpperCase()}
                        </p>
                        <p>
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleNavigate("../quizzes?courseid=" + courseId)}
                  className="btn-reset"
                >
                  Generate Another Quiz
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
