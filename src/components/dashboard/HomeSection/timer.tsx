import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface TimerProps {
  onTimeUpdate: (seconds: number) => void;
  onStop: (totalSeconds: number) => void;
}

export default function Timer({ onTimeUpdate, onStop }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => {
          const newSeconds = s + 1;
          onTimeUpdate(newSeconds);
          return newSeconds;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const handleStop = () => {
    setIsRunning(false);
    onStop(seconds);
    setSeconds(0);
  };
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl border border-gray-200 p-6">
      <div className="text-4xl font-mono text-center mb-4">
        {formatTime(seconds)}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-2 rounded-full bg-violet-100 hover:bg-violet-200"
        >
          {isRunning ? (
            <PauseIcon className="w-6 h-6 text-violet-600" />
          ) : (
            <PlayIcon className="w-6 h-6 text-violet-600" />
          )}
        </button>
        <button
          onClick={handleStop}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200"
        >
          <StopIcon className="w-6 h-6 text-red-600" />
        </button>
      </div>
    </div>
  );
}
