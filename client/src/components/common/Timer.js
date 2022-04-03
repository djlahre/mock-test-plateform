import React from "react";
import { useTimer } from "react-timer-hook";

function TimeSegment({ timeSegment }) {
  return (
    <span className="bg-dark text-white p-2 mx-1 rounded">
      {timeSegment < 10 ? "0" + timeSegment : timeSegment}
    </span>
  );
}

export default function Timer({ timeInMinutes, handleSubmit }) {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(
    time.getSeconds() + 60 * timeInMinutes
  );
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: async () => await handleSubmit(),
  });

  return (
    <div className="sticky-top text-center p-3 rounded">
      <TimeSegment timeSegment={hours} />
      <strong>:</strong>
      <TimeSegment timeSegment={minutes} />
      <strong>:</strong>
      <TimeSegment timeSegment={seconds} />
    </div>
  );
}
