import { useState, useEffect, useRef } from "react";

function TimeTracker({ onNewEntry }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (!taskDescription.trim()) {
      alert('Please enter a task description.');
      return;
    }
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    const endTime = Date.now();
    onNewEntry({
      description: taskDescription,
      startTime,
      endTime,
      duration: endTime - startTime,
    });
    setTaskDescription('');
    setElapsedTime(0);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="time-tracker">
      <h2>Time Tracker</h2>
      <div className="time-tracker-form">
        <input
          type="text"
          placeholder="What are you working on?"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={isRunning}
        />
        {isRunning ? (
          <button onClick={handleStop} className="stop-btn">
            Stop
          </button>
        ) : (
          <button onClick={handleStart} className="start-btn">
            Start
          </button>
        )}
      </div>
      {isRunning && (
        <div>
          <h3>
            Current Task: {taskDescription}
          </h3>
          <p>
            Time Elapsed: <strong>{formatTime(elapsedTime)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default TimeTracker;