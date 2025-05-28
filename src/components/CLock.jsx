import { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center mt-2">
      <h1 className="text-5xl select-none">{currentTime.toLocaleTimeString()}</h1>
      <p className="text-sm md:text-md font-medium select-none">
        {currentTime.toLocaleDateString()}
      </p>
    </div>
  );
};

export default Clock;
