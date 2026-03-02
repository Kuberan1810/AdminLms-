import { useEffect, useState } from "react";
import { Clock, Calendar, InfoCircle } from "iconsax-react";
import { motion } from "framer-motion";
import { recordingcard } from "../data/DashboardData";



const RecordingCard = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { date, duration } = recordingcard;

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
                            <p>Watch recordings of classes you missed so you never fall behind on your lessons.</p>
                            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#808080] rotate-45 shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className=" space-y-2  mb-5">
                <p className="text-[#333333] text-xl font-semibold mb-5">
                    You missed a class yesterday
                </p>

                <p className="text-base font-semimedium text-[#808080]">
                    AI / ML Live Class – Neural Networks
                </p>
            </div>

            {/* Meta info */}
            <div className=" flex flex-wrap justify-between gap-4 text-[#626262] mb-7.5">
                <div className=" flex gap-1.5 justify-between items-center">
                    <div className="iconStyle">
                        <Calendar size="12" color="#626262" />

                    </div>
                    <span className="text-[14px]">{date}</span>
                </div>

                <div className=" flex gap-1.5 justify-between items-center">
                    <div className="iconStyle">
                        <Clock size="12" color="#626262" />

                    </div>
                    <span className="text-[14px]">{duration}</span>
                </div>
            </div>

            {/* CTA */}
            <button
                className=" w-full rounded-2xl
          bg-[#F67300] hover:bg-[#ff7a05]
          text-white font-medium py-2.5
          transition cursor-pointer
        "
            >
                Watch Recording
            </button>
        </div>
    );
};

export default RecordingCard;
