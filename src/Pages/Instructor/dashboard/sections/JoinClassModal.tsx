import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2 } from "lucide-react";
import { Copy, Link, ExportSquare } from "iconsax-react"
interface JoinClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    meetLink: string;
    isInstructor?: boolean;
    onJoinNow?: (link: string) => void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({
    isOpen,
    onClose,
    meetLink,
    isInstructor = false,
    onJoinNow,
}) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleJoinNow = () => {
        // Synchronous window open based on user click
        if (onJoinNow) {
            onJoinNow(meetLink);
        } else {
            window.open(meetLink, "_blank");
        }
        onClose();
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(meetLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-[100]"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-[500px] rounded-[20px] p-7 bg-[#FFFBFB] shadow-lg transition-all"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-[#626262] hover:text-gray-700 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <h2 className="text-xl font-semibold text-[#333] mb-2">
                    {isInstructor ? "Start Class" : "Join Class"}
                </h2>

                <p className="text-[#333] mb-4 whitespace-pre-line text-[15px] leading-relaxed">
                    You are about to {isInstructor ? "start" : "join"} the session.{"\n"}
                    Would you like to <strong>join the class instantly</strong>, or{" "}
                    <strong>copy the meeting link and join later</strong>?
                </p>

                <p className="text-[#333] mb-4 text-[15px]">Choose an option below:</p>

                <div className="flex flex-col gap-3 mb-6">
                    {/* Join Now Option */}
                    <div
                        onClick={handleJoinNow}
                        className="flex items-start gap-4 p-4 border border-gray-200 bg-white rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                            <ExportSquare color="#fe3500" className="w-5 h-" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#333] items-center flex gap-2">
                                Join Now
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Enter the class immediately.
                            </p>
                        </div>
                    </div>

                    {/* Copy Link Option */}
                    <div
                        onClick={handleCopyLink}
                        className="flex items-start gap-4 p-4 border border-gray-200 bg-white rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors group relative"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                            {copied ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                                    <Copy color="#3B82F6" className="w-5 h-5 text-blue-400" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#333]">
                                {copied ? "Copied!" : "Copy Link"}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Copy the meeting link and join using the link.
                            </p>
                        </div>
                    </div>
                </div>

                {/* <p className="text-sm text-gray-500 text-center">
                    You can share or use the copied link to join the class from another device.
                </p> */}
            </div>
        </div>,
        document.body
    );
};

export default JoinClassModal;
