  import { useEffect, useState, useRef } from "react";
import logo from "../../../../../assets/Images/home/coirei-logo-orange.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { finishTest, tickTimer } from "../../../../../store/slices/TestPageSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Clock } from "lucide-react";

const TestQuestionsSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalQuestions = 20;

  const questions = [
    {
      question: "Machine Learning is a subset of which field?",
      options: [
        "Data Science",
        "Web Development",
        "Artificial Intelligence",
        "Cloud Computing",
      ],
      correct: 2,
    },
    ...Array.from({ length: 19 }, (_, i) => ({
      question: `Question ${i + 2}: Sample question for demonstration?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: Math.floor(Math.random() * 4),
    })),
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [revisitLater, setRevisitLater] = useState<number[]>([]);
  
  const testFinished = useAppSelector((state) => state.counter.finished);
  const timer = useAppSelector((state) => state.counter.timer);
  
  // Use a ref to keep track of the latest state values for the auto-finish closure
  const latestState = useRef({ selectedAnswers, revisitLater, timer });
  useEffect(() => {
    latestState.current = { selectedAnswers, revisitLater, timer };
  }, [selectedAnswers, revisitLater, timer]);

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    // Timer runs continuously through Redux now
    const interval = setInterval(() => {
      const { timer: currentTimer } = latestState.current;
      
      if (currentTimer <= 1) {
        clearInterval(interval);
        
        // Auto submit the test permanently when time is up
        const { selectedAnswers: currentAnswers, revisitLater: currentRevisit } = latestState.current;
        const attempted = currentAnswers.filter(ans => ans !== null).length;
        const marked = currentRevisit.length;
        const unattempted = totalQuestions - attempted;
        
        dispatch(finishTest({
          total: totalQuestions,
          attempted,
          marked,
          unattempted,
        }));
        
        toast.success("Time's up! Your test has been automatically submitted.");
        navigate("student/dashboard");
      } else {
        dispatch(tickTimer());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  /* -------------------- HANDLERS -------------------- */
  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestionIndex] = optionIndex;
      return copy;
    });
  };

  const clearResponse = () => {
    setSelectedAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestionIndex] = null;
      return copy;
    });
  };

  const toggleRevisitLater = () => {
    setRevisitLater((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev.filter((i) => i !== currentQuestionIndex)
        : [...prev, currentQuestionIndex]
    );
  };

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const finishTestFn = () => {
    if (testFinished) return;

    // Calculate stats dynamically
    const attempted = selectedAnswers.filter(ans => ans !== null).length;
    const marked = revisitLater.length;
    const unattempted = totalQuestions - attempted;
    
    dispatch(finishTest({
      total: totalQuestions,
      attempted,
      marked,
      unattempted,
    }));
  };

  const getQuestionColor = (index: number) => {
    if (selectedAnswers[index] !== null) return "bg-green-500";
    if (revisitLater.includes(index)) return "bg-yellow-400";
    return "bg-red-400";
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar */}
      <div className="flex flex-wrap items-center justify-between bg-white px-4 md:px-6 py-3 gap-3 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-9" />
          <div className="text-base text-gray-600">
            <div className="font-medium text-black">Student Name / ID</div>
            <div className="text-sm">Full Stack test</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md flex gap-2.5 items-center">
             <Clock className="w-5 h-5 text-[#626262]"/> {formatTime(timer)}
          </div>
          <button
            onClick={finishTestFn}
            className="bg-[#F673001A] text-[#F67300] px-4 py-2 rounded text-sm font-semibold hover:bg-orange-100 transition-colors cursor-pointer"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 flex-1">
        {/* Question Area */}
        <div className="flex-1 bg-white p-6 rounded shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">
              Question {currentQuestionIndex + 1}
            </h2>
            <button
              onClick={toggleRevisitLater}
              className={`text-sm font-medium px-3 py-1.5 rounded transition-colors cursor-pointer ${
                revisitLater.includes(currentQuestionIndex)
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {revisitLater.includes(currentQuestionIndex) ? "Marked for Revisit" : "Mark for Revisit"}
            </button>
          </div>

          <p className="text-base text-gray-800 mb-8 font-medium">
            {questions[currentQuestionIndex].question}
          </p>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-600">Select an Option</h3>
            <button
              onClick={clearResponse}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Clear Response
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {questions[currentQuestionIndex].options.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 border rounded px-4 py-3 cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestionIndex] === i ? 'border-orange-500 bg-orange-50' : 'border-[#D3D3D3] hover:border-orange-400'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500"
                  checked={selectedAnswers[currentQuestionIndex] === i}
                  onChange={() => handleAnswerSelect(i)}
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={goToNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="bg-orange-500 text-white px-8 py-2.5 rounded font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next Question
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 bg-white p-5 rounded shadow-sm h-fit">
          <h3 className="font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Questions Overview</h3>

          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2.5 mb-6">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`h-10 w-10 text-white text-sm font-medium rounded transition-all cursor-pointer ${getQuestionColor(
                  i
                )} ${
                  currentQuestionIndex === i
                    ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                    : "hover:opacity-90"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="text-sm space-y-3 text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-500 inline-block"></span> Answered</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-400 inline-block"></span> Not Answered</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-yellow-400 inline-block"></span> Marked for Revisit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionsSection;
