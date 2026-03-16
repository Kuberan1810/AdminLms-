import { useEffect, useState } from "react";
import { InfoCircle, VideoRemove } from "iconsax-react";
import { motion } from "framer-motion";



const RecordingCard = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    // const { date, duration } = recordingcard;

    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip]);
    return (
        <div className="boxStyle flex flex-col justify-between h-full" onClick={() => setShowTooltip(false)}>

            {/* Header */}
            <div className="flex items-start justify-between mb-7.5">
                <h3 className="text-xl lg:text-2xl font-semibold text-primary dark:text-white transition-colors duration-300">
                    Recording
                </h3>
                <div className="relative group/tooltip cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                }}>
                    <InfoCircle size="28" className="text-[#333333] dark:text-[#A3A3A3] hover:text-[#EF7A02] transition-colors duration-300"  color="currentColor" />
                    <div className={`absolute right-0 top-full mt-2 w-56 z-50 shadow-xl 
                        ${showTooltip ? 'block' : 'hidden md:group-hover/tooltip:block'}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-[#333333] dark:bg-[#3B3B3B] text-white text-xs rounded-xl px-4 py-3 relative border dark:border-[#4B4B4B]"
                        >
                            <p>Recording will be updated tomorrow. Please check back later.</p>
                            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#333333] dark:bg-[#3B3B3B] rotate-45 border-t border-l dark:border-[#4B4B4B]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full text-center">
                <div className="w-[64px] h-[64px] bg-[#FFF0EF] dark:bg-[#3D2B2A] rounded-full flex items-center justify-center mb-6">
                    <VideoRemove size={32}  color="#EF7A02" />
                </div>
                <h3 className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium mb-1">No Recordings Found</h3>
                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm max-w-[200px]">You haven't missed any classes.</p>
            </div>
        </div>
    );
};

export default RecordingCard;
