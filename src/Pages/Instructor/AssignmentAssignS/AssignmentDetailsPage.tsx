import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, FileText, Download, Pencil, FileCheck, Link as LinkIcon } from "lucide-react";

interface Resource {
    name: string;
    url: string;
}

const AssignmentDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {}; // Rename to 'state' to avoid shadowing confusion, though 'assignment' is fine

    const handleEdit = () => {
        navigate("/instructor/create-assignment/details", { state: { ...state, isEdit: true } });
    };

    // Creating mock resources from string array for now since the type in other files was string[]
    const resources: Resource[] = (state.resources || []).map((res: string) => ({
        name: res,
        url: "#"
    }));

    const downloadFile = (res: Resource) => {
        if (!res.url || res.url === "#") {
            // Mock download for demo
            const element = document.createElement("a");
            const file = new Blob(["This is a mock file content for " + res.name], { type: "text/plain" });
            element.href = URL.createObjectURL(file);
            element.download = res.name;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            document.body.removeChild(element);
            return;
        }
        const link = document.createElement("a");
        link.href = res.url;
        link.download = res.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8 font-['Urbanist']">
            <div className="mx-auto space-y-6 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft size={24} className="text-[#333333]" />
                        </button>
                        <div className="flex-1 space-y-3">
                            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                                {state.title || "Build Q&A system using RAG"}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="bg-[#FFF2E5] text-[#F67300] px-3 py-1 rounded-full text-xs font-medium">
                                    {state.status || "In Progress"}
                                </span>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <FileCheck size={14} />
                                    <span>Due {state.dueDate || "Jan 26, 11:59 PM"}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500">
                                {state.batchInfo || "AM101 - AI / ML Frontier Ai Engineer"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-[#1A1A1A]">Description:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {state.description || "Build a Question Answering (Q&A) system using Retrieval-Augmented Generation (RAG). In this assignment, you will combine a language model with external knowledge sources to generate more accurate and context-aware answers instead of relying only on the model's memory."}
                        </p>
                    </div>

                    {/* Objective */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-[#1A1A1A]">Objective:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {state.objective || "Design and implement a basic retrieval pipeline that searches relevant information, passes it as context to the language model, and produces meaningful responses."}
                        </p>
                    </div>

                    {/* Expected Outcome */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-[#1A1A1A]">Expected Outcome:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {state.outcome || "A working RAG-based Q&A system that can answer questions accurately using provided data, demonstrating the practical application of AI in learning platforms."}
                        </p>
                    </div>
                </div>

                {/* Resources Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                    <h2 className="text-lg font-medium text-[#1A1A1A]">Resources</h2>

                    <div className="space-y-3">
                        {resources.length > 0 ? (
                            resources.map((res, index) => {
                                const isPdf = res.name.toLowerCase().endsWith('.pdf');
                                return (
                                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${isPdf ? 'bg-[#FFEDED]' : 'bg-[#E5F6FF]'
                                                }`}>
                                                {isPdf ? (
                                                    <FileText className="text-[#FF4D4D]" size={24} />
                                                ) : (
                                                    <LinkIcon className="text-[#0095FF]" size={24} />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-[#1A1A1A] truncate">{res.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {isPdf ? "2.4MB" : "external-link.com"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <button
                                            onClick={() => downloadFile(res)}
                                            className="p-2 text-gray-400 hover:text-[#F67300] transition-colors"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-gray-500 italic flex flex-col items-center gap-2 text-sm">
                                <FileText size={32} className="opacity-20" />
                                <span>No resources attached.</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Actions Footer */}
            <div className="mx-auto max-w-7xl flex justify-end gap-4 pb-8 mt-6">
                <button
                    onClick={() =>
                        navigate("/instructor/assignment/assignment-review", {
                            state: { ...state }
                        })
                    }
                    className="flex items-center justify-center gap-2 bg-[#F67300] text-white px-6 py-3 rounded-xl shadow font-medium"
                >
                    <FileCheck size={18} />
                    <span>Review Assignment</span>
                </button>

                <button
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 bg-[#F67300] text-white px-6 py-3 rounded-xl shadow font-medium"
                >
                    <Pencil size={18} />
                    <span>Edit Assignment</span>
                </button>
            </div>
        </div>
    );
};

export default AssignmentDetailsPage;
