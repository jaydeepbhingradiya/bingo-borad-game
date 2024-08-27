import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board ";
import "./App.css";

function App() {
  const [isGmameStart, setIsGameStart] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    if (isWinner || !isGmameStart) return; 

    const interval = setInterval(() => {
      const number = Math.floor(Math.random() * 100) + 1;
      setRandomNumber(number);
    }, 500);

    return () => clearInterval(interval);
  }, [isWinner, isGmameStart]);

  const handleNumberCheck = (number) => {
    setMarkedNumbers((prev) => {
      if (prev.includes(number)) return prev;
      return [...prev, number];
    });
  };

  useEffect(() => {
    if (randomNumber !== null) {
      handleNumberCheck(randomNumber);
    }
  }, [randomNumber]);

  const checkForWinner = (matrixNumbers) => {
    if (matrixNumbers.every((num) => markedNumbers.includes(num))) {
      setIsWinner(true);
      setIsGameStart(false);
    }
  };

  const handlerRefresh = () => {
    setRandomNumber(null);
    setMarkedNumbers([]);
    setIsWinner(false);
    setIsGameStart(false);
  };

  return (
    <div className="App">
      <Header />
      <h3> {randomNumber}</h3>

      <Board
        markedNumbers={markedNumbers}
        checkForWinner={checkForWinner}
        isGmameStart={isGmameStart}
        setIsGameStart={setIsGameStart}
        handlerRefresh={handlerRefresh}
      />
      {isWinner && <p className="winner">You are winner!</p>}
    </div>
  );
}

export default App;
