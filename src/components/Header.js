import React from "react";
import "./styles/Header.css";

export default function Header({ score, highScore }) {
  return (
    <div>
      <h2>Score: {score}</h2>
      <h2>HighScore: {highScore}</h2>
    </div>
  );
}
