import React from "react";
import { useState, useEffect } from "react";
import { useCountdown } from "../../hooks/useCountdown";

type Props = {
  finalTimeInMSeconds: number;
  startTimer: boolean;
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  let days, hours, minutes, seconds;
  if (countDown <= 0) {
    return [(days = 0), (hours = 0), (minutes = 0), (seconds = 0)];
  }
  days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default function Countdown({ finalTimeInMSeconds, startTimer }: Props) {
  console.log("🔥");
  console.log(finalTimeInMSeconds);
  const [days, hours, minutes, seconds] = useCountdown(
    finalTimeInMSeconds,
    startTimer
  );

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
