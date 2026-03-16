import { useState, useEffect } from "react";
import { NotificationBing/*, ArrowLeft, Notification*/ } from "iconsax-react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../../config/axios";

interface Course {
    [key: string]: any;
    id?: number;
    course_id?: number | string;
    course_name?: string;
    title?: string;
    name?: string;
    batches?: Batch[];
}

interface Batch {
    [key: string]: any;
    id?: number;
    batch_id?: number | string;
    batch_name?: string;
    name?: string;
}

const AddStudentPage = () => {
    const navigate = useNavigate();

    const [classOpen, setClassOpen] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);

    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(false);

    const [selectedClass, setSelectedClass] = useState<Course | null>(null);
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loadingBatches, setLoadingBatches] = useState(false);

    const [studentId, setStudentId] = useState("");
    const [loadingId, setLoadingId] = useState(false);

    const handleBack = () => navigate(-1);
    const handleClose = () => navigate("/instructor/dashboard");

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("X985Ew"); // Default or generated
    const [isCopied, setIsCopied] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isEnrolling, setIsEnrolling] = useState(false);

    // Fetch dynamic courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoadingCourses(true);
                const res = await API_BASE.get("/enroll/courses", {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                const data = res.data?.data || res.data || [];
                setCourses(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

    // Fetch batches when course is selected
    useEffect(() => {
        if (!selectedClass) {
            setBatches([]);
            return;
        }

        const fetchBatches = async () => {
            try {
                setLoadingBatches(true);
                const courseId = selectedClass.course_id || selectedClass.id;
                const res = await API_BASE.get(`/enroll/batches?course_id=${courseId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                // Normalize backend shapes:
                // - { course_id, course_name, batches: [...] }
                // - { data: [...] }
                // - [...]
                const resData = res.data;
                let batchesData: any[] = [];
                if (Array.isArray(resData)) {
                    batchesData = resData;
                } else if (Array.isArray(resData?.data)) {
                    batchesData = resData.data;
                } else if (Array.isArray(resData?.batches)) {
                    batchesData = resData.batches;
                } else {
                    batchesData = [];
                }

                // Normalize entries to objects with `batch_name` so UI can display consistently
                const normalized = batchesData.map((b) =>
                    typeof b === "string" ? { batch_name: b } : b
                );
                setBatches(normalized);
            } catch (err) {
                console.error("Failed to fetch batches:", err);
                setBatches([]);
            } finally {
                setLoadingBatches(false);
            }
        };
        fetchBatches();
    }, [selectedClass]);

    const currentBatches = batches;

    const handleSelectCourse = async (course: Course) => {
        setSelectedClass(course);
        setSelectedBatch(null); // Reset batch when course changes
        setClassOpen(false);

        // Fetch auto-generated student ID
        try {
            setLoadingId(true);
            const courseId = course.course_id || course.id;
            const res = await API_BASE.get('/enroll/generate-id', {
                params: { course_id: courseId },
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const newId = res.data?.student_id || res.data?.data?.student_id || res.data?.id || res.data;
            setStudentId(typeof newId === 'string' ? newId : JSON.stringify(newId));
        } catch (error) {
            console.error("Failed to generate student ID:", error);
            setStudentId("");
        } finally {
            setLoadingId(false);
        }
    };

    const handleEnroll = async () => {
        if (!selectedClass) {
            alert("Please select a valid course");
            return;
        }
        if (!selectedBatch) {
            alert("Please assign a valid batch");
            return;
        }
        if (!email) {
            alert("Email is required");
            return;
        }

        try {
            setIsEnrolling(true);
            setIsCopied(false);
            // backend accepts query params in this project for the POST request
            const params = {
                course_id: selectedClass.course_id || selectedClass.id,
                batch_name: selectedBatch.batch_name || selectedBatch.name,
                first_name: firstName,
                last_name: lastName,
                email,
            };

            const res = await API_BASE.post("/enroll/student", null, {
                params,
                headers: { "ngrok-skip-browser-warning": "true" },
            });

            const data = res.data || {};
            // Use backend-provided values when available
            setStudentId(data.student_id || data.studentId || studentId);
            setEmail(data.email || email);
            setPassword(data.auto_generated_password || data.password || password);
            setShowSuccessModal(true);
            console.log("Enroll response:", data);
        } catch (err) {
            console.error("Enroll failed:", err);
            alert("Failed to enroll student. Check console for details.");
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleCopy = () => {
        const textToCopy = `Student ID: ${studentId}\nEmail: ${email}\nPassword: ${password}`;
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
    };

    const getCourseName = (c: Course) => c.title || c.course_name || c.name || "Unknown Course";
    const getBatchName = (b: Batch) => b.batch_name || b.name || "Unknown Batch";

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            {/* Left Sidebar */}
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 z-20 cursor-pointer"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <NotificationBing size={42}  color="white" />
                </div>

                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2">
                        Add Student
                    </h2>
                    <p className="text-sm md:text-base font-medium text-white/90 opacity-90 md:opacity-100">
                        Enroll a new learner.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="hidden md:block absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="flex-5 p-4 md:p-[40px] flex flex-col overflow-auto relative">
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#333333]">
                        Student Enrollment
                    </h2>
                </div>

                <form className="flex flex-col gap-[20px] flex-1 w-full " onSubmit={(e) => e.preventDefault()}>
                    {/* Class Name / ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333] ">
                            Class Name / ID
                        </label>

                        <div className="relative">
                            <div
                                onClick={() => setClassOpen(!classOpen)}
                                className="w-full h-[45px] px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                            >
                                <span
                                    className={
                                        selectedClass ? "text-[#333333]" : "text-[#333333]"
                                    }
                                >
                                    {selectedClass ? getCourseName(selectedClass) : "Select your course"}
                                </span>
                                <ChevronDown size={20} color="#333333" />
                            </div>

                            {classOpen && (
                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-[1200]">
                                    {loadingCourses ? (
                                        <div className="p-3 text-gray-400">Loading...</div>
                                    ) : courses.length === 0 ? (
                                        <div className="p-3 text-gray-400">No Courses Found</div>
                                    ) : (
                                        courses.map((course: Course) => {
                                            const cname = getCourseName(course);
                                            const cId = course.id || course.course_id || cname;
                                            return (
                                                <div
                                                    key={cId as string}
                                                    onClick={() => handleSelectCourse(course)}
                                                    className={`px-4 py-3 flex items-center justify-between cursor-pointer
                        hover:bg-[#F5F7FF]
                        ${selectedClass?.course_id === course.course_id || selectedClass?.id === course.id
                                                            ? "bg-[#F5F7FF] text-[#333]"
                                                            : "text-[#333333]"
                                                        }`}
                                                >
                                                    <span>{cname}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Auto-Generated Student ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Auto-Generated Student ID
                        </label>
                        <div className="relative">
                            <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#333333]">
                                E.g
                            </span>
                            <input
                                type="text"
                                value={loadingId ? "Generating..." : studentId}
                                placeholder="Am101"
                                disabled
                                className={`w-full h-[45px] pl-[45px] pr-[15px] rounded-[10px]
                  border text-[#333333] font-medium  transition-colors duration-300
                  ${studentId && !loadingId
                                        ? "border-[#D3D3D3] bg-[#F2F2F2]"
                                        : "border-[#D3D3D3] bg-white"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* First & Last Name */}
                    <div className="flex flex-col md:flex-row gap-[10px] md:gap-[20px]">
                        <input
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
                        />
                        <input
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="sample@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[45px] mt-[10px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
                    />

                    {/* Assign to Batch */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Assign to Batch
                        </label>

                        <div className="relative">
                            <div
                                onClick={() => setBatchOpen(!batchOpen)}
                                className="w-full h-11.25 px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                            >
                                <span
                                    className={
                                        selectedBatch ? "text-[#333333]" : "text-[#D3D3D3]"
                                    }
                                >
                                    {selectedBatch ? getBatchName(selectedBatch) : "E.g Batch-01"}
                                </span>
                                <ChevronDown size={20} color="#333333" />
                            </div>

                            {batchOpen && (
                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-[1200]">
                                    {!selectedClass ? (
                                        <div className="p-3 text-gray-400">Please select a class first</div>
                                    ) : loadingBatches ? (
                                        <div className="p-3 text-gray-400">Loading batches...</div>
                                    ) : currentBatches.length === 0 ? (
                                        <div className="p-3 text-gray-400">No batches available for this class</div>
                                    ) : (
                                        currentBatches.map((batch: Batch) => {
                                            const bname = getBatchName(batch);
                                            const bId = batch.id || batch.batch_id || bname;
                                            return (
                                                <div
                                                    key={bId as string}
                                                    onClick={() => {
                                                        setSelectedBatch(batch);
                                                        setBatchOpen(false);
                                                    }}
                                                    className={`px-4 py-3 flex items-center justify-between cursor-pointer
                        hover:bg-[#F5F7FF]
                        ${selectedBatch?.batch_id === batch.batch_id || selectedBatch?.id === batch.id
                                                            ? "bg-[#F5F7FF] text-[#333]"
                                                            : "text-[#333333]"
                                                        }`}
                                                >
                                                    <span>{bname}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3.75 mt-8 w-full ">
                    <button
                        onClick={handleClose}
                        className="px-15 py-2 rounded-[10px]  bg-white text-[#626262] md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        className={`px-15 py-2 rounded-[10px] text-white transition-colors flex items-center justify-center gap-2
                            ${isEnrolling
                                ? 'bg-[#ff9c54] cursor-not-allowed'
                                : 'bg-[#F67300] hover:bg-[#fd8720] cursor-pointer'
                            }`}
                    >
                        {isEnrolling ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                Enrolling...
                            </>
                        ) : (
                            "Enroll"
                        )}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[30px] p-8 md:p-10 w-full max-w-[500px] flex flex-col items-center shadow-2xl animate-in fade-in zoom-in duration-300">
                        {/* Check Icon */}
                        <div className="w-[80px] h-[80px] bg-[#00A84D] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>

                        <h3 className="text-[24px] md:text-[28px] font-semibold text-[#333333] mb-2 text-center">
                            Student Profile Created !
                        </h3>

                        <div className="space-y-2.5 mb-6 text-center w-full">
                            <div className="text-[16px] md:text-[18px] text-[#333333] break-words">
                                <span className="font-semibold">Email: </span> {email || "email@example.com"}
                            </div>
                            <div className="text-[16px] md:text-[18px] text-[#333333] ">
                                <span className="font-semibold">Password: </span> {password}
                            </div>
                            <div className="text-[16px] md:text-[18px] text-[#333333] ">
                                <span className="font-semibold">Student ID: </span> {studentId}
                            </div>
                        </div>

                        {isCopied ? (
                            <div className="flex flex-col items-center gap-4 w-full">
                                <button
                                    className="px-10 h-[44px] bg-white border border-[#333333] text-[#333333] rounded-[22px] font-medium cursor-default"
                                >
                                    Copied
                                </button>
                                <button
                                    onClick={() => navigate("/instructor/dashboard")}
                                    className="flex items-center gap-2  text-[#333333] text-sm hover:underline cursor-pointer hover:opacity-80"
                                >
                                    <ChevronDown className="rotate-90" size={16} /> Back to Dashboard
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4 w-full justify-center">
                                <button
                                    onClick={handleCopy}
                                    className="px-8 h-[44px] bg-[#F67300] hover:bg-[#fd8720] text-white rounded-[10px] font-medium transition-colors cursor-pointer"
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="px-8 h-[44px] md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 text-[#333333] rounded-[10px] font-medium  transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddStudentPage;