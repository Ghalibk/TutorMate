import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import "./Todo.css";

function Todo() {
  const location = useLocation();
  const [courseId, setCourseId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [steps, setSteps] = useState([]); // State to store steps for todos
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("courseid");
    setCourseId(id);

    if (id) {
      fetch(`/api/todo-course/?courseid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch To-Do items");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            setTodos(data.todos || []);
            setMessage(data.message || "");
          } else {
            setError(data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching To-Do items:", err);
          setError("Failed to load To-Do items.");
          setLoading(false);
        });
    } else {
      setError("Course ID is missing from the URL.");
      setLoading(false);
    }
  }, [location.search]);

  const handleGenerateSteps = () => {
    const todoIds = todos.map((todo) => todo.todo_id);
    setLoadingSteps(true);

    fetch("/api/generate-steps/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo_ids: todoIds }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate steps.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          const parsedSteps = data.steps_data.map((stepData) => {
            const steps = JSON.parse(stepData.steps).steps || [];
            return { ...stepData, steps };
          });
          setSteps(parsedSteps || []);
        } else {
          throw new Error(data.message || "Error generating steps.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to generate steps.");
      })
      .finally(() => {
        setLoadingSteps(false);
      });
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div className="Todo">
            <h3 className="Title">To-Do Assignments:</h3>
            <br />
            {loading ? (
              <p className="loading">Loading...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : todos.length > 0 ? (
              <div>
                <ul className="assignment-list">
                  {todos.map((todo) => (
                    <li key={todo.todo_id} className="assignment-item">
                      <p>{todo.assignment_name}</p>
                    </li>
                  ))}
                </ul>
                <button
                  className="ShowSteps"
                  onClick={handleGenerateSteps}
                  disabled={loadingSteps}
                >
                  {loadingSteps ? "Generating Steps..." : "Show Steps"}
                </button>
                {steps.length > 0 && (
                  <div className="steps-container">
                    <h4>Steps to Complete:</h4>
                    {steps.map((stepData) => (
                      <div key={stepData.todo_id} className="step-item">
                        <h5>{stepData.assignment_name}</h5>
                        <ul className="steps-list">
                          {stepData.steps.map((step, index) => (
                            <li key={index}>
                              Step {step.step_number}: {step.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="no-items">{message || "No To-Do items found."}</p>
            )}
            {loadingSteps && <p className="loading">Generating steps...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
