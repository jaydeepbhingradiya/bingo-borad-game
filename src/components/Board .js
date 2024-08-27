import React, { useEffect, useState } from "react";
import "./Board.css";
import Cell from "./Cell";

const Board = ({
  markedNumbers,
  checkForWinner,
  isGmameStart,
  setIsGameStart,
  handlerRefresh,
}) => {
  const [matrix, setMatrix] = useState([]);

  const generateMatrix = () => {
    const numbers = new Set();
    while (numbers.size < 25) {
      numbers.add(Math.floor(Math.random() * 100) + 1);
    }
    return Array.from(numbers);
  };
  useEffect(() => {
    setMatrix(generateMatrix());
  }, []);

  useEffect(() => {
    if (matrix.length > 0) {
      checkForWinner(matrix);
    }
  }, [markedNumbers, matrix, checkForWinner]);

  return (
    <>
      <div className="board">
        {matrix.map((number, index) => (
          <Cell
            key={index}
            number={number}
            isMarked={markedNumbers.includes(number)}
          />
        ))}
      </div>
      <div>
        <button
          disabled={isGmameStart}
          className="button"
          onClick={() => setIsGameStart(true)}
        >
          Start Game
        </button>
        <button
          className="button button-refresh"
          onClick={() => {
            setMatrix(generateMatrix());
            handlerRefresh();
          }}
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default Board;
