import date from "../../../assets/Images/test/date.png";
import timer from "../../../assets/Images/test/timer.png";
import marks from "../../../assets/Images/test/marks.png";
import warning from "../../../assets/Images/test/warning.png";
import { useEffect, useState } from "react";

export default function TestPortalSection() {
  // get seconds from backend
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds / (60 * 60)) % 24);
  const minutes = Math.floor((seconds / 60) % 60);
  const secs = seconds % 60;

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full rounded-xl   space-y-6">
       

        

        {/* Test details */}
        <div className=" flex flex-col justify-evenly bg-white pb-20 ">
          {/* Orange divider */}
          <div className="h-4 w-full bg-[#FFB54B] rounded-t-lg mb-7.5" />
          <div className="flex items-center justify-between mx-5 mb-12.5">
            <h2 className="font-medium">Full Stack Web Development-Test</h2>
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
              Upcoming
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-15">
            {[
              { label: "Date", value: "Jan 21, 2026" },
              { label: "Time", value: "09:00 PM" },
              { label: "Duration", value: "90 mins" },
              { label: "Total Marks", value: "100" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#fafafa] rounded-lg p-4"
              >
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-sm">
                  {
                    item.label == "Date"?<img src={date} />: item.label == "Total Marks"?<img src={marks} />:<img src={timer} />
                  }
                  
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="flex flex-col justify-center bg-[#DFE9FFB2] rounded-xl p-6 text-center space-y-4 h-71">
          <p className="text-sm font-medium">Test Starts In</p>

          <div className="flex justify-center gap-4">
            {[days, hours, minutes, secs].map((t, i) => (
              <div key={i} className="bg-white rounded-lg px-4 py-3">
                <p className="text-xl font-semibold text-[#AFC6FF]">
                  {String(t).padStart(2, "0")}
                </p>
                <p className="text-[10px] text-gray-500">
                  {i === 0
                    ? "Days"
                    : i === 1
                    ? "Hours"
                    : i === 2
                    ? "Minutes"
                    : "Seconds"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Start button */}
        <div className="flex justify-center">
          {seconds <= 0 ? (
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded-md text-sm font-medium cursor-pointer">
              Start Now
            </button>
          ) : (
            <button
              disabled
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded-md text-sm font-medium disabled:cursor-not-allowed"
            >
              Start Now
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <div className="flex justify-center items-center gap-2 text-sm font-medium">
            <img src={warning} /> Important Instructions
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium text-green-700">Do’s</p>
              <ul className="space-y-1 text-green-700">
                <li>✔ Ensure stable internet connection before starting</li>
                <li>✔ Keep your ID proof ready for verification</li>
                <li>✔ Submit the test before the timer ends</li>
                <li>✔ Read each question carefully before answering</li>
                <li>✔ Save your answers frequently</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium text-red-700">Don’ts</p>
              <ul className="space-y-1 text-red-700">
                <li>✖ Do not refresh or close the browser during the test</li>
                <li>✖ Do not use any external resources or notes</li>
                <li>✖ Do not switch tabs or windows during the test</li>
                <li>✖ Do not attempt to copy or screenshot questions</li>
                <li>✖ Do not discuss questions with other students</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
