import "../TestDesign.css";
import logo from "../../../../assets/Images/home/coirei-logo-orange.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { startTest as startTestSync } from "../../../../store/slices/TestPageSlice";
import CountdownTimer from "./CardInfo";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function TestSectionNew() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Get test details from navigation state if available
  const testInfo = location.state?.test;

  if (!testInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">No test selected</h2>
        <button onClick={() => navigate("/student/test")} className="bg-[#F67300] text-white px-6 py-2 rounded-lg">
          Go to Test List
        </button>
      </div>
    );
  }

  // Parse date and time (e.g., date: "2026-03-24", fromTime: "09:00 AM")
  const getTargetDate = () => {
    const [year, month, day] = testInfo.date.split('-').map(Number);
    const [time, period] = testInfo.fromTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return new Date(year, month - 1, day, hours, minutes);
  };

  const targetDate = getTargetDate();
  const [testReady, setTestReady] = useState(() => new Date() >= targetDate);

  const changeStatus = () => {
    dispatch(startTestSync());
    // Navigate using the test ID
    navigate(`/student/test/${testInfo.id}`);
  };

  const goToPrev = () => {
    navigate(-1);
  };

  const finishStatus = useAppSelector((state) => state.counter.finished);

  return (
    <div className="test-wrapper font-['Urbanist']">
      {/* LEFT SECTION */}
      <div className="left-section">
        
        <div className="logo">
          <img src={logo} alt="logo" className="w-30" />
        </div>
        <div className="goBack mt-4 ">
          <button onClick={goToPrev} className="back-btn cursor-pointer flex gap-2 text-lg items-center">
            <ArrowLeft /> Back
          </button>
        </div>


        <p className="greet">Hi Student,</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Welcome to <br />
          <span className="text-[#F67300] text-3xl md:text-4xl lg:text-5xl">{testInfo.title}</span>
        </h1>

        <div className="stats">
          <div>
            <p className="label">Question Count</p>
            <p className="value ">{testInfo.questionCount} Questions</p>
          </div>
          <div>
            <p className="label">Total Marks</p>
            <p className="value">{testInfo.totalMarks}</p>
          </div>
          <div>
            <p className="label">Time Duration</p>
            <p className="value">{testInfo.duration} Minutes</p>
          </div>
        </div>

        {/* MOBILE CARD - Shows on mobile only */}
        <div className="mobile-card md:hidden">
          <div className="info-card">
            <CountdownTimer targetDate={targetDate} onExpire={() => setTestReady(true)} />
          </div>
        </div>

        <button
          className={`start-btn text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-50
             ${(testReady && !finishStatus) ? 'bg-[#F67300] hover:bg-orange-600 cursor-pointer' : 'bg-gray-400 opacity-50 cursor-not-allowed'}`}
          onClick={changeStatus}
          disabled={!testReady || finishStatus}
        >
          Start Test
        </button>
        <p className="text-xs text-gray-400 mt-6 font-medium">
          *The start button will activate automatically when the countdown reaches zero
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section hidden md:flex relative overflow-hidden">
        <div className="orange-blob top"></div>
        <div className="orange-blob bottom"></div>

        <div className="info-card z-10">
          <CountdownTimer targetDate={targetDate} onExpire={() => setTestReady(true)} />
        </div>
      </div>
    </div>
  );
}
