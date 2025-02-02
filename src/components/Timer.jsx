import { useState, useEffect } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [highlight, setHighlight] = useState(false);  
  const [animation, setAnimation] = useState(false);  

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Start blinking effect and animation when time reaches 2 minutes
    if (timeLeft <= 120) {
      setHighlight(true);  
      setAnimation(true);  
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center w-full md:w-full lg:w-full max-w-full mx-auto">
      <h3 className="font-bold mb-2">Timer</h3>
      <div
        className={`text-xl ${highlight ? "text-red-500 animate-blink" : ""} ${animation ? "transition-all ease-in-out duration-1000" : ""}`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
