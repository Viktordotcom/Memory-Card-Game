import React from "react";
import "./styles/Card.css";

export default function Card({ src, onClick, id }) {
  return (
    <div>
      <img id={id} onClick={(e) => onClick(e)} src={src} alt="" />
    </div>
  );
}
