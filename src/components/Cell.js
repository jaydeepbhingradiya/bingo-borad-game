import React from "react";
import "./Cell.css";

const Cell = ({ number, isMarked }) => {
  return <div className={`cell ${isMarked ? "marked" : ""}`}>{number}</div>;
};

export default Cell;
