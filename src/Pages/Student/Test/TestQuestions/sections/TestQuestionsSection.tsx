import { useEffect, useState, useRef } from "react";
import logo from "../../../../../assets/Images/home/coirei-logo-orange.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { finishTest, tickTimer } from "../../../../../store/slices/TestPageSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Clock } from "lucide-react";
import { startTest, submitTest } from "../../../../../services/testService";
import type { TestResponse } from "../../../../../services/testService";

const TestQuestionsSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { testname } = useParams<{ testname: string }>();

  const [testData, setTestData] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [revisitLater, setRevisitLater] = useState<number[]>([]);
  
  const testFinished = useAppSelector((state) => state.counter.finished);
  const timer = useAppSelector((state) => state.counter.timer);
  
  // Use a ref to keep track of the latest state values for the auto-finish closure
  const latestState = useRef({ selectedAnswers, revisitLater, timer, testData });
  useEffect(() => {
    latestState.current = { selectedAnswers, revisitLater, timer, testData };
  }, [selectedAnswers, revisitLater, timer, testData]);

  const testsById = useAppSelector((state) => state.resource.tests.byId);

  /* -------------------- INITIALIZATION -------------------- */
  useEffect(() => {
    const initTest = async () => {
      if (testname) {
        try {
          setLoading(true);
          
          // 1. Check Redux first for dummy/local tests
          const localTest = testsById[testname];
          if (localTest) {
            setTestData(localTest as any);
            setLoading(false);
            return;
          }

          // 2. Fallback to API for server-side tests
          const data = await startTest(Number(testname));
          if (data && typeof data === 'object') {
             setTestData(data as any as TestResponse);
          } else {
             toast.error("Invalid test data received.");
          }
        } catch (error) {
          console.error("Failed to start test:", error);
          toast.error("Failed to load test. Please try again.");
          navigate("/student/dashboard");
        } finally {
          setLoading(false);
        }
      }
    };
    initTest();
  }, [testname, navigate]);

  const questions = testData?.questions || [];
  const totalQuestions = questions.length;

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    if (loading || !testData) return;

    const interval = setInterval(() => {
      const { timer: currentTimer } = latestState.current;
      
      if (currentTimer <= 1) {
        clearInterval(interval);
        handleAutoSubmit();
      } else {
        dispatch(tickTimer());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, loading, testData]);

  const handleAutoSubmit = async () => {
    const { selectedAnswers: currentAnswers, revisitLater: currentRevisit, testData: currentTest } = latestState.current;
    if (!currentTest) return;
    await performSubmit(currentAnswers, currentRevisit, currentTest);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  /* -------------------- HANDLERS -------------------- */
  const handleAnswerSelect = (optionId: number) => {
    const qId = questions[currentQuestionIndex].id;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId
    }));
  };

  const clearResponse = () => {
    const qId = questions[currentQuestionIndex].id;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: null
    }));
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

  const performSubmit = async (answers: Record<number, number | null>, revisit: number[], test: any) => {
    try {
        const payload = {
            answers: Object.entries(answers)
                .filter(([_, optId]) => optId !== null)
                .map(([qId, optId]) => ({
                    question_id: Number(qId),
                    selected_option_id: optId as number
                }))
        };

        // 1. Only call the API for real (numeric) IDs
        if (!isNaN(Number(test.id))) {
          await submitTest(Number(test.id), payload);
        } else {
          console.log("Local/Dummy test detected, skipping API submission.");
        }
        
        const attempted = Object.values(answers).filter(v => v !== null).length;
        const marked = revisit.length;
        const unattempted = test.questions.length - attempted;

        dispatch(finishTest({
            total: test.questions.length,
            attempted,
            marked,
            unattempted,
        }));

        toast.success("Test submitted successfully!");
    } catch (error) {
        console.error("Submission failed:", error);
        toast.error("Failed to submit test.");
    }
  };

  const finishTestFn = async () => {
    if (testFinished || !testData) return;
    await performSubmit(selectedAnswers, revisitLater, testData);
  };

  const getQuestionColor = (index: number) => {
    const q = questions[index];
    if (selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== null) return "bg-green-500";
    if (revisitLater.includes(index)) return "bg-yellow-400";
    return "bg-red-400";
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F67300]"></div>
        </div>
    );
  }

  if (!testData || questions.length === 0) {
    return (
        <div className="flex flex-col h-screen items-center justify-center bg-white p-6 text-center">
            <h2 className="text-xl font-bold mb-4">No questions found for this test.</h2>
            <button onClick={() => navigate("/student/dashboard")} className="text-[#F67300] font-bold">Back to Dashboard</button>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  /* -------------------- UI -------------------- */
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-['Urbanist']">
      {/* Topbar */}
      <div className="flex flex-wrap items-center justify-between bg-white px-4 md:px-6 py-3 gap-3 shadow-sm z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-9" />
          <div className="text-base text-gray-600">
            <div className="font-bold text-[#1A1A1A]">{testData.title}</div>
            <div className="text-xs text-gray-400 font-medium">{testData.module_name}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-[#F67300] bg-orange-50 px-4 py-2 rounded-xl flex gap-2.5 items-center border border-orange-100">
             <Clock className="w-4 h-4"/> {formatTime(timer)}
          </div>
          <button
            onClick={finishTestFn}
            className="bg-[#F67300] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all cursor-pointer shadow-lg shadow-orange-50"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 flex-1 max-w-7xl mx-auto w-full">
        {/* Question Area */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-8">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F67300] mb-1 block">Assessment</span>
                <h2 className="font-bold text-2xl text-[#1A1A1A]">
                Question {currentQuestionIndex + 1}
                </h2>
            </div>
            <button
              onClick={toggleRevisitLater}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all border cursor-pointer ${
                revisitLater.includes(currentQuestionIndex)
                  ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                  : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {revisitLater.includes(currentQuestionIndex) ? "Marked for Revisit" : "Mark for Revisit"}
            </button>
          </div>

          <p className="text-lg text-[#1A1A1A] mb-10 font-medium leading-relaxed">
            {currentQuestion.text}
          </p>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Options</h3>
            <button
              onClick={clearResponse}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer uppercase tracking-wider"
            >
              Clear Choice
            </button>
          </div>

          <div className="space-y-4 mb-10 overflow-auto pr-2">
            {currentQuestion.options.map((opt: any) => (
              <label
                key={opt.id}
                className={`flex items-center gap-4 border-2 rounded-2xl px-5 py-4 cursor-pointer transition-all group ${
                  selectedAnswers[currentQuestion.id] === opt.id 
                    ? 'border-[#F67300] bg-orange-50/50 shadow-sm' 
                    : 'border-gray-50 hover:border-orange-100 hover:bg-gray-50/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAnswers[currentQuestion.id] === opt.id 
                    ? 'border-[#F67300]' 
                    : 'border-gray-200 group-hover:border-orange-200'
                }`}>
                    {selectedAnswers[currentQuestion.id] === opt.id && <div className="w-2.5 h-2.5 bg-[#F67300] rounded-full" />}
                </div>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  className="hidden"
                  checked={selectedAnswers[currentQuestion.id] === opt.id}
                  onChange={() => handleAnswerSelect(opt.id)}
                />
                <span className={`text-sm font-medium ${selectedAnswers[currentQuestion.id] === opt.id ? 'text-[#1A1A1A]' : 'text-gray-600'}`}>
                    {opt.text}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-auto pt-6 border-t border-gray-50">
            <button
               onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
               disabled={currentQuestionIndex === 0}
               className="text-gray-400 font-bold text-sm uppercase tracking-wider px-6 py-2 disabled:opacity-0 cursor-pointer"
            >
                Previous
            </button>
            <button
              onClick={goToNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="bg-[#F67300] text-white px-10 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-orange-50"
            >
              Next Question
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-[#1A1A1A] mb-6 pb-4 border-b border-gray-50">Answer Grid</h3>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`h-11 w-11 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${getQuestionColor(
                  i
                )} ${
                  currentQuestionIndex === i
                    ? "ring-4 ring-orange-100 scale-105"
                    : "hover:scale-105"
                }`}
              >
                {(i + 1).toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Answered</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{Object.values(selectedAnswers).filter(v => v !== null).length}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Revisit</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{revisitLater.length}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Remaining</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{totalQuestions - Object.values(selectedAnswers).filter(v => v !== null).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionsSection;
