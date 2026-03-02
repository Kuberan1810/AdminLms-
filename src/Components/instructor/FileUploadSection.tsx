import { useState, useRef } from "react";
import { CloudPlus, Trash } from "iconsax-react";
import { X } from "lucide-react";

export interface UploadedFile {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: "Uploading..." | "Ready to submit" | "Failed";
}

interface FileUploadSectionProps {
    files: UploadedFile[];
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const FileUploadSection = ({ files, setFiles }: FileUploadSectionProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[30px] p-8 flex flex-col gap-6">
            <label className="text-[20px] font-medium text-[#333333]">Resources</label>

            <div className="flex flex-col gap-6">

                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? "border-[#F67300] bg-[#FFF5ED]" : "border-[#D3D3D3] bg-[#FFFFFF] hover:border-[#F67300]"}`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div className="w-14 h-14 bg-[#F67300] rounded-full flex items-center justify-center mb-4">
                        <CloudPlus size={30} color="white" variant="Bold" />
                    </div>
                    <h4 className="text-[20px] font-semibold text-[#333333] mb-1">Upload your files</h4>
                    <p className="text-[14px] text-[#626262] mb-1">Drag and drop files here or click to select files</p>
                    <p className="text-[13px] text-[#939393]">Supported fomats: pdf, doc, doccx, txt.</p>
                    <p className="text-[13px] text-[#939393]">Maximum file size: 10MB</p>
                </div>


                {files.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {files.map((file) => (
                            <div key={file.id} className="w-[300px] h-[105px] bg-[#F9F9F9] rounded-[20px] p-4 flex gap-4 relative overflow-hidden group">
                                <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 flex items-center justify-center bg-red-500 text-white text-[8px] font-bold rounded-sm uppercase">{file.name.split('.').pop()}</div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start pr-6">
                                        <div className="flex flex-col">
                                            <h5 className="text-[13px] font-semibold text-[#333333] truncate w-[160px]">{file.name}</h5>
                                            <div className="flex gap-2 items-center">
                                                <span className="text-[12px] text-[#333333] font-medium">{file.size}</span>
                                                <span className="text-[11px] text-[#939393]"> | </span>
                                                <span className={`text-[11px] ${file.status === "Ready to submit" ? "text-[#10B981]" : file.status === "Failed" ? "text-red-500" : "text-[#F67300]"} font-medium`}>
                                                    {file.status} {file.progress < 100 && file.status !== "Failed" && `${file.progress}%`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-auto mb-1">
                                        <div className="w-full h-1.5 bg-[#EEEEEE] rounded-full overflow-hidden">
                                            <div
                                                style={{ width: `${file.progress}%` }}
                                                className={`h-full transition-all duration-300 ${file.status === "Ready to submit" ? "bg-[#10B981]" : file.status === "Failed" ? "bg-red-500" : "bg-[#F67300]"}`}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <button
                                    className="absolute top-1/2 -translate-y-1/2 right-6 text-[#333333] hover:text-red-500 cursor-pointer transition-colors"
                                    onClick={() => removeFile(file.id)}
                                    title={file.status === "Ready to submit" ? "Delete" : "Cancel"}
                                >
                                    {file.status === "Ready to submit" ? (
                                        <Trash size={20} variant="Outline" />
                                    ) : (
                                        <X size={20} />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadSection;
