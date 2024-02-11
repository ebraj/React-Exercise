import React, { FormEvent, useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";

type Props = {};

export default function TimerInput({}: Props) {
  const [startTimer, setStartTimer] = useState(false);
  const [finalTimeInSeconds, setFinalTimeInSeconds] = useState(0);
  const formData = useRef(null);
  let calculatedInSeconds = 0;
  const finalTimeInMS = new Date().getTime() + finalTimeInSeconds * 1000;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { timerValue, timeformat } = formData.current as any;
    e.preventDefault();

    if (!timerValue.value || !timeformat.value) return;

    switch (timeformat.value) {
      case "years":
        calculatedInSeconds =
          Number(timerValue.value) * 365 * 24 * 60 * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        break;
      case "months":
        calculatedInSeconds =
          Number(timerValue.value) * 30 * 24 * 60 * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        break;
      case "weeks":
        calculatedInSeconds =
          Number(timerValue.value) * 7 * 24 * 60 * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        break;
      case "days":
        calculatedInSeconds = Number(timerValue.value) * 24 * 60 * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        break;
      case "hours":
        calculatedInSeconds = Number(timerValue.value) * 60 * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        break;
      case "minutes":
        calculatedInSeconds = Number(timerValue.value) * 60 * 1000;
        setFinalTimeInSeconds(calculatedInSeconds);
        setStartTimer(true);
        break;
      case "seconds":
        calculatedInSeconds = Number(timerValue.value) * 1000;
        break;
      case "default":
        calculatedInSeconds = Number(timerValue.value) * 1000;
        break;
    }
  };

  return (
    <>
      <form ref={formData} onSubmit={handleFormSubmit}>
        <div className="flex space-x-2">
          <input
            type="text"
            id="timerValue"
            name="timerValue"
            placeholder="Enter the timer value...(Eg. 5)"
            className="px-4 py-3 outline-none inline-block border w-full rounded-md"
            autoComplete="off"
          />
          <select
            name="timeformat"
            id="timeformat"
            className="w-full px-4 py-3 outline-none inline-block border rounded-md"
          >
            <option value="">Select time format</option>
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="weeks">Weeks</option>
            <option value="days">Days</option>
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>

          <button className="w-full bg-gray-900 text-white rounded-md">
            Start Timer
          </button>
        </div>
      </form>

      <Countdown
        {...{
          finalTimeInSeconds,
          finalTimeInMS: new Date().getTime() + finalTimeInSeconds,
          setFinalTimeInSeconds,
          startTimer,
          setStartTimer,
        }}
      />
    </>
  );
}
