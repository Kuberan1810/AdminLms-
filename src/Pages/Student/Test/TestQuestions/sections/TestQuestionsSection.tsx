import { useEffect, useState } from "react";
import logo from "../../../../../assets/Images/home/coirei-logo-orange.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { finishTest } from "../../../../../store/slices/TestPageSlice";

const TestQuestionsSection = () => {
  const dispatch = useAppDispatch();

  const totalQuestions = 20;
  const initialTime = 10; // seconds

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
      question: `Question ${i + 2}: Sample question?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: Math.floor(Math.random() * 4),
    })),
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [revisitLater, setRevisitLater] = useState<number[]>([]);
  const [timer, setTimer] = useState(initialTime);
  const testFinished = useAppSelector((state ) => state.counter.finished)
  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    if (testFinished) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTestFn();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testFinished]);

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

    dispatch(finishTest());
    alert("Test finished!");
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
      <div className="flex flex-wrap items-center justify-between bg-white px-4 md:px-6 py-3 gap-3">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-9" />
          <div className="text-base text-gray-600">
            <div>Student Name / ID</div>
            <div className="text-base">Test Name</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-700">
            Test Timing {formatTime(timer)}
          </div>
          <button
            onClick={finishTestFn}
            className="bg-[#F673001A] text-[#F67300] px-4 py-2 rounded text-sm"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:p-6">
        {/* Question Area */}
        <div className="flex-1 bg-white p-5 rounded   ">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium">
              Question {currentQuestionIndex + 1}
            </h2>
            <button
              onClick={toggleRevisitLater}
              className={`text-sm ${
                revisitLater.includes(currentQuestionIndex)
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              Revisit Later
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-6">
            {questions[currentQuestionIndex].question}
          </p>

          <div className="flex justify-between mb-4">
            <h3 className="font-medium">Select an Option</h3>
            <button
              onClick={clearResponse}
              className="text-sm text-gray-500"
            >
              Clear Response
            </button>
          </div>

          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-3 border border-[#D3D3D3] rounded px-4 py-3 cursor-pointer hover:border-orange-400"
              >
                <input
                  type="radio"
                  checked={selectedAnswers[currentQuestionIndex] === i}
                  onChange={() => handleAnswerSelect(i)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={goToNext}
              className="bg-orange-500 text-white px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white p-4 rounded  ">
          <h3 className="font-medium mb-3">Questions</h3>

          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-4 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`h-9 w-9 text-white text-sm rounded ${getQuestionColor(
                  i
                )} ${
                  currentQuestionIndex === i
                    ? "ring-2 ring-black"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs space-y-1 text-gray-600">
            <div>🟩 Answered</div>
            <div>🟥 Not Answered</div>
            <div>🟨 Revisit Later</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionsSection;
