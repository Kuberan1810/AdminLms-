import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardText } from "iconsax-react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import {
    getCourses,
    getBatches,
    getModules,
} from "../../../services/assignmentService";
import type {
    Course,
    Module,
} from "../../../services/assignmentService";

const CreateAssignmentDetailsPage = () => {
    const navigate = useNavigate();

    // ─── Dropdown State ────────────────────────────────────────────────────────
    const [courseOpen, setCourseOpen] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);
    const [moduleOpen, setModuleOpen] = useState(false);
    const [moduleSearch, setModuleSearch] = useState("");

    // ─── API Data State ────────────────────────────────────────────────────────
    const [courses, setCourses] = useState<Course[]>([]);
    const [batches, setBatches] = useState<string[]>([]);
    const [modules, setModules] = useState<Module[]>([]);

    // ─── Loading State ─────────────────────────────────────────────────────────
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingBatches, setLoadingBatches] = useState(false);
    const [loadingModules, setLoadingModules] = useState(false);

    // ─── Selected Values ───────────────────────────────────────────────────────
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedBatchName, setSelectedBatchName] = useState<string>("");
    const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

    // ─── Fetch Courses on Mount ────────────────────────────────────────────────
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoadingCourses(true);
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

    // ─── Fetch Batches when Course Changes ─────────────────────────────────────
    useEffect(() => {
        if (selectedCourseId === null) {
            setBatches([]);
            setSelectedBatchName("");
            setModules([]);
            setSelectedModuleId(null);
            return;
        }
        const fetchBatches = async () => {
            try {
                setLoadingBatches(true);
                setBatches([]);
                setSelectedBatchName("");
                setModules([]);
                setSelectedModuleId(null);
                
                const data = await getBatches(selectedCourseId);
                setBatches(data);
            } catch (err) {
                console.error("Failed to fetch batches:", err);
            } finally {
                setLoadingBatches(false);
            }
        };
        fetchBatches();
    }, [selectedCourseId]);

    // ─── Fetch Modules when Batch Changes ──────────────────────────────────────
    useEffect(() => {
        if (selectedCourseId === null || !selectedBatchName) {
            setModules([]);
            setSelectedModuleId(null);
            return;
        }
        const fetchModules = async () => {
            try {
                setLoadingModules(true);
                setModules([]);
                setSelectedModuleId(null);

                const data = await getModules(selectedCourseId, selectedBatchName);
                setModules(data);
            } catch (err) {
                console.error("Failed to fetch modules:", err);
            } finally {
                setLoadingModules(false);
            }
        };
        fetchModules();
    }, [selectedCourseId, selectedBatchName]);

    // ─── Filtered Modules ──────────────────────────────────────────────────────
    const filteredModules = modules.filter(m => 
        m.module_name.toLowerCase().includes(moduleSearch.toLowerCase())
    );

    // ─── Helpers ───────────────────────────────────────────────────────────────
    const getCourseName = () =>
        courses.find((c) => c.course_id === selectedCourseId)?.course_name || "";
    const getModuleName = () =>
        modules.find((m) => m.module_id === selectedModuleId)?.module_name || "";

    const handleNext = () => {
        navigate("/instructor/create-assignment/details", {
            state: {
                course: getCourseName(),
                courseId: selectedCourseId,
                batch: selectedBatchName,
                moduleId: selectedModuleId,
                module: getModuleName(),
            },
        });
    };

    const handleClose = () => navigate("/instructor/dashboard");
    const handleBack = () => navigate(-1);

    const isFormValid = selectedCourseId !== null && selectedBatchName !== "" && selectedModuleId !== null;

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            {/* Left Panel */}
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit cursor-pointer z-20"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <ClipboardText size={42} variant="Bold" color="white" />
                </div>

                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2 text-white">
                        Create Assignment
                    </h2>

                    <p className="text-[14px] font-medium leading-[140%] text-white/90 opacity-90 md:opacity-100">
                        Assign tasks and track student progress.
                    </p>
                </div>

                {/* Step indicator */}
                <div className="hidden md:block mt-auto text-white">
                    <p className="text-[16px] font-medium opacity-80">Step 1 of 2</p>
                </div>

                {/* Decorative circles */}
                <div className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="hidden md:block absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Right Content Area */}
            <div className="flex-5 p-4 md:p-[40px] flex flex-col max-h-full overflow-y-auto relative">
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold leading-[100%] text-[#333333]">
                        Assignment Details
                    </h2>
                </div>

                <form className="flex flex-col gap-[20px] flex-1 w-full relative" onSubmit={(e) => e.preventDefault()}>
                    {/* ── Course Dropdown ──────────────────────────────────────── */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Course Name
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => {
                                    if (!loadingCourses) setCourseOpen(!courseOpen);
                                    setBatchOpen(false);
                                    setModuleOpen(false);
                                }}
                                className={`w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] bg-white flex items-center justify-between transition-colors ${loadingCourses ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
                            >
                                <span className={selectedCourseId ? "text-[#333333]" : "text-[#333333]"}>
                                    {selectedCourseId ? getCourseName() : (loadingCourses ? "Loading courses..." : "Select your course")}
                                </span>
                                <ChevronDown size={20} color="#333333" className={`transition-transform duration-200 ${courseOpen ? "rotate-180" : ""}`} />
                            </div>

                            {courseOpen && (
                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-1200">
                                    {courses.length === 0 ? (
                                        <div className="p-3 text-gray-400">No Courses Found</div>
                                    ) : (
                                        courses.map((course) => (
                                            <div
                                                key={course.course_id}
                                                onClick={() => {
                                                    setSelectedCourseId(course.course_id);
                                                    setCourseOpen(false);
                                                }}
                                                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F5F7FF] ${
                                                    selectedCourseId === course.course_id
                                                        ? "bg-[#F5F7FF] text-[#333]"
                                                        : "text-[#333333]"
                                                }`}
                                            >
                                                <span>{course.course_name}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Batch Dropdown ───────────────────────────────────────── */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Batch
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => {
                                    if (selectedCourseId !== null && !loadingBatches) setBatchOpen(!batchOpen);
                                    setCourseOpen(false);
                                    setModuleOpen(false);
                                }}
                                className={`w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] flex items-center justify-between transition-colors ${
                                    selectedCourseId === null || loadingBatches
                                        ? "bg-[#F9F9F9] opacity-50 cursor-not-allowed"
                                        : "bg-white cursor-pointer"
                                }`}
                            >
                                <span className={selectedBatchName ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                    {selectedBatchName ? selectedBatchName : (selectedCourseId === null ? "Select a course first" : loadingBatches ? "Loading batches..." : "Select Batch")}
                                </span>
                                <ChevronDown size={20} color="#333333" className={`transition-transform duration-200 ${batchOpen ? "rotate-180" : ""}`} />
                            </div>

                            {batchOpen && selectedCourseId !== null && (
                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-1200">
                                    {batches.length === 0 ? (
                                        <div className="p-3 text-gray-400">No batches available for this course</div>
                                    ) : (
                                        batches.map((batch) => (
                                            <div
                                                key={batch}
                                                onClick={() => {
                                                    setSelectedBatchName(batch);
                                                    setBatchOpen(false);
                                                }}
                                                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F5F7FF] ${
                                                    selectedBatchName === batch
                                                        ? "bg-[#F5F7FF] text-[#333]"
                                                        : "text-[#333333]"
                                                }`}
                                            >
                                                <span>{batch}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Module Dropdown (Searchable) ─────────────────────────── */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Module
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => {
                                    if (selectedBatchName && !loadingModules) setModuleOpen(true);
                                    setCourseOpen(false);
                                    setBatchOpen(false);
                                }}
                                className={`w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] flex items-center justify-between transition-colors ${
                                    !selectedBatchName || loadingModules
                                        ? "bg-[#F9F9F9] opacity-50 cursor-not-allowed"
                                        : "bg-white cursor-text"
                                }`}
                            >
                                <input 
                                    type="text"
                                    value={moduleSearch}
                                    onChange={(e) => {
                                        setModuleSearch(e.target.value);
                                        setModuleOpen(true);
                                        // Reset selected ID if they type something new
                                        if (selectedModuleId !== null && e.target.value !== getModuleName()) {
                                            setSelectedModuleId(null);
                                        }
                                    }}
                                    onFocus={() => {
                                        if (selectedBatchName && !loadingModules) setModuleOpen(true);
                                    }}
                                    placeholder={!selectedBatchName ? "Select a batch first" : loadingModules ? "Loading modules..." : "Select or type Module"}
                                    disabled={!selectedBatchName || loadingModules}
                                    className="w-full h-full bg-transparent outline-none text-[#333333] placeholder-[#D3D3D3]"
                                />
                                <ChevronDown size={20} color="#333333" className={`transition-transform duration-200 cursor-pointer ${moduleOpen ? "rotate-180" : ""}`} onClick={(e) => {
                                    e.stopPropagation();
                                    if (selectedBatchName && !loadingModules) setModuleOpen(!moduleOpen);
                                }} />
                            </div>

                            {moduleOpen && selectedBatchName && (
                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-1100">
                                    {filteredModules.length === 0 ? (
                                        <div className="p-3 text-gray-400">No modules found</div>
                                    ) : (
                                        filteredModules.map((mod) => (
                                            <div
                                                key={mod.module_id}
                                                onClick={() => {
                                                    setSelectedModuleId(mod.module_id);
                                                    setModuleSearch(mod.module_name);
                                                    setModuleOpen(false);
                                                }}
                                                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F5F7FF] ${
                                                    selectedModuleId === mod.module_id
                                                        ? "bg-[#F5F7FF] text-[#333]"
                                                        : "text-[#333333]"
                                                }`}
                                            >
                                                <span>{mod.module_name}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3.75 mt-8 w-full relative z-0">
                    <button
                        onClick={handleClose}
                        className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isFormValid}
                        className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignmentDetailsPage;
