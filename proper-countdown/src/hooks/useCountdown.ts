import { useEffect, useState } from "react";

const convertToSeconds = (value: number) => {
  let days, hours, minutes, seconds;

  if (value <= 0) {
    return [(days = 0), (hours = 0), (minutes = 0), (seconds = 0)];
  }

  days = Math.floor(value / (24 * 60 * 60 * 1000));
  hours = Math.floor((value % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  minutes = Math.floor((value % (60 * 60 * 1000)) / (60 * 1000));
  seconds = Math.floor((value % (60 * 1000)) / 1000);
  return [days, hours, minutes, seconds];
};

const useCountdown = (countdown: number, startTimer: boolean) => {
  let now = new Date().getTime();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval = 0;
    const now: number = new Date().getTime();

    if (startTimer && currentTime >= 0) {
      interval = setInterval(() => {
        console.log(countdown - now);
        setCurrentTime(countdown - now);
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, startTimer]);

  return convertToSeconds(currentTime);
};

export { useCountdown };
