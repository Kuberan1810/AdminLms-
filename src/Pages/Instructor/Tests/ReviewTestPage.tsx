import { ArrowLeft } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorHeader from "../../../Components/instructor/InstructorHeader";

/* ================= TYPES ================= */

type QuestionType = "mcq" | "checkbox" | "short" | "long";

interface ReviewQuestion {
  question: string;
  type: QuestionType;
  options?: string[];
  correct: number[];
  student: number[];
  points: number;
}

/* ================= COMPONENT ================= */

const ReviewTestPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const questions: ReviewQuestion[] = [
    {
      question: "What is AI?",
      type: "mcq",
      options: ["Option 1", "Option 2", "Option 3"],
      correct: [1],
      student: [0],
      points: 1,
    },
    {
      question: "Select ML types",
      type: "checkbox",
      options: ["Supervised", "Unsupervised", "Reinforcement"],
      correct: [0],
      student: [0],
      points: 2,
    },
    {
      question: "Explain Neural Networks",
      type: "short",
      correct: [],
      student: [],
      points: 2,
    },
  ];

  const totalScore = 85;
  const maxScore = 100;

  const isAnswerCorrect = (correct: number[], student: number[]) => {
    if (correct.length !== student.length) return false;
    return correct.every((c) => student.includes(c));
  };

  return (
    <>
      <InstructorHeader />

      <div className="bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-10 py-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} color="black" />
          </button>

          <h2 className="text-lg sm:text-xl font-semibold">Review Test</h2>

          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
            Submitted
          </span>
        </div>

        {/* ================= STUDENT DETAILS ================= */}
        <div className="p-3 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <p className="font-medium text-gray-800">
                Student name {studentId}
              </p>
              <p>Submitted : 22 Jan, 01:00pm</p>
            </div>

            <span className="inline-block mt-2 border border-gray-200 px-3 py-1 rounded-lg text-xs">
              Number of Questions attended: 19/20
            </span>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium w-fit">
            {totalScore} <span className="text-gray-400">/{maxScore}</span>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="bg-white rounded-xl p-4 mb-6 max-w-5xl mx-auto">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-600 rounded-lg border border-gray-200 p-3 leading-relaxed">
            AI Agents are systems that use LLMs to plan, act, and collaborate
            autonomously. LangChain builds tool-using agents for workflows and
            RAG. CrewAI enables role-based multi-agent teamwork.
          </p>
        </div>

        {/* ================= QUESTIONS ================= */}
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 mb-4 max-w-5xl mx-auto"
          >
            <div className="flex justify-between items-start mb-3 gap-3">
              <p className="font-medium text-sm sm:text-base">
                {index + 1}. {q.question}
              </p>
              <span className="text-xs px-2 py-1 border border-gray-200 text-gray-500 rounded">
                {q.points} Mark
              </span>
            </div>

            {(q.type === "mcq" || q.type === "checkbox") &&
              q.options?.map((opt, i) => {
                const isCorrect = q.correct.includes(i);
                const isStudent = q.student.includes(i);

                let bg = "bg-gray-50";
                let icon = null;
                let accent = "accent-gray-400";

                if (isCorrect) {
                  bg = "bg-green-100";
                  icon = "✔";
                  accent = "accent-green-600";
                } else if (isStudent && !isCorrect) {
                  bg = "bg-red-100";
                  icon = "✖";
                  accent = "accent-red-600";
                }

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-3 p-3 rounded-md mb-2 ${bg}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type={q.type === "mcq" ? "radio" : "checkbox"}
                        checked={isStudent}
                        readOnly
                        className={`w-4 h-4 ${accent}`}
                      />
                      <span className="text-sm">{opt}</span>
                    </div>

                    {icon && (
                      <span
                        className={`text-lg font-semibold ${
                          icon === "✔"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {icon}
                      </span>
                    )}
                  </div>
                );
              })}

            {q.type === "short" && (
              <input
                disabled
                placeholder="Answer max 250 words"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50"
              />
            )}

            {q.correct.length > 0 &&
              !isAnswerCorrect(q.correct, q.student) && (
                <p className="text-xs text-gray-500 mt-2">
                  Correct answer:{" "}
                  <span className="text-green-600 font-medium">
                    {q.correct.map((i) => q.options?.[i]).join(", ")}
                  </span>
                </p>
              )}
          </div>
        ))}

        {/* ================= DONE BUTTON ================= */}
        <div className="flex justify-end mt-6 max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-orange-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewTestPage;
