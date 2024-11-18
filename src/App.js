import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]); // Store lap times

  // Hook for handling timer
  useEffect(() => {
    let interval;
    if (running) { // Start timer when running is true
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval); // Stop the timer
    }
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [running]);

  // Function to record lap time
  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
    <h1 className="text-3xl font-semibold text-white pb-4">Stopwatch</h1>

      {/* Timer display */}
      <div className="text-4xl font-semibold text-white py-4">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div className="w-1/2 max-w-sm flex justify-between space-x-4 py-4">
        {running ? (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
            onClick={() => setRunning(false)}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
            onClick={() => setRunning(true)}
          >
            Start
          </button>
        )}
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200"
          onClick={() => setTime(0)}
        >
          Reset
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
          onClick={recordLap}
        >
          Lap
        </button>
      </div>

      {/* Laps display */}
      <div className="w-1/2 max-w-sm mt-6 bg-[#f2c0e5] bg-opacity-60 backdrop-blur-lg p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Laps:</h2>
        {laps.length === 0 ? (
          <p className="text-gray-500">No laps recorded yet</p>
        ) : (
          <ul className="space-y-2">
            {laps.map((lap, index) => (
              <li
                key={index}
                className="text-gray-800 flex justify-between items-center"
              >
                <span>Lap {index + 1}</span>
                <span>
                  {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
                  {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:
                  {("0" + Math.floor((lap / 10) % 100)).slice(-2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
