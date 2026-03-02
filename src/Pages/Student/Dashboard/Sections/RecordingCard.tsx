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
                <h3 className="text-xl lg:text-2xl font-semibold text-primary">
                    Recording
                </h3>
                <div className="relative group/tooltip cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                }}>
                    <InfoCircle size="28" color="#333333" />
                    <div className={`absolute right-0 top-full mt-2 w-56 z-50 shadow-xl 
                        ${showTooltip ? 'block' : 'hidden md:group-hover/tooltip:block'}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-[#808080] text-white text-xs rounded-xl px-4 py-3 relative"
                        >
                            <p>Recording will be updated tomorrow. Please check back later.</p>
                            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#808080] rotate-45 shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full text-center">
                <div className="w-[64px] h-[64px] bg-[#FFF0EF] rounded-full flex items-center justify-center mb-6">
                    <VideoRemove size={32} color="#EF7A02" />
                </div>
                <h3 className="text-[#626262] text-base font-medium mb-1">No Recordings Found</h3>
                <p className="text-[#989898] text-sm max-w-[200px]">You haven't missed any classes.</p>
            </div>
        </div>
    );
};

export default RecordingCard;
