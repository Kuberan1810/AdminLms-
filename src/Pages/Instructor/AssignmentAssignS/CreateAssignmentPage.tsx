import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { Edit2, Calendar, ArrowLeft, Clock } from "iconsax-react";
import { UploadCloud, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addAssignment, updateAssignment } from "../../../store/slices/ResourcesSlice";

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: "Uploading..." | "Ready to submit" | "Failed"; // Added "Failed" status
}

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-['Urbanist']">
            <div className="bg-white rounded-[24px] p-8 w-[400px] flex flex-col items-center gap-4 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="text-[20px] font-bold text-[#1A1A1A]">Success</h3>
                    <p className="text-[14px] text-[#626262]">
                        Contents are uploaded successfully
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-2 px-8 py-2.5 bg-[#F67300] text-white rounded-[12px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const CreateAssignmentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Get initial state from navigation (Create flow) or select from Redux (Edit flow)
    const initialState = location.state || {};
    const modules = useAppSelector(state => state.resource.modules);

    // Check if we are in Edit mode
    const isEditMode = initialState.isEdit || false;

    // Find a valid module ID (First one for now, or from state if we had it)
    const defaultModuleId = initialState.moduleId || modules.allIds[0] || "";

    const [assignmentName, setAssignmentName] = useState(initialState.title || "Assignment Name");
    const [isEditingName, setIsEditingName] = useState(false);

    // Initialize files from resources if editing, otherwise empty
    const initialFiles: UploadedFile[] = (initialState.resources || []).map((name: string, index: number) => ({
        id: `existing-${index}`,
        name: name,
        size: "1.2MB", // Mock size for existing files
        progress: 100,
        status: "Ready to submit"
    }));

    const [files, setFiles] = useState<UploadedFile[]>(initialFiles);

    const [description, setDescription] = useState(initialState.description || "");
    const [objective, setObjective] = useState(initialState.objective || "");
    const [outcome, setOutcome] = useState(initialState.outcome || "");
    const [dueDate, setDueDate] = useState(initialState.dueDate || "2026-01-12");
    const [dueTime, setDueTime] = useState(initialState.dueTime || "23:59");
    const [currentModuleId] = useState(defaultModuleId);

    const [isDragging, setIsDragging] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for modal

    const fileInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

    const toggleEditName = () => {
        setIsEditingName(true);
        setTimeout(() => nameInputRef.current?.focus(), 0);
    };

    const simulateUpload = (fileId: string) => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 20) + 10;
            if (currentProgress >= 100) {
                currentProgress = 100;
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: 100, status: "Ready to submit" } : f));
                clearInterval(interval);
            } else {
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: currentProgress } : f));
            }
        }, 400);
    };

    const processFiles = (fileList: FileList | null) => {
        if (fileList) {
            Array.from(fileList).forEach(file => {
                const id = Math.random().toString(36).substr(2, 9);
                const newFile: UploadedFile = {
                    id,
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
                    progress: 0,
                    status: "Uploading..."
                };
                setFiles(prev => [...prev, newFile]);
                simulateUpload(id);
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleSave = () => {
        if (!assignmentName.trim()) {
            alert("Please enter assignment name");
            return;
        }

        const assignmentData = {
            id: isEditMode ? initialState.id : crypto.randomUUID(),
            title: assignmentName,
            moduleId: currentModuleId, // Ensure this ID exists in Redux
            dueDate: dueDate,
            dueTime: dueTime,
            description,
            objective,
            outcome,
            resources: files.map(f => f.name),
            batch: initialState.batch || "Batch-01",
            course: initialState.course || "Am101"
        };

        if (isEditMode) {
            dispatch(updateAssignment(assignmentData));
            setShowSuccessModal(true);
        } else {
            dispatch(addAssignment(assignmentData));
            setShowSuccessModal(true);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);

        const selectedBatch = initialState.batch || "Batch-01";

        if (isEditMode) {
            navigate(-1);
        } else {
            navigate(`/instructor/batch-details/${selectedBatch}`, {
                state: {
                    batch: selectedBatch,
                    course: initialState.course
                }
            }); 
                
        }
    };


    return (
        <InstructorDashboardLayout>
            <div className="flex flex-col gap-6 font-['Urbanist'] pb-10 px-4">

                <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />

                {/* Top Section: Back Arrow, Batch, Title and Date/Time */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                    <div className="flex items-start gap-4">
                        {/* Back Arrow Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-[34px] p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
                        >
                            <ArrowLeft size={36} variant="Outline" className="group-hover:text-[#F67300] transition-colors"  color="#333333" />
                        </button>

                        <div className="flex flex-col gap-2">
                            <span className="px-3 py-1 bg-[#FFF5ED] text-[#F67300] rounded-full text-[12px] font-bold w-fit">
                                {initialState.batch || "Batch 02"}
                            </span>
                            <div className="flex items-center gap-3">
                                {isEditingName ? (
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        value={assignmentName}
                                        onChange={(e) => setAssignmentName(e.target.value)}
                                        onBlur={() => setIsEditingName(false)}
                                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                                        className="text-[24px] md:text-[32px] font-semibold text-[#1A1A1A] bg-transparent border-b border-[#F67300] outline-none w-full md:w-fit md:min-w-[300px]"
                                    />
                                ) : (
                                    <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1A1A]">
                                        {assignmentName}
                                    </h2>
                                )}
                                <button
                                    onClick={toggleEditName}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <Edit2 size={24} variant="Outline"  color="#626262" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        {/* Due Date */}
                        <div
                            className="bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[225px] cursor-pointer"
                            onClick={() => dateInputRef.current?.showPicker()}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#1A1A1A]">Due date</span>
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="text-sm text-[#626262] outline-none bg-transparent no-calendar-icon"
                                />
                            </div>
                            <Calendar size={20} variant="Outline"  color="#626262" />
                        </div>

                        {/* Due Time */}
                        <div
                            className="bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[165px] cursor-pointer"
                            onClick={() => timeInputRef.current?.showPicker()}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#1A1A1A]">Due Time(IST)</span>
                                <input
                                    ref={timeInputRef}
                                    type="time"
                                    value={dueTime}
                                    onChange={(e) => setDueTime(e.target.value)}
                                    className="text-sm text-[#626262] outline-none bg-transparent no-calendar-icon"
                                />
                            </div>
                            <Clock size={20} variant="Outline"  color="#626262" />
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {/* Description Section */}
                    <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Description:</label>
                        <div className="bg-[#FFFFFF] border border-[#EEEEEE] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Objective Section */}
                    <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Objective:</label>
                        <div className="bg-[#FFFFFF] border border-[#EEEEEE] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your objective here..."
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Expected Outcome Section */}
                    <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Expected Outcome:</label>
                        <div className="bg-[#FFFFFF] border border-[#EEEEEE] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your expected outcome here..."
                                value={outcome}
                                onChange={(e) => setOutcome(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-white border border-[#E5E7EB] rounded-[30px] p-8 flex flex-col gap-6">
                        <label className="text-[20px] font-semibold text-[#333333]">Resources</label>

                        <div className="flex flex-col gap-6">
                            {/* Upload Area */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-[24px] py-10 sm:py-14 px-4 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? "border-[#F67300] bg-[#FFF5ED]" : "border-[#000000] bg-[#FFFFFF] hover:bg-gray-50"}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={handleFileChange}
                                />
                                <UploadCloud size={36} className="text-[#F67300] mb-3" />
                                <p className="font-medium text-[#333333]">Upload Material</p>
                                <p className="text-sm text-gray-500 mt-1">Drag and drop files here or click to select files</p>
                                <p className="text-xs text-gray-400 mt-1">Supported formats: pdf, doc, docx, txt • Maximum size 10MB</p>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="mt-6 space-y-3">
                                    {files.map((file) => (
                                        <div key={file.id} className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center shrink-0">
                                                    <div className="w-6 h-6 flex items-center justify-center bg-red-500 text-white text-[8px] font-bold rounded-sm uppercase">{file.name.split('.').pop()}</div>
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate text-[#1A1A1A]">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p>

                                                {(file.status === "Uploading..." || file.progress < 100) && (
                                                    <div className="h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                                                        <div
                                                            className="h-2 bg-orange-500 transition-all"
                                                            style={{ width: `${file.progress}%` }}
                                                        />
                                                    </div>
                                                )}

                                                {file.status === "Ready to submit" && file.progress === 100 && (
                                                    <p className="text-xs text-[#10B981] mt-1 font-medium">Ready to submit</p>
                                                )}
                                                {file.status === "Failed" && (
                                                    <p className="text-xs text-red-500 mt-1 font-medium">Failed</p>
                                                )}
                                            </div>

                                            <div className="flex-shrink-0 self-start sm:self-auto">
                                                <Trash2
                                                    size={18}
                                                    onClick={() => removeFile(file.id)}
                                                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                </div>

                {/* Footer Section */}
                <div className="flex justify-end pt-10 px-4">
                    <button
                        onClick={handleSave}
                        className="px-10 py-3 rounded-[12px] bg-[#F67300] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-md shadow-orange-100"
                    >
                        {isEditMode ? "Update Assignment" : "Create Assignment"}
                    </button>
                </div>
            </div>
        </InstructorDashboardLayout>
    );
};

export default CreateAssignmentPage;
