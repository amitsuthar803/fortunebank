import { useState, useEffect } from "react";

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());

    // Update the time immediately on mount
    updateTime();

    // Update the time every second for more accurate time display
    const intervalId = setInterval(updateTime, 1000); // 1000 milliseconds = 1 second

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
}
