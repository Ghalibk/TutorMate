import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./DisplayQuiz.css";

function DisplayQuiz() {
  const location = useLocation();
  const [quiz, setQuiz] = useState(null); // State to store quiz data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading
  const [answers, setAnswers] = useState({}); // State to store user answers
  const [showResults, setShowResults] = useState(false); // State to toggle results view
  const [score, setScore] = useState(0); // State to store the score

  useEffect(() => {
    // Extract quiz ID from the URL
    const queryParams = new URLSearchParams(location.search);
    const quizId = queryParams.get("quiz_id");

    if (!quizId) {
      setError("Missing quiz ID in the query parameters.");
      setLoading(false);
      return;
    }

    // API call to fetch the quiz
    fetch(`/api/get-quiz/?quizid=${quizId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the quiz.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setQuiz(data.quiz.quiz || null); // Set the quiz from the API response
        } else {
          throw new Error(data.message || "Error fetching the quiz.");
        }
      })
      .catch((err) => {
        console.error("Error fetching the quiz:", err);
        setError(err.message || "Failed to fetch the quiz.");
      })
      .finally(() => {
        setLoading(false); // Mark loading as complete
      });
  }, [location.search]);

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
        {loading ? (
            <p>Loading quiz...</p>
        ) : error ? (
            <p className="error">{error}</p>
        ) : quiz ? (
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
                        {answers[question.question_id]?.toUpperCase() ||
                        "Not Answered"}
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
            </div>
        ) : (
            <p>No quiz available.</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default DisplayQuiz;
