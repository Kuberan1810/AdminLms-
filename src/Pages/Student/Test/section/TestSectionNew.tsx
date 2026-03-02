import "../TestDesign.css";
import logo from "../../../../assets/Images/home/coirei-logo-orange.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { startTest } from "../../../../store/slices/TestPageSlice";
import CountdownTimer from "./CardInfo";
import { ArrowLeft } from "lucide-react";


export default function TestSectionNew() {
  const testname = "Full Stack test";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeStatus = () => {
    dispatch(startTest());
    navigate(`/student/test/${testname}`);
  };

  const goToPrev = () =>{
    navigate(-1);
  }

  const finishStatus = useAppSelector((state) => state.counter.finished);

  return (
    <div className="test-wrapper">
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


        <p className="greet">Hi Student name,</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl">
          Welcome to <br />
          <span className="text-[#FF7800] text-3xl md:text-4xl lg:text-5xl">{testname}</span>
        </h1>

        <div className="stats">
          <div>
            <p className="label">Question Count</p>
            <p className="value ">20 Questions</p>
          </div>
          <div>
            <p className="label">Total Marks</p>
            <p className="value">100</p>
          </div>
          <div>
            <p className="label">Time Duration</p>
            <p className="value">40 Minutes</p>
          </div>
        </div>

        {/* MOBILE CARD - Shows on mobile only */}
        <div className="mobile-card md:hidden">
          <div className="info-card">
            <CountdownTimer />
          </div>
        </div>

        <button
          className="start-btn 
             bg-orange-500 text-white px-4 py-2 rounded 
             hover:bg-orange-600 
             disabled:opacity-50 
             disabled:cursor-not-allowed 
             disabled:hover:bg-orange-500"
          onClick={changeStatus}
          disabled={finishStatus}
        >
          Start Test
        </button>
        <p className="text-xs text-gray-400 mt-4 ">
          *The start button will activate automatically when the countdown reaches zero
        </p>

        {/* TABLET CARD - Shows on tablet/medium screens */}
        {/* <div className="tablet-card block md:hidden  mt-8">
          <div className="info-card">
            <CountdownTimer />
          </div>
        </div> */}
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section hidden md:flex">
        <div className="orange-blob top"></div>
        <div className="orange-blob bottom"></div>

        <div className="info-card ">
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}
