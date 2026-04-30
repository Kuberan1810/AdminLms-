import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { Edit2, Calendar, ArrowLeft, Clock } from "iconsax-react";
import { UploadCloud, Trash2, X } from "lucide-react";
import { createAssignment, uploadAssignmentResources, updateAssignment } from "../../../services/assignmentService";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { capitalizeWords } from "../../../utils/capitalize";
import { motion, AnimatePresence } from "framer-motion";
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

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: "Uploading..." | "Ready to submit" | "Failed";
    file?: File;
}



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

const CreateAssignmentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    // Get initial state from navigation (Create flow)
    const initialState = location.state || {};
    // isEditMode is now a state variable defined below

    const [assignmentName, setAssignmentName] = useState(initialState.title || "");
    const [isEditingName, setIsEditingName] = useState(false);

    // Initialize files from resources if editing.
    // Resources may be AssignmentResourceResponse objects or plain strings.
    const initialFiles: UploadedFile[] = (initialState.resources || []).map((res: any, index: number) => ({
        id: `existing-${index}`,
        name: typeof res === "string" ? res : (res.file_name || `file-${index}`),
        size: "N/A",
        progress: 100,
        status: "Ready to submit" as const
    }));

    const [files, setFiles] = useState<UploadedFile[]>(initialFiles);

    const [description, setDescription] = useState(initialState.description || "");
    const [objective, setObjective] = useState(initialState.objective || "");
    // API returns `expected_outcome`, but nav state may also use `outcome`
    const [outcome, setOutcome] = useState(initialState.expected_outcome || initialState.outcome || "");

    // Parse due date — API returns `due_date` (ISO string), nav state may use `dueDate`
    const parsedDueDate = (() => {
        const raw = initialState.due_date || initialState.dueDate;
        if (!raw) return null;
        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    })();

    // Parse due time from the same ISO datetime string
    const parsedDueTime = (() => {
        const raw = initialState.due_date || initialState.dueDate || initialState.dueTime;
        if (!raw) return null;
        // If it's a full ISO datetime, extract time into a Date object
        const d = new Date(raw);
        if (!isNaN(d.getTime())) {
            const t = new Date();
            t.setHours(d.getHours());
            t.setMinutes(d.getMinutes());
            t.setSeconds(0);
            return t;
        }
        // Fallback: treat as HH:mm string
        if (typeof raw === 'string' && raw.includes(':') && raw.length <= 8) {
            return new Date(`2000-01-01T${raw}`);
        }
        return null;
    })();

    const [dueDate, setDueDate] = useState<Date | null>(parsedDueDate);
    const [dueTime, setDueTime] = useState<Date | null>(parsedDueTime);

    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(!!initialState.isEdit || !!initialState.assignment_id || !!initialState.id);
    const [customToast, setCustomToast] = useState({ visible: false, message: "" });

    // Validation logic: Title, Description, Objective, Outcome, Date and Time are required.
    const isFormValid = 
        assignmentName.trim() !== "" && 
        assignmentName !== "Assignment Name" &&
        description.trim() !== "" && 
        objective.trim() !== "" && 
        outcome.trim() !== "" &&
        dueDate !== null &&
        dueTime !== null;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const datePickerRef = useRef<any>(null);

    const toggleEditName = () => {
        setIsEditingName(true);
        setTimeout(() => nameInputRef.current?.focus(), 0);
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

    const simulateUpload = (fileId: string) => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 15;
            if (currentProgress >= 100) {
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: 100, status: "Ready to submit" as const } : f));
                clearInterval(interval);
            } else {
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: currentProgress, status: "Uploading..." as const } : f));
            }
        }, 200);
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
                    status: "Uploading...",
                    file: file // Store the actual file for API submission
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

    const handleSave = async () => {
        if (!isFormValid) return;

        try {
            setIsSubmitting(true);

            // Combine Date and Time
            let isoDateTime = new Date().toISOString();
            if (dueDate && dueTime) {
                const combined = new Date(dueDate);
                combined.setHours(dueTime.getHours());
                combined.setMinutes(dueTime.getMinutes());
                isoDateTime = combined.toISOString();
            }

            const actualFiles = files.filter(f => f.file).map(f => f.file as File);
            const assignmentId = initialState.id || initialState.assignment_id;

            if (isEditMode && assignmentId) {
                // ─── UPDATE FLOW ──────────────────────────────────────────────
                await updateAssignment(assignmentId, {
                    title: assignmentName,
                    description,
                    objective,
                    expected_outcome: outcome,
                    due_date: isoDateTime
                });

                // If new files are added, upload them separately
                if (actualFiles.length > 0) {
                    await uploadAssignmentResources(assignmentId, actualFiles);
                }
            } else {
                // ─── CREATE FLOW ──────────────────────────────────────────────
                if (!initialState.courseId || !initialState.batch || !initialState.module) {
                    alert("Missing course, batch, or module information from previous step.");
                    return;
                }

                const formData = new FormData();
                const normalizedBatchName = initialState.batch?.replace(/\s+/g, "-") || "";
                
                formData.append("course_id", String(initialState.courseId));
                formData.append("batch_name", normalizedBatchName);
                formData.append("module_name", initialState.module);
                formData.append("title", assignmentName);
                formData.append("description", description);
                formData.append("expected_outcome", outcome);
                formData.append("objective", objective); 
                formData.append("due_date", isoDateTime);

                // API workaround for single-file multipart issues
                if (actualFiles.length !== 1) {
                    actualFiles.forEach((file: File) => {
                        formData.append("files", file); 
                    });
                }

                const response = await createAssignment(formData);
                const newId = response?.assignment_id || response?.id || response?.data?.assignment_id || response?.data?.id;

                if (actualFiles.length === 1 && newId) {
                    await uploadAssignmentResources(newId, actualFiles);
                }
            }

            // Invalidate queries to ensure live data refresh in BatchesSection
            queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
            queryClient.invalidateQueries({ queryKey: ["instructor-modules"] });
            
            setCustomToast({ visible: true, message: isEditMode ? "Assignment updated successfully" : "Assignment created and uploaded successfully" });
            setTimeout(() => setCustomToast(t => ({ ...t, visible: false })), 3000);
            
            if (isEditMode) {
                // After updating, go back to the assignment details page
                setTimeout(() => navigate(-1), 1200);
            } else {
                // Clear all states to allow adding the next assignment
                setAssignmentName("Assignment Name");
                setDueDate(null);
                setDueTime(null);
                setDescription("");
                setObjective("");
                setOutcome("");
                setFiles([]);
                setIsEditMode(false);
            }

        } catch (error) {
            console.error("Failed to save assignment:", error);
            alert("Failed to save assignment. Check console for details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <InstructorDashboardLayout>
            <style>{customPickerStyles}</style>
            <div className="flex flex-col gap-6 font-['Urbanist'] pb-10 px-4">

                {/* Top Section: Back Arrow, Batch, Title and Date/Time */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                    <div className="flex items-start gap-4">
                        {/* Back Arrow Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-[34px] p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
                        >
                            <ArrowLeft size={36} variant="Outline" className="group-hover:text-[#F67300] transition-colors" color="#333333" />
                        </button>

                        <div className="flex flex-col gap-2">
                            <h4 className="px-3 py-1 bg-[#FFF5ED] dark:bg-[#ffcda4] text-[#F67300] dark:text-[#F67300] rounded-full text-[12px] font-bold w-fit">
                                {initialState.batch || "Batch 02"}
                            </h4>
                            <div className="flex items-center gap-3">
                                {isEditingName ? (
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        autoCapitalize="words"
                                        value={assignmentName === "Assignment Name" ? "" : assignmentName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssignmentName(capitalizeWords(e.target.value))}
                                        placeholder="Enter Assignment Name"
                                        onBlur={() => setIsEditingName(false)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && setIsEditingName(false)}
                                        className="text-[24px] md:text-[32px] font-semibold text-[#1A1A1A] bg-transparent border-b border-[#F67300] outline-none w-full md:w-fit md:min-w-[300px]"
                                    />
                                ) : (
                                    <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1A1A]">
                                        {assignmentName || "Assignment Name"}
                                    </h2>
                                )}
                                <button
                                    onClick={toggleEditName}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <Edit2 size={24} variant="Outline" color="#626262" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full md:w-auto mt-4 md:mt-[34px]">
                        {/* Due Date */}
                        <div className="bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[225px] cursor-pointer"
                             onClick={() => datePickerRef.current?.setOpen(true)}>
                            <div className="flex flex-col w-full">
                                <span className="text-sm font-medium text-[#1A1A1A]">Due date</span>
                                <DatePicker
                                    ref={datePickerRef}
                                    selected={dueDate}
                                    onChange={(date: Date | null) => setDueDate(date)}
                                    placeholderText="Select date"
                                    dateFormat="dd-MM-yyyy"
                                    className="bg-transparent border-none outline-none text-sm text-[#626262] w-full"
                                />
                            </div>
                            <Calendar size={20} variant="Outline" color="#626262" className="cursor-pointer" />
                        </div>

                        {/* Due Time */}
                        <div className="relative bg-white px-6 py-3 rounded-[20px] shadow-sm border border-gray-100 flex items-center justify-between flex-1 md:w-[210px] cursor-pointer"
                             onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}>
                            <div className="flex flex-col w-full">
                                <span className="text-sm font-medium text-[#1A1A1A]">Due Time (IST)</span>
                                <span className="text-sm text-[#626262] outline-none bg-transparent">
                                    {formatTime12h(dueTime)}
                                </span>
                            </div>
                            <Clock size={20} variant="Outline" color="#626262" />

                            <TimePickerPopup 
                                isOpen={isTimePickerOpen} 
                                onClose={() => setIsTimePickerOpen(false)}
                                selectedTime={dueTime}
                                onSelect={(time) => setDueTime(time)}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {/* Description Section */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Description:</label>
                        <div className="bg-[#FFFFFF] dark:bg-[#1e1e1e] border border-[#EEEEEE] dark:border-[#1e1e1e] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your description here..."
                                autoCapitalize="words"
                                value={description}
                                onChange={(e) => setDescription(capitalizeWords(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Objective Section */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Objective:</label>
                        <div className="bg-[#FFFFFF] dark:bg-[#1e1e1e] border border-[#EEEEEE] dark:border-[#1e1e1e] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your objective here..."
                                autoCapitalize="words"
                                value={objective}
                                onChange={(e) => setObjective(capitalizeWords(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Expected Outcome Section */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E7EB] rounded-[12px] p-6 flex flex-col gap-4">
                        <label className="text-[20px] font-semibold text-[#333333]">Expected Outcome:</label>
                        <div className="bg-[#FFFFFF] dark:bg-[#1e1e1e]  border border-[#EEEEEE] dark:border-[#1e1e1e] rounded-[24px] p-6 min-h-[140px]">
                            <textarea
                                className="w-full bg-transparent border-none outline-none text-[#626262] text-[16px] leading-[1.6] resize-none"
                                placeholder="Type your expected outcome here..."
                                autoCapitalize="words"
                                value={outcome}
                                onChange={(e) => setOutcome(capitalizeWords(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-[#E5E7EB] rounded-[30px] p-8 flex flex-col gap-6">
                        <label className="text-[20px] font-semibold text-[#333333]">Resources</label>

                        <div className="flex flex-col gap-6">
                            {/* Upload Area */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-[30px] p-12 flex flex-col items-center justify-center cursor-pointer transition-all group ${
                                    isDragging
                                        ? "border-[#F67300] bg-[#FFF5ED]"
                                        : "border-gray-300 hover:border-[#F67300] bg-white dark:bg-[#1e1e1e] hover:bg-[#fafafa] dark:hover:bg-[#2a2a2a]"
                                }`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                                    onChange={handleFileChange}
                                />
                                <div className="w-16 h-16 orange opacity-90 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                                    <UploadCloud size={32} className="text-white" />
                                </div>
                                <p className="text-base md:text-2xl font-medium text-[#333] dark:text-white mb-2">Upload your files</p>
                                <p className="text-sm md:text-lg text-[#626262] dark:text-gray-400 mb-2 text-center">Drag and drop files here or click to select files</p>
                                <p className="text-sm md:text-base text-[#626262] dark:text-gray-400">Supported formats: pdf, doc, docx, images</p>
                                <p className="text-sm md:text-base text-[#626262] dark:text-gray-400">Maximum file size: 10MB</p>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="mt-5 space-y-5">
                                    {files.map((file) => {
                                        const ext = file.name.split('.').pop()?.toLowerCase() || '';
                                        const isPdf = ext === 'pdf';
                                        const isImg = ['jpg','jpeg','png','gif','webp'].includes(ext);
                                        const isDoc = ['doc','docx'].includes(ext);
                                        const isXl = ['xls','xlsx'].includes(ext);
                                        const iconBg = isPdf ? 'bg-[#FEE2E2]' : isImg ? 'bg-[#B2D2FA]' : isDoc ? 'bg-[#DDEBFD]' : isXl ? 'bg-[#CFFFE7]' : 'bg-[#FFF5D5]';
                                        const iconColor = isPdf ? 'text-red-600' : isImg ? 'text-blue-600' : isDoc ? 'text-blue-500' : isXl ? 'text-green-600' : 'text-yellow-600';
                                        return (
                                            <div
                                                key={file.id}
                                                className="group flex items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-10 py-1 md:pr-5 pr-3 pl-1 border border-[#F2EEF4]"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] ${iconBg}`}>
                                                        <span className={`text-xs font-bold uppercase ${iconColor}`}>{ext || 'FILE'}</span>
                                                    </div>
                                                    <div className="max-w-md">
                                                        <h4 className="text-sm md:text-lg text-[#4D4D4D] dark:text-gray-300 truncate max-w-45">{file.name}</h4>
                                                        <div className="flex items-center gap-5">
                                                            <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">{file.size}</p>
                                                            {(file.status === 'Uploading...' || (file.progress > 0 && file.progress < 100)) && (
                                                                <div className="max-w-full">
                                                                    <p className="text-xs text-gray-400 mb-1">Uploading...</p>
                                                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-[#F67300] transition-all duration-300" style={{ width: `${file.progress}%` }} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {file.status === 'Ready to submit' && file.progress === 100 && (
                                                                <p className="text-xs md:text-base text-[#3EA465]">Ready ✓</p>
                                                            )}
                                                            {file.status === 'Failed' && (
                                                                <p className="text-xs md:text-base text-red-500">Failed</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(file.id)}
                                                    className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>


                </div>

                {/* Footer Section */}
                <div className="flex justify-end pt-10 px-4">
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting || !isFormValid}
                        className={`px-10 py-3 text-white font-semibold transition-opacity rounded-xl ${(isSubmitting || !isFormValid) ? "bg-[#ff9c54] cursor-not-allowed opacity-70" : "bg-[#F67300] hover:opacity-90 cursor-pointer "
                            }`}
                    >
                        {isSubmitting ? "Submitting..." : (isEditMode ? "Update Assignment" : "Create Assignment")}
                    </button>
                </div>
            </div>

            {/* ================= Premium Toast ================= */}
            <div
                className={`fixed bottom-6 right-6 z-70 transition-all duration-500 transform ${
                    customToast.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"
                }`}
            >
                <div className="flex items-center gap-4 bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#333] min-w-[320px]">
                    <div className="w-10 h-10 bg-[#FFF5ED] dark:bg-[#F67300]/10 rounded-full flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F67300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold leading-tight">Success</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{customToast.message}</p>
                    </div>
                    <button 
                        onClick={() => setCustomToast({ ...customToast, visible: false })}
                        className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </InstructorDashboardLayout>
    );
};

export default CreateAssignmentPage;
