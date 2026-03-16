import { useEffect, useState } from "react";

interface CountdownTimerProps {
  onExpire?: () => void;
}

export default function CountdownTimer({ onExpire }: CountdownTimerProps) {
  // Target date - dynamically set to 10 seconds from now for testing purposes
  // In production, this would use a real date from test data
  const [targetDate] = useState(() => new Date(new Date().getTime() + 10000));

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!expired) {
          setExpired(true);
          if (onExpire) {
            onExpire();
          }
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, expired, onExpire]);

  // Format the target date for display
  const formattedDate = targetDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-3 mx-auto rounded-md text-center w-full">
      <p className="text-[#60646D] text-sm">
        Your test is scheduled to begin at
      </p>
      <p className="md:text-[#333333] text-white text-lg font-semibold mt-2">
        {formattedDate}
      </p>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-2 text-orange-500 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-semibold">Time Remaining</span>
        </div>

        <div className="flex mt-6 text-orange-500 text-2xl font-bold space-x-1 justify-center items-baseline">
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-white mt-1 font-normal">Days</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-white mt-1 font-normal">Hours</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-white mt-1 font-normal">Minutes</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-white mt-1 font-normal">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

