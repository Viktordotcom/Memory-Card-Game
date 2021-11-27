import React from "react";
import "./styles/CardContainer.css";
export default function CardContainer({ children, handleClick }) {
  return (
    <div className="card-container" onClick={handleClick}>
      {children}
    </div>
  );
}
