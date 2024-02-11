import React from "react";
import { useState, useEffect } from "react";

type Props = {
  finalTimeInSeconds: number;
  setFinalTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
  startTimer: boolean;
  setStartTimer: React.Dispatch<React.SetStateAction<boolean>>;
  finalTimeInMS: number;
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  console.log(countDown);
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default function Countdown({
  finalTimeInSeconds,
  setFinalTimeInSeconds,
  startTimer,
  setStartTimer,
  finalTimeInMS,
}: Props) {
  const [finalCountDown, setFinalCountDown] = useState(
    finalTimeInMS - new Date().getTime()
  );

  useEffect(() => {
    let interval = 0;

    if (startTimer) {
      interval = setInterval(() => {
        setFinalCountDown(finalTimeInMS - new Date().getTime());
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      console.log("Cleared");
      clearInterval(interval);
    };
  }, [startTimer, finalCountDown]);

  const [days, hours, minutes, seconds] = getReturnValues(finalCountDown);
  return (
    <div className="py-5 text-center flex items-center justify-center space-x-4 sm:space-x-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{days}</h2>
        <span>Days</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{hours}</h2>
        <span>Hrs</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {minutes}
        </h2>
        <span>Mins</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {seconds}
        </h2>
        <span>Secs</span>
      </div>
    </div>
  );
}
