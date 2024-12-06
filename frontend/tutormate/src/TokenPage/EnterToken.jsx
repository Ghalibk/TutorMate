import React, { useEffect, useState } from "react";
import "./EnterToken.css";
import Canvas_Icon from "../assets/canvas_icon.png";

function EnterToken() {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [tokenStatus, setTokenStatus] = useState(null); // State to track token status
  const [canvasToken, setCanvasToken] = useState(""); // State to track input token
  const [errorMessage, setErrorMessage] = useState(""); // State to track error messages

  // Function to check if the Canvas token is valid on mount
  const checkCanvasToken = async () => {
    try {
      const response = await fetch("/api/check-canvas-token/");
      const data = await response.json();

      // Explicitly check the token status
      if (data.token_status === "not valid") {
        setTokenStatus("not valid");
      } else if (data.status === "success" && data.token_status === "initialized") {
        setTokenStatus("initialized");
      } else {
        setTokenStatus(null); // For any other case, set status to null
      }
    } catch (error) {
      console.error("Error checking Canvas token:", error);
      setTokenStatus("not valid"); // Handle API errors as "not valid"
    } finally {
      setLoading(false); // Update loading state
    }
  };

  const getCSRFToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
  };

  const validateAndSendToken = async () => {
    try {
      const csrfToken = getCSRFToken();
      const response = await fetch("/api/validate-canvas-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Include CSRF token in the header
        },
        body: JSON.stringify({ token: canvasToken }),
      });

      const data = await response.json();

      if (response.ok) {
        // Token is valid
        setTokenStatus("validated"); // Set token status to validated
        handleSendTokenClick();
      } else {
        // Token is not valid
        setErrorMessage(data.message || "The Canvas Token entered is not valid. Please try again.");
      }
    } catch (error) {
      console.error("Error validating Canvas token:", error);
      setErrorMessage("An error occurred while validating the token. Please try again.");
    }
  };

  // UseEffect to trigger the API call on component mount
  useEffect(() => {
    checkCanvasToken();
  }, []);

  // Automatically navigate to dashboard if token status is "initialized"
  useEffect(() => {
    if (tokenStatus === "initialized") {
      handleSendTokenClick();
    }
  }, [tokenStatus]);

  const handleSendTokenClick = () => {
    window.location.href = "/dashboard";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="canvas-image">
        <img src={Canvas_Icon} alt="Canvas Icon" />
      </div>
      <div className="text">
        {tokenStatus === "not valid"
          ? "Your token is not valid. Please enter a valid Canvas Token!"
          : "Please enter your Canvas Token!"}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input">
        <input
          type="text"
          placeholder="Enter your token here"
          value={canvasToken}
          onChange={(e) => setCanvasToken(e.target.value)} // Update token state on input change
        />
      </div>
      <div className="submit-button">
        <div className="submit-token" onClick={validateAndSendToken}>
          Send Token
        </div>
      </div>
    </div>
  );
}

export default EnterToken;
