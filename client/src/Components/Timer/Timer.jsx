import React, { useRef, useState } from "react";
import './Timer.scss'

const timeCounter = (time) => {
  return time.toString();
};

const TimerGame = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef("");

  function startTimer() {
    if (intervalRef.current !== null) return;
    setIsCounting(true);
    inputRef.current = "";
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        // reset the timer

        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;
    setIsCounting(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTimeLeft(0);
    setIsCounting(false);
    intervalRef.current = null;
    setShowLine(false)
  }

  function inputTime(e){
    inputRef.current = e.target.value;
    setTimeLeft(e.target.value);
  }

  const [selectTime, setSelectTime] = useState('');
  const [showLine, setShowLine] = useState(false);

  function getTime (e) {
    setSelectTime(e.target.value)
    setTimeLeft(e.target.value);
    setShowLine(true)
  }

  const seconds = timeCounter(timeLeft);

  let widthLine = timeLeft*100/selectTime + '%';


  return (
    <div className="timer-game">
      <div className="timer">
        <span>{seconds}</span>
      </div>
      <div className="player-card">
        <div className="timer-line" style={{display: `${showLine} ? "block" : "none"`, width: widthLine}}>
      </div>
      </div>
      <div className="buttons">
        {!isCounting && <button onClick={startTimer}>Start</button>}
        {isCounting && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="text">
        <label>Enter the time in sec</label>
        <input type="text" onChange={inputTime} value={inputRef.current} />
        <button onClick={getTime} value={30}>30</button>
        <button onClick={getTime} value={60}>60</button>
      </div>
    </div>
  );
};

export default TimerGame;