import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardText } from "iconsax-react";
import { ChevronLeft } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addModule, addChapter, addTest } from "../../../store/slices/ResourcesSlice";

interface CreateAssignmentDetailsPageProps {
    initialModuleId?: string;
}

const CreateAssignmentDetailsPage = ({ initialModuleId }: CreateAssignmentDetailsPageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state) => state.resource.modules);

    // Initial Data Logic (from BatchesSection) - to handle refresh
    useEffect(() => {
        if (modules.allIds.length === 0) {
            const moduleId = crypto.randomUUID();
            dispatch(addModule({ id: moduleId, title: "Frontier AI Systems & Deployment" }));

            const chapter1Id = crypto.randomUUID();
            dispatch(addChapter({ id: chapter1Id, title: "AI Agents (LangChain, CrewAI, AutoGen)", moduleId }));

            const chapter2Id = crypto.randomUUID();
            dispatch(addChapter({ id: chapter2Id, title: "Deployment Basics", moduleId }));

            // Add mock test 
            const test1Id = crypto.randomUUID();
            dispatch(addTest({
                id: test1Id,
                name: "AI Fundamentals Quiz",
                date: "2024-01-15",
                moduleId,
                course: "Am101",
                batch: "Batch-01",
                category: "quiz",
                description: "A quiz on AI fundamentals",
                fromTime: "10:00",
                toTime: "11:00",
                questions: [],
                totalMarks: 100,
                createdAt: new Date().toISOString()
            }));
        }
    }, [dispatch, modules.allIds.length]);

    // State for inputs
    const [courseName, setCourseName] = useState("Am101");
    const [batchId, setBatchId] = useState("Batch-01");

    // Searchable Dropdown State
    const [selectedModuleId, setSelectedModuleId] = useState(() => initialModuleId || modules.allIds[0] || "");
    const [searchTerm, setSearchTerm] = useState(() => {
        if (initialModuleId && modules.byId[initialModuleId]) {
            return modules.byId[initialModuleId].title;
        }
        const defaultId = modules.allIds[0];
        if (defaultId && modules.byId[defaultId]) {
            return modules.byId[defaultId].title;
        }
        return "";
    });

    useEffect(() => {
        if (!selectedModuleId && modules.allIds.length > 0) {
            const firstId = modules.allIds[0];
            setSelectedModuleId(firstId);
            if (modules.byId[firstId]) {
                setSearchTerm(modules.byId[firstId].title);
            }
        }
    }, [modules, selectedModuleId]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredModules = modules.allIds.filter(id =>
        modules.byId[id].title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleModuleSelect = (id: string, title: string) => {
        setSelectedModuleId(id);
        setSearchTerm(title);
        setIsDropdownOpen(false);
    };

    const handleNext = () => {
        navigate("/instructor/create-assignment/details", {
            state: {
                course: courseName,
                batch: batchId,
                moduleId: selectedModuleId, // Pass the actual ID
                module: modules.byId[selectedModuleId]?.title || "Module" // Pass title for display if needed
            }
        });
    };

    const handleClose = () => navigate("/instructor/dashboard");
    const handleBack = () => navigate(-1);

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit cursor-pointer z-20"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <ClipboardText size={42} color="white" variant="Bold" />
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
            <div
                onClick={() => setIsDropdownOpen(false)}
                className="flex-5 p-4 md:p-[40px] flex flex-col max-h-full overflow-y-auto relative"
            >
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold leading-[100%] text-[#333333]">Assignment Details</h2>
                </div>

                <form className="flex flex-col gap-[20px] flex-1 w-full" onClick={(e) => e.stopPropagation()}>
                    {/* Course Name / ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Course Name / ID</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            placeholder="E.g Am101"
                            className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                        />
                    </div>

                    {/* Batch ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Batch ID</label>
                        <input
                            type="text"
                            value={batchId}
                            onChange={(e) => setBatchId(e.target.value)}
                            placeholder="E.g Batch-01"
                            className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                        />
                    </div>

                    {/* Module (Searchable) */}
                    <div className="flex flex-col gap-[8px] relative">
                        <label className="text-[16px] font-medium text-[#333333]">Module</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownOpen(true);
                                    if (e.target.value === "") {
                                        setSelectedModuleId("");
                                    }
                                }}
                                onFocus={() => setIsDropdownOpen(true)}
                                placeholder="Select or Type Module"
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                            />
                            {isDropdownOpen && filteredModules.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-[#D3D3D3] rounded-[10px] max-h-[200px] overflow-y-auto shadow-lg">
                                    {filteredModules.map(moduleId => (
                                        <li
                                            key={moduleId}
                                            onClick={() => handleModuleSelect(moduleId, modules.byId[moduleId].title)}
                                            className="px-[15px] py-2 hover:bg-orange-50 cursor-pointer text-[#333333] text-sm"
                                        >
                                            {modules.byId[moduleId].title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3.75 mt-8 w-full ">
                    <button
                        onClick={handleClose}
                        className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedModuleId}
                        className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>

                </div>
            </div>
        </div >
    );
};

export default CreateAssignmentDetailsPage;
