import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./ViewPastQuiz.css";

function ViewPastQuiz() {
    const [quizzes, setQuizzes] = useState([]); // Store quizzes
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        fetch("/api/get-user-quizzes/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON
            })
            .then((data) => {
                console.log("API Response:", data); // Debug response
                if (data.status === "success") {
                    setQuizzes(data.quizzes || []);
                } else {
                    setError(data.message || "Failed to fetch quizzes.");
                }
            })
            .catch((err) => {
                console.error("Error fetching quizzes:", err);
                setError(err.message || "Failed to load quizzes.");
            })
            .finally(() => {
                setLoading(false); // Always set loading to false
            });
    }, []);

    const handleNavigate = (quizId) => {
        window.location.href = `/displayquiz?quiz_id=${quizId}`;
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main">
                <SearchBar />
                <div className="content">
                    {loading ? (
                        <p>Loading quizzes...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div key={quiz.quiz_id} className="QuizContainer">
                                <h3 className="QuizID">{quiz.course_name} ({quiz.quiz_id})</h3>
                                <p className="QuizModule">This is a quiz on {quiz.module_name}</p>
                                <p className="QuizDetails">
                                    <strong>Difficulty:</strong> {quiz.difficulty}
                                </p>
                                <p className="QuizDetails">
                                    <strong>Number of Questions:</strong> {quiz.num_questions}
                                </p>
                                <button
                                    className="ViewQuiz"
                                    onClick={() => handleNavigate(quiz.quiz_id)}
                                >
                                    View Quiz
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No quizzes available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewPastQuiz;
