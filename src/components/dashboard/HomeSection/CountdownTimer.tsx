import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  onComplete: () => void;
}

export default function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, onComplete]);

  // format time
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  };

  const handleStart = () => {
    const totalSeconds =
      parseInt(inputHours) * 3600 + parseInt(inputMinutes) * 60;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };
  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputHours("");
    setInputMinutes("");
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {timeLeft === 0 ? (
        <div className="flex gap-4 mb-4">
          <div>
            <label
              htmlFor="hours"
              className="block text-sm font-medium text-gray-700"
            >
              Hours
            </label>
            <input
              type="numbers"
              id="hours"
              value={inputHours}
              onChange={(e) => setInputHours(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              min="0"
            />
          </div>
          <div>
            <label
              htmlFor="minutes"
              className="block text-sm font-medium text-gray-700"
            >
              Minutes
            </label>
            <input
              type="numbers"
              id="minutes"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      ) : (
        <div className="text-4xl font-mono text-center mb-4">
          {formatTime(timeLeft)}
        </div>
      )}
      <div className="flex justify-center gap-4">
        {timeLeft === 0 ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-800"
          >
            Start Timer
          </button>
        ) : (
          <>
            <button>
              {isRunning ? (
                <PauseIcon className="w-6 h-6 text-violet-600" />
              ) : (
                <PlayIcon className="w-6 h-6 text-violet-600" />
              )}
            </button>
            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200">
              <StopIcon className="w-6 h-6 text-red-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
