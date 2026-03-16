import { useState } from "react";
import { ArrowLeft, Teacher, Add } from "iconsax-react";
import { ChevronDown, Edit2 } from "lucide-react";
import InstructorHeader from "../../../Components/instructor/InstructorHeader";
import QuestionCard from "../../../Components/instructor/QuestionCard";

interface CreateTestModalProps {
  onClose: () => void;
  onBack: () => void;
}

type QuestionType = "mcq" | "checkbox" | "short" | "long";

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  answerKey: number[];
  points: number;
}

const CreateTestModal = ({ onClose, onBack }: CreateTestModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);

  const courseOptions = ["Am101", "Advanced AI", "React Basics"];
  const batchOptions = ["Batch-01", "Batch-02", "Batch-03"];

  const [courseOpen, setCourseOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [title, setTitle] = useState("Test title");
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: Date.now(),
      text: "",
      type: "mcq",
      options: ["Option 1"],
      required: false,
      answerKey: [],
      points: 0,
    },
  ]);


  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: "",
        type: "mcq",
        options: ["Option 1"],
        required: false,
        answerKey: [],
        points: 0,
      },
    ]);
  };

  const updateQuestion = (id: number, data: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...data } : q))
    );
  };

  const addOption = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-[1100] overflow-y-auto">
      <div className="bg-white min-h-screen">

        {step === 1 && (
          <div className="flex h-screen">
            {/* LEFT PANEL */}
            <div className="w-[261px] bg-[#F67300] p-[30px] flex flex-col gap-[40px] text-white">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <ArrowLeft size={20}  color="white" />
                Back
              </button>

              <div className="w-[84px] h-[84px] bg-white/20 rounded-[24px] flex items-center justify-center">
                <Teacher size={42} variant="Bold"  color="white" />
              </div>

              <div>
                <h2 className="text-[32px] font-semibold mb-2">New Test</h2>
                <p className="text-[14px]">Target Audience</p>
              </div>

              <div className="mt-auto text-[16px] opacity-80">
                Step 1 of 2
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 p-[40px]">
              <h2 className="text-[36px] font-semibold mb-[30px] text-[#333]">
                Test
              </h2>

              <div className="flex flex-col gap-[20px] w-[573px]">

                {/* Course */}
                <div>
                  <label className="block mb-2">Course Name / ID</label>
                  <div className="relative">
                    <div
                      onClick={() => setCourseOpen(!courseOpen)}
                      className="h-[45px] px-4 border border-gray-200 rounded-[10px] flex justify-between items-center cursor-pointer"
                    >
                      <span className={selectedCourse ? "text-[#333]" : "text-[#D3D3D3]"}>
                        {selectedCourse || "E.g Am101"}
                      </span>
                      <ChevronDown size={18} />
                    </div>

                    {courseOpen && (
                      <div className="absolute mt-1 w-full bg-white border  border-gray-200 rounded-lg shadow">
                        {courseOptions.map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              setSelectedCourse(item);
                              setCourseOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-[#F5F7FF] cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Batch */}
                <div>
                  <label className="block mb-2">Batch ID</label>
                  <div className="relative">
                    <div
                      onClick={() => setBatchOpen(!batchOpen)}
                      className="h-[45px] px-4 border  border-gray-200 rounded-[10px] flex justify-between items-center cursor-pointer"
                    >
                      <span className={selectedBatch ? "text-[#333]" : "text-[#D3D3D3]"}>
                        {selectedBatch || "E.g Batch-01"}
                      </span>
                      <ChevronDown size={18} />
                    </div>

                    {batchOpen && (
                      <div className="absolute mt-1 w-full bg-white border  border-gray-200 rounded-lg shadow">
                        {batchOptions.map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              setSelectedBatch(item);
                              setBatchOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-[#F5F7FF] cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                 <div>
                  <label className="block mb-2">Module</label>
                  <input
                    placeholder="Module"
                    className="w-full h-[45px] px-4 border border-gray-200 rounded-[10px] outline-none focus:border-[#F67300]"
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Title</label>
                  <input
                    placeholder="E.g Mid Term Test"
                    className="w-full h-[45px] px-4 border border-gray-200 rounded-[10px] outline-none focus:border-[#F67300]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-10 w-[573px]">
                <button
                  onClick={onClose}
                  className="w-[126px] h-[44px] border rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-[126px] h-[44px] bg-[#F67300] text-white rounded-full"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}


        {step === 2 && (
          <>
            <InstructorHeader />

            <div className="bg-[#FAFAFA] min-h-screen px-6">

              {/* TOP BAR */}
              <div className="max-w-[1700px] mx-auto pt-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button onClick={() => setStep(1)}>
                    <ArrowLeft size={18} color="#100f0f" />
                  </button>

                  <div>
                    <span className="text-[12px] px-2 py-[2px] rounded-full bg-orange-50 text-[#F67300]">
                      Batch 02
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                      <Edit2 size={16} color="#9E9E9E" />
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-[18px] font-semibold bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* TIME */}
                <div className="bg-white border border-gray-200 rounded-xl px-3 py-2">
                  <p className="text-sm mb-1">Due Time (IST)</p>
                  <div className="flex gap-2">
                    <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
                    <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-white border border-gray-200 rounded-[28px] p-3 my-4">
                <label className="text-[16px] font-medium mb-3 block px-3">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                  className="px-4 w-full outline-none resize-none bg-transparent order rounded-[18px] border border-gray-200"
                />
              </div>

              {/* QUESTIONS */}
              {questions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  index={index + 1}
                  question={q.text}
                  type={q.type}
                  options={q.options}
                  required={q.required}
                  answerKey={q.answerKey}
                  points={q.points}
                  onChange={(data) => updateQuestion(q.id, data)}
                  onAddOption={() => addOption(q.id)}
                  onDelete={() => deleteQuestion(q.id)}
                />
              ))}

              <button onClick={addQuestion} className="flex items-center gap-2 text-[#F67300] mt-6">
                <Add size={18} /> Add Question
              </button>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={onClose} className="border rounded-full px-6 py-2">
                  Cancel
                </button>
                <button className="bg-[#F67300] text-white rounded-full px-6 py-2">
                  Publish
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTestModal;
