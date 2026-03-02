import { useState } from "react";
import { Teacher, Add, Clock } from "iconsax-react";
import { ChevronDown, Edit2, ChevronLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addTest } from "../../../store/slices/ResourcesSlice";
import { useNavigate } from "react-router-dom";

// Import type to avoid conflicts
import type { Question } from "../../../store/slices/ResourcesSlice";
import InstructorHeader from "../../../Components/instructor/InstructorHeader";
import QuestionCard from "../../../Components/instructor/QuestionCard";

const CreateTestPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [step, setStep] = useState<1 | 2>(1);

    // Fetch modules from Redux
    const modulesState = useAppSelector((state) => state.resource.modules);
    const existingModules = modulesState.allIds.map(id => ({
        id,
        title: modulesState.byId[id].title
    }));

    const courseOptions = ["Am101", "Advanced AI", "React Basics"];
    const batchOptions = ["Batch-01", "Batch-02", "Batch-03"];

    const [courseOpen, setCourseOpen] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);
    const [moduleOpen, setModuleOpen] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedModuleTitle, setSelectedModuleTitle] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    const handleBack = () => navigate(-1);
    const handleClose = () => navigate("/instructor/dashboard");


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

    const handlePublish = () => {
        // Basic validation
        if (!title.trim()) {
            alert("Please enter a test title");
            return;
        }

        // Use selected module or default to the first one available, or throw error if none
        const targetModuleId = selectedModuleId || existingModules[0]?.id;

        if (!targetModuleId) {
            alert("Please select a module to publish this test to.");
            return;
        }

        const totalMarks = questions.reduce((sum, q) => sum + (q.points || 0), 0);

        const newTest = {
            id: crypto.randomUUID(),
            name: title,
            moduleId: targetModuleId,
            course: selectedCourse || "Am101",
            batch: selectedBatch || "Batch-01",
            category: "Test", // Default category
            description: description,
            fromTime: fromTime,
            toTime: toTime,
            questions: questions,
            totalMarks: totalMarks,
            createdAt: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0], // For compatibility with BatchesSection
        };

        dispatch(addTest(newTest));
        setShowSuccessModal(true);
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-white">
            {step === 1 && (
                <div className="flex flex-col md:flex-row h-screen overflow-hidden">
                    {/* LEFT PANEL */}
                    <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                        <button
                            onClick={handleBack}
                            className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 z-20 cursor-pointer"
                        >
                            <ChevronLeft size={20} color="white" />
                            <span className="hidden md:inline">Back</span>
                        </button>

                        <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                            <Teacher size={42} color="white" variant="Bold" />
                        </div>

                        <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                            <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2 text-white">New Test</h2>
                            <p className="text-[14px] font-medium leading-[140%] text-white/90 opacity-90 md:opacity-100">Target Audience</p>
                        </div>

                        <div className="hidden md:block mt-auto text-[16px] opacity-80 text-white">
                            Step 1 of 2
                        </div>

                        {/* Decorative circles */}
                        <div className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="hidden md:block absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex-5 p-4 md:p-[40px] overflow-auto relative">
                        <h2 className="text-2xl md:text-[32px] font-semibold mb-6 md:mb-[30px] text-[#333333]">
                            Test
                        </h2>

                        <div className="flex flex-col gap-[20px] w-full">

                            {/* Course */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Course Name / ID</label>
                                <div className="relative">
                                    <div
                                        onClick={() => setCourseOpen(!courseOpen)}
                                        className="h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer"
                                    >
                                        <span className={selectedCourse ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedCourse || "E.g Am101"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {courseOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-50">
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
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Batch ID</label>
                                <div className="relative">
                                    <div
                                        onClick={() => setBatchOpen(!batchOpen)}
                                        className="h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer"
                                    >
                                        <span className={selectedBatch ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedBatch || "E.g Batch-01"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {batchOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-50">
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

                            {/* Module Selection */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Module</label>
                                <div className="relative">
                                    <div
                                        onClick={() => setModuleOpen(!moduleOpen)}
                                        className="h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer"
                                    >
                                        <span className={selectedModuleTitle ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedModuleTitle || "Select Module"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {moduleOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-50 max-h-48 overflow-y-auto">
                                            {existingModules.map((mod) => (
                                                <div
                                                    key={mod.id}
                                                    onClick={() => {
                                                        setSelectedModuleId(mod.id);
                                                        setSelectedModuleTitle(mod.title);
                                                        setModuleOpen(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-[#F5F7FF] cursor-pointer"
                                                >
                                                    {mod.title}
                                                </div>
                                            ))}
                                            {existingModules.length === 0 && (
                                                <div className="px-4 py-2 text-gray-500">No modules found</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Title</label>
                                <input
                                    placeholder="E.g Mid Term Test"
                                    className="w-full h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3.75 mt-8 w-full">
                            <button
                                onClick={handleClose}
                                className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer"
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

                    <div className="bg-[#FAFAFA] min-h-screen px-4 md:px-6">

                        {/* TOP BAR */}
                        <div className="max-w-[1700px] mx-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep(1)} className="cursor-pointer">
                                    <ChevronLeft size={20} color="#100f0f" />
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
                                            className="text-[18px] font-semibold bg-transparent outline-none w-full md:w-auto"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* TIME */}
                            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 w-full md:w-auto">
                                <p className="text-sm mb-2 text-[#333333] font-medium">Due Time (IST)</p>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <input
                                            type="time"
                                            value={fromTime}
                                            onChange={(e) => setFromTime(e.target.value)}
                                            className="w-[120px] h-[35px] pl-[10px] pr-[35px] rounded-[8px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-sm text-[#333333] transition-colors relative z-10 bg-transparent"
                                        />
                                        <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                            <Clock size={16} color="#333333" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="time"
                                            value={toTime}
                                            onChange={(e) => setToTime(e.target.value)}
                                            className="w-[120px] h-[35px] pl-[10px] pr-[35px] rounded-[8px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-sm text-[#333333] transition-colors relative z-10 bg-transparent"
                                        />
                                        <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                            <Clock size={16} color="#333333" />
                                        </div>
                                    </div>
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
                                className="px-4 w-full outline-none resize-none bg-transparent rounded-[18px]"
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

                        <div className="flex justify-end gap-3.75 mt-4 pb-[20px]">
                            <button onClick={handleClose} className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handlePublish}
                                className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer"
                            >
                                Publish
                            </button>
                        </div>

                    </div>
                </>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1200] p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-xl text-center flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-2">Success</h3>
                        <p className="text-gray-500 mb-6">Contents are uploaded successfully</p>

                        <button
                            onClick={handleClose}
                            className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTestPage;
