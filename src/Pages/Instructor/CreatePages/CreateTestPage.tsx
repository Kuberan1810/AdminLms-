import { useState, useEffect, useRef } from "react";
import { Teacher, Add, Clock, Calendar } from "iconsax-react";
import { ChevronDown, Edit2, ChevronLeft, X } from "lucide-react";
import { useAppDispatch } from "../../../store/hooks";
import { addTest } from "../../../store/slices/ResourcesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalizeWords } from "../../../utils/capitalize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";

// Import types
import type { Question } from "../../../store/slices/ResourcesSlice";
import InstructorHeader from "../../../Components/instructor/InstructorHeader";
import QuestionCard from "../../../Components/instructor/QuestionCard";
import { getCourses, getBatches, getModules } from "../../../services/assignmentService";
import type { Course, Module } from "../../../services/assignmentService";
import { createTest } from "../../../services/testService";

// Custom styles for DatePicker and Custom Time Picker to match the theme
const customPickerStyles = `
  .react-datepicker-wrapper { width: 100%; }
  .react-datepicker__input-container input { 
    width: 100%; border: none; outline: none; background: transparent; font-size: 14px; color: #626262; 
  }
  .react-datepicker {
    border: none; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
    font-family: 'Urbanist', sans-serif; overflow: hidden;
  }
  .react-datepicker__header {
    background: #FFF5ED; border-bottom: 1px solid #FFE7D6; padding-top: 15px; border-radius: 20px 20px 0 0;
  }
  .react-datepicker__day--selected { background-color: #F67300 !important; border-radius: 10px; }
  .react-datepicker__day:hover { background-color: #FFF5ED !important; border-radius: 10px; }
  .no-calendar-icon::-webkit-calendar-picker-indicator { display: none; }

  /* Custom Time Picker Scrollbar */
  .time-column::-webkit-scrollbar { width: 4px; }
  .time-column::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
`;

const TimePickerPopup = ({ 
    isOpen, 
    onClose, 
    selectedTime, 
    onSelect 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    selectedTime: Date | null;
    onSelect: (time: Date) => void;
}) => {
    // 12-hour hours: 12, 01, ..., 11
    const hours = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
    const periods = ["AM", "PM"];

    const getInitialHour = () => {
        if (!selectedTime) return "09";
        let h = selectedTime.getHours();
        h = h % 12;
        if (h === 0) h = 12;
        return h.toString().padStart(2, '0');
    };

    const getInitialPeriod = () => {
        if (!selectedTime) return "AM";
        return selectedTime.getHours() >= 12 ? "PM" : "AM";
    };

    const [tempHour, setTempHour] = useState(getInitialHour());
    const [tempMin, setTempMin] = useState(selectedTime ? selectedTime.getMinutes().toString().padStart(2, '0') : "00");
    const [tempPeriod, setTempPeriod] = useState(getInitialPeriod());

    const handleSet = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newTime = new Date();
        let h = parseInt(tempHour);
        if (tempPeriod === "PM" && h < 12) h += 12;
        if (tempPeriod === "AM" && h === 12) h = 0;
        
        newTime.setHours(h);
        newTime.setMinutes(parseInt(tempMin));
        onSelect(newTime);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full mt-2 right-0 z-100 bg-white rounded-[24px] shadow-2xl border border-gray-100 p-6 w-[320px] cursor-default"
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#1A1A1A]">Set Time</span>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><X size={18} /></button>
                </div>

                <div className="flex gap-2 mb-6 h-[180px]">
                    {/* Hours Column */}
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">Hrs</span>
                        <div className="flex-1 w-full overflow-y-auto time-column px-1">
                            {hours.map(h => (
                                <button
                                    key={h}
                                    onClick={() => setTempHour(h)}
                                    className={`w-full py-2.5 rounded-xl mb-1 text-sm font-semibold transition-all ${tempHour === h ? "bg-[#F67300] text-white shadow-lg shadow-orange-100" : "text-[#626262] hover:bg-[#FFF5ED] hover:text-[#F67300]"}`}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Minutes Column */}
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">Min</span>
                        <div className="flex-1 w-full overflow-y-auto time-column px-1">
                            {minutes.map(m => (
                                <button
                                    key={m}
                                    onClick={() => setTempMin(m)}
                                    className={`w-full py-2.5 rounded-xl mb-1 text-sm font-semibold transition-all ${tempMin === m ? "bg-[#F67300] text-white shadow-lg shadow-orange-100" : "text-[#626262] hover:bg-[#FFF5ED] hover:text-[#F67300]"}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AM/PM Column */}
                    <div className="w-[60px] flex flex-col items-center border-l border-gray-50 pl-2">
                        <span className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">AM/PM</span>
                        <div className="flex-1 w-full flex flex-col gap-2 justify-center">
                            {periods.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setTempPeriod(p)}
                                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${tempPeriod === p ? "bg-[#F67300] text-white shadow-lg shadow-orange-100" : "text-[#626262] hover:bg-[#FFF5ED] hover:text-[#F67300]"}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSet}
                    className="w-full py-3 bg-[#F67300] text-white rounded-xl font-bold hover:opacity-95 transition-all shadow-md shadow-orange-100 cursor-pointer"
                >
                    Set Time
                </button>
            </motion.div>
        </AnimatePresence>
    );
};


const CreateTestPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [step, setStep] = useState<1 | 2>(1);

    // Dynamic Data States
    const [courses, setCourses] = useState<Course[]>([]);
    const [batches, setBatches] = useState<string[]>([]);
    const [modules, setModules] = useState<Module[]>([]);

    const [courseOpen, setCourseOpen] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);
    const [moduleOpen, setModuleOpen] = useState(false);

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedCourseName, setSelectedCourseName] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedModuleTitle, setSelectedModuleTitle] = useState("");
    
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState("Test title");
    const [description, setDescription] = useState("");
    const [testDate, setTestDate] = useState<Date | null>(new Date());
    const [fromTime, setFromTime] = useState<Date | null>(new Date(new Date().setHours(9, 0, 0, 0)));
    const [toTime, setToTime] = useState<Date | null>(new Date(new Date().setHours(10, 0, 0, 0)));

    const [isFromTimePickerOpen, setIsFromTimePickerOpen] = useState(false);
    const [isToTimePickerOpen, setIsToTimePickerOpen] = useState(false);
    const datePickerRef = useRef<any>(null);


    const location = useLocation();
    const incomingState = location.state;

    // Handle incoming state from curriculum (Add Test Modal)
    useEffect(() => {
        if (incomingState) {
            if (incomingState.name) setTitle(incomingState.name);
            if (incomingState.date) setTestDate(new Date(incomingState.date));
            if (incomingState.courseId) setSelectedCourseId(incomingState.courseId);
            if (incomingState.course) setSelectedCourseName(incomingState.course);
            if (incomingState.batch) setSelectedBatch(incomingState.batch);
            if (incomingState.module) setSelectedModuleTitle(incomingState.module);
            if (incomingState.moduleId) setSelectedModuleId(String(incomingState.moduleId));
            
            // If we have enough info, skip to step 2
            if (incomingState.module && incomingState.batch) {
                setStep(2);
            }
        }
    }, [incomingState]);

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

    // Fetch courses on mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch batches when course changes
    useEffect(() => {
        const fetchBatches = async () => {
            if (selectedCourseId !== null) {
                try {
                    const data = await getBatches(selectedCourseId);
                    setBatches(data);
                } catch (error) {
                    console.error("Failed to fetch batches:", error);
                }
            } else {
                setBatches([]);
            }
        };
        fetchBatches();
    }, [selectedCourseId]);

    // Fetch modules when batch changes
    useEffect(() => {
        const fetchModules = async () => {
            if (selectedCourseId !== null && selectedBatch) {
                try {
                    const data = await getModules(selectedCourseId, selectedBatch);
                    setModules(data);
                } catch (error) {
                    console.error("Failed to fetch modules:", error);
                }
            } else {
                setModules([]);
            }
        };
        fetchModules();
    }, [selectedCourseId, selectedBatch]);

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

    const formatTime12h = (date: Date | null) => {
        if (!date) return "Select time";
        let h = date.getHours();
        const m = date.getMinutes().toString().padStart(2, '0');
        const p = h >= 12 ? "PM" : "AM";
        h = h % 12;
        if (h === 0) h = 12;
        return `${h.toString().padStart(2, '0')}:${m} ${p}`;
    };

    const handlePublish = async () => {
        // Validation
        if (!title.trim()) { alert("Please enter a test title"); return; }
        if (!selectedCourseId || !selectedBatch || !selectedModuleTitle) { 
            alert("Please select Course, Batch, and Module."); 
            return; 
        }
        if (!testDate || !fromTime || !toTime) {
            alert("Please select Test Date, Start Time, and End Time.");
            return;
        }

        // Questions validation
        const invalidQuestion = questions.find(q => !q.text.trim() || q.options.some(opt => !opt.trim()));
        if (invalidQuestion) {
            alert("Please fill all question texts and options.");
            return;
        }

        try {
            setIsSubmitting(true);

            // Combine Date and Times
            const startTimeISO = new Date(testDate);
            startTimeISO.setHours(fromTime.getHours());
            startTimeISO.setMinutes(fromTime.getMinutes());

            const endTimeISO = new Date(testDate);
            endTimeISO.setHours(toTime.getHours());
            endTimeISO.setMinutes(toTime.getMinutes());

            const dateStr = testDate.toISOString().split('T')[0];

            const payload = {
                title,
                course_id: selectedCourseId,
                batch_name: selectedBatch,
                module_name: selectedModuleTitle,
                description,
                start_time: startTimeISO.toISOString(),
                end_time: endTimeISO.toISOString(),
                questions: questions.map(q => ({
                    text: q.text,
                    options: q.options.map((opt, idx) => ({
                        text: opt,
                        is_correct: q.answerKey.includes(idx)
                    }))
                }))
            };

            const createdTest = await createTest(payload);

            // Also update Redux for instantaneous local UI updates if needed
            dispatch(addTest({
                id: String(createdTest.id),
                name: title,
                moduleId: selectedModuleId,
                course: selectedCourseName,
                batch: selectedBatch,
                category: "Test",
                description: description,
                fromTime: formatTime12h(fromTime),
                toTime: formatTime12h(toTime),
                questions: questions,
                totalMarks: questions.reduce((sum, q) => sum + (q.points || 0), 0),
                createdAt: createdTest.created_at,
                date: dateStr
            }));

            setShowSuccessModal(true);
        } catch (error) {
            console.error("Failed to publish test:", error);
            alert("Failed to publish test. Please check all fields and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-white font-['Urbanist']">
            <style>{customPickerStyles}</style>
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
                            <Teacher size={42} variant="Bold"  color="white" />
                        </div>

                        <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                            <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2 text-white">New Test</h2>
                            <p className="text-[14px] font-medium leading-[140%] text-white/90 opacity-90 md:opacity-100">Target Audience</p>
                        </div>

                        <div className="hidden md:block mt-auto text-[16px] opacity-80 text-white">
                            Step 1 of 2
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex-5 p-4 md:p-[40px] overflow-auto relative">
                        <h2 className="text-2xl md:text-[32px] font-semibold mb-6 md:mb-[30px] text-[#333333]">
                            Test Details
                        </h2>

                        <div className="flex flex-col gap-[20px] w-full max-w-[600px]">

                            {/* Course */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Course Name</label>
                                <div className="relative">
                                    <div
                                        onClick={() => setCourseOpen(!courseOpen)}
                                        className="h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer bg-white"
                                    >
                                        <span className={selectedCourseName ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedCourseName || "Select Course"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {courseOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                            {courses.map((course) => (
                                                <div
                                                    key={course.course_id}
                                                    onClick={() => {
                                                        setSelectedCourseId(course.course_id);
                                                        setSelectedCourseName(course.course_name);
                                                        setCourseOpen(false);
                                                        setSelectedBatch(""); // Reset downstream
                                                    }}
                                                    className="px-4 py-3 hover:bg-[#FFF5ED] hover:text-[#F67300] cursor-pointer transition-colors"
                                                >
                                                    {course.course_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Batch */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Batch</label>
                                <div className="relative">
                                    <div
                                        onClick={() => selectedCourseId && setBatchOpen(!batchOpen)}
                                        className={`h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer bg-white ${!selectedCourseId && "opacity-50 cursor-not-allowed"}`}
                                    >
                                        <span className={selectedBatch ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedBatch || "Select Batch"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {batchOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                            {batches.length > 0 ? batches.map((batch) => (
                                                <div
                                                    key={batch}
                                                    onClick={() => {
                                                        setSelectedBatch(batch);
                                                        setBatchOpen(false);
                                                        setSelectedModuleTitle(""); // Reset downstream
                                                    }}
                                                    className="px-4 py-3 hover:bg-[#FFF5ED] hover:text-[#F67300] cursor-pointer transition-colors"
                                                >
                                                    {batch}
                                                </div>
                                            )) : <div className="px-4 py-3 text-gray-400">No batches available</div>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Module */}
                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Module</label>
                                <div className="relative">
                                    <div
                                        onClick={() => selectedBatch && setModuleOpen(!moduleOpen)}
                                        className={`h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] flex justify-between items-center cursor-pointer bg-white ${!selectedBatch && "opacity-50 cursor-not-allowed"}`}
                                    >
                                        <span className={selectedModuleTitle ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                            {selectedModuleTitle || "Select Module"}
                                        </span>
                                        <ChevronDown size={20} color="#333333" />
                                    </div>

                                    {moduleOpen && (
                                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                            {modules.length > 0 ? modules.map((mod) => (
                                                <div
                                                    key={mod.module_id}
                                                    onClick={() => {
                                                        setSelectedModuleId(String(mod.module_id));
                                                        setSelectedModuleTitle(mod.module_name);
                                                        setModuleOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-[#FFF5ED] hover:text-[#F67300] cursor-pointer transition-colors"
                                                >
                                                    {mod.module_name}
                                                </div>
                                            )) : <div className="px-4 py-3 text-gray-400">No modules found</div>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-[8px]">
                                <label className="text-[16px] font-medium text-[#333333]">Test Title</label>
                                <input
                                    placeholder="E.g Mid Term Test"
                                    autoCapitalize="words"
                                    value={title === "Test title" ? "" : title}
                                    onChange={(e) => setTitle(capitalizeWords(e.target.value))}
                                    className="w-full h-[45px] px-[15px] border border-[#D3D3D3] rounded-[10px] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3.75 mt-8 w-full max-w-[600px]">
                            <button
                                onClick={handleClose}
                                className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!selectedModuleTitle}
                                className={`px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer ${!selectedModuleTitle && "opacity-50 cursor-not-allowed"}`}
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
                        <div className="max-w-[1700px] mx-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#333]">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep(1)} className="cursor-pointer">
                                    <ChevronLeft size={20} color="#100f0f" />
                                </button>

                                <div>
                                    <span className="text-[12px] px-2 py-[2px] rounded-full bg-orange-50 text-[#F67300] font-bold">
                                        {selectedBatch}
                                    </span>

                                    <div className="flex items-center gap-2 mt-1">
                                        <Edit2 size={16} color="#9E9E9E" />
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="text-[18px] font-semibold bg-transparent outline-none w-full md:w-auto text-[#1A1A1A]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* DATE & TIME */}
                            <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                {/* Test Date */}
                                <div className="bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[225px] cursor-pointer"
                                    onClick={() => datePickerRef.current?.setOpen(true)}>
                                    <div className="flex flex-col w-full">
                                        <span className="text-sm font-medium text-[#1A1A1A]">Test date</span>
                                        <DatePicker
                                            ref={datePickerRef}
                                            selected={testDate}
                                            onChange={(date: Date | null) => setTestDate(date)}
                                            placeholderText="Select date"
                                            dateFormat="dd-MM-yyyy"
                                            className="bg-transparent border-none outline-none text-sm text-[#626262] w-full"
                                        />
                                    </div>
                                    <Calendar size={20} variant="Outline" color="#626262" className="cursor-pointer" />
                                </div>

                                {/* From Time */}
                                <div className="relative bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[210px] cursor-pointer"
                                    onClick={() => setIsFromTimePickerOpen(!isFromTimePickerOpen)}>
                                    <div className="flex flex-col w-full">
                                        <span className="text-sm font-medium text-[#1A1A1A]">From</span>
                                        <span className="text-sm text-[#626262] outline-none bg-transparent">
                                            {formatTime12h(fromTime)}
                                        </span>
                                    </div>
                                    <Clock size={20} variant="Outline" color="#626262" />

                                    <TimePickerPopup 
                                        isOpen={isFromTimePickerOpen} 
                                        onClose={() => setIsFromTimePickerOpen(false)}
                                        selectedTime={fromTime}
                                        onSelect={(time) => setFromTime(time)}
                                    />
                                </div>

                                {/* To Time */}
                                <div className="relative bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[210px] cursor-pointer"
                                    onClick={() => setIsToTimePickerOpen(!isToTimePickerOpen)}>
                                    <div className="flex flex-col w-full">
                                        <span className="text-sm font-medium text-[#1A1A1A]">To</span>
                                        <span className="text-sm text-[#626262] outline-none bg-transparent">
                                            {formatTime12h(toTime)}
                                        </span>
                                    </div>
                                    <Clock size={20} variant="Outline" color="#626262" />

                                    <TimePickerPopup 
                                        isOpen={isToTimePickerOpen} 
                                        onClose={() => setIsToTimePickerOpen(false)}
                                        selectedTime={toTime}
                                        onSelect={(time) => setToTime(time)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="bg-white border border-gray-200 rounded-[28px] p-3 my-4 shadow-sm max-w-[1700px] mx-auto">
                            <label className="text-[16px] font-semibold mb-3 block px-3 text-[#333]">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(capitalizeWords(e.target.value))}
                                placeholder="Enter test description"
                                autoCapitalize="words"
                                rows={3}
                                className="px-4 w-full outline-none resize-none bg-transparent rounded-[18px] text-[#626262]"
                            />
                        </div>

                        {/* QUESTIONS */}
                        <div className="max-w-[1700px] mx-auto space-y-4">
                            {questions.map((q, index) => (
                                <QuestionCard
                                    key={q.id}
                                    index={index + 1}
                                    text={q.text}
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
                        </div>

                        <div className="max-w-[1700px] mx-auto">
                            <button onClick={addQuestion} className="flex items-center gap-2 text-[#F67300] mt-6 font-bold hover:opacity-80 transition-opacity">
                                <Add size={18} /> Add Question
                            </button>
                        </div>

                        <div className="flex justify-end gap-3.75 mt-8 pb-[40px] max-w-[1700px] mx-auto">
                            <button onClick={handleClose} className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={isSubmitting}
                                className={`px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer flex items-center gap-2 ${isSubmitting && "opacity-70 cursor-not-allowed"}`}
                            >
                                {isSubmitting ? "Publishing..." : "Publish Test"}
                            </button>
                        </div>

                    </div>
                </>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-1200 p-4 text-[#333]">
                    <div className="bg-white rounded-[32px] p-10 w-full max-w-[440px] shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-[#FFF5ED] rounded-full flex items-center justify-center mb-6">
                             <Teacher size={42} variant="Bold" color="#F67300" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Congratulations!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">Your test "<b>{title}</b>" has been published successfully.</p>

                        <button
                            onClick={handleClose}
                            className="w-full py-4 rounded-2xl bg-[#F67300] text-white font-bold hover:bg-[#fd8720] transition-all shadow-lg shadow-orange-100 cursor-pointer"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTestPage;
