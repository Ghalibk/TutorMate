import React from "react";
import { useNavigate } from "react-router-dom";
import "./EnterToken.css";
import Canvas_Icon from "../assets/canvas_icon.png";

function EnterToken() {
  const navigate = useNavigate();

  const handleSendTokenClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="container">
      <div className="canvas-image">
        <img src={Canvas_Icon} alt="" />
      </div>
      <div className="text">Hey! Please enter your Canvas Token!</div>
      <div className="input">
        <input type="Token" placeholder="Enter your token here" />
      </div>
      <div className="submit-button">
        <div className="submit-token" onClick={handleSendTokenClick}>
          Send Token
        </div>
      </div>
    </div>
  );
}

export default EnterToken;
