import {useEffect, useRef, useState} from "react"
import "./Timer.scss"

const TimerGame = () => {
    const [timeLeft, setTimeLeft] = useState(60)
    const [overallTime, setOverallTime] = useState(60)
    const [isCounting, setIsCounting] = useState(false)
    const intervalRef = useRef(null)
    const [widthLine, setWidthLine] = useState(
        (timeLeft * 100) / timeLeft + "%"
    )

    useEffect(() => {
        setWidthLine(calculateLine(overallTime, timeLeft))
        if (timeLeft === 0) {
            setIsCounting(false)
        }
    }, [timeLeft])

    function startTimer() {
        if (intervalRef.current) return
        setIsCounting(true)
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft >= 1) return timeLeft - 1
                return 0
            })
        }, 1000)
    }

    function stopTimer() {
        if (!intervalRef.current) return
        setIsCounting(false)
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    function resetTimer() {
        clearInterval(intervalRef.current)
        setTimeLeft(0)
        setIsCounting(false)
        intervalRef.current = null
        setWidthLine("")
    }

    function getTime(seconds) {
        setTimeLeft(seconds)
        setOverallTime(seconds)
        setWidthLine(calculateLine(seconds, seconds))
    }

    function calculateLine(overallSeconds, secondsLeft) {
        return (secondsLeft * 100) / overallSeconds + "%"
    }

    return (
        <div className="timer-game">
            <div className="timer">
                <span>{timeLeft}</span>
            </div>
            <div className="player-card">
                <div
                    className="timer-line"
                    style={{
                        width: widthLine,
                    }}
                ></div>
            </div>
            <div className="buttons">
                {isCounting ? (
                    <button onClick={stopTimer}>Stop</button>
                ) : (
                    <button onClick={startTimer}>Start</button>
                )}
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="text">
                <button onClick={() => getTime(30)}>30</button>
                <button onClick={() => getTime(60)}>60</button>
            </div>
        </div>
    )
}

export default TimerGame
