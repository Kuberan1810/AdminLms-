import { Clock, Calendar } from "iconsax-react";
import { useState, useEffect, useCallback } from "react";
import API_BASE from "../../../../config/axios";
import JoinClassModal from "./JoinClassModal";

/* ===================== TYPES ===================== */

type ScheduleStatus = "join" | "soon";

interface Props {
    id: number;          // course_id
    batch: string;       // batch_name
    title: string;
    time: string;
    displayDate: string;
    status: ScheduleStatus;
}

/* ===================== COMPONENT ===================== */

const InstructorScheduleCard = ({
    id,
    batch,
    title,
    time,
    displayDate,
    status,
}: Props) => {

    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [isLive, setIsLive] = useState(false);
    const [initialChecking, setInitialChecking] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalLink, setModalLink] = useState("");

    /* ================= CHECK ACTIVE SESSION ================= */

    const checkActiveSession = useCallback(async () => {
        try {
            const res = await API_BASE.get("/sessions/active", {
                params: {
                    course_id: id,
                    batch_name: batch,
                },
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            if (res.data?.session_id) {
                setSessionId(res.data.session_id);
                setIsLive(true);
            } else {
                setSessionId(null);
                setIsLive(false);
            }
        } catch (error) {
            // If 404 or no active session
            setSessionId(null);
            setIsLive(false);
        } finally {
            setInitialChecking(false);
        }
    }, [id, batch]);

    useEffect(() => {
        if (status === "join") {
            checkActiveSession();
        } else {
            setInitialChecking(false);
        }
    }, [checkActiveSession, status]);

    const startClass = async () => {
        if (loading || isLive) return;

        try {
            setLoading(true);

            const res = await API_BASE.post(
                "/sessions/start",
                {},
                {
                    params: {
                        course_id: id,
                        batch_name: batch,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );

            const dynamicSessionId = res.data?.session_id || res.data?.data?.session_id;

            if (!dynamicSessionId) {
                throw new Error("Session ID not returned");
            }

            setSessionId(dynamicSessionId);
            setIsLive(true);

            // Automatically open the instructor's host link (meet_link in response)
            const hostLink = res.data?.meet_link;

            if (hostLink) {
                setModalLink(hostLink);
                setModalOpen(true);
            } else {
                console.warn("meet_link not provided in response:", res.data);
            }

        } catch (error: any) {
            console.error("Start failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= END CLASS ================= */

    const endClass = async () => {
        if (loading || !sessionId) return;

        try {
            setLoading(true);

            await API_BASE.post(
                "/sessions/end",
                {},
                {
                    params: {
                        session_id: sessionId,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );

            setSessionId(null);
            setIsLive(false);

        } catch (error: any) {
            console.error("End failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */

    return (
        <div className="boxStyle bg-[#FAFAFA]! flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* LEFT SIDE */}
            <div className="flex-1">
                <h4 className="font-semibold text-primary lg:text-lg text-base mb-1">
                    {batch}
                </h4>

                <p className="text-sm text-gray-500 mb-3">
                    {title}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-[#626262]">
                    <div className="flex items-center gap-2">
                        <span className="iconStyle">
                            <Clock size="16" color="#626262" />
                        </span>
                        <span>{time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="iconStyle">
                            <Calendar size="16" color="#626262" />
                        </span>
                        <span>{displayDate}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-between md:w-fit w-full">
                {/* RIGHT SIDE */}
                <div className="flex justify-between md:w-fit w-full">
                    <div className="flex gap-5 md:w-fit w-full">

                        {/* START BUTTON */}
                        <button
                            onClick={startClass}
                            disabled={loading || isLive || initialChecking}
                            className={`px-7 py-2.5 rounded-xl text-white text-sm font-semibold w-full md:w-fit flex items-center justify-center gap-2
            ${loading || isLive || initialChecking
                                    ? "bg-orange-300 cursor-not-allowed"
                                    : "bg-[#F67300] hover:bg-[#ff7a05] cursor-pointer"
                                }`}
                        >
                            {loading && !isLive ? (
                                <>
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                    Starting...
                                </>
                            ) : "Start"}
                        </button>

                        {/* END BUTTON */}
                        <button
                            onClick={endClass}
                            disabled={loading || !isLive || initialChecking}
                            className={`px-7 py-2.5 rounded-xl text-white text-sm font-semibold w-full md:w-fit flex items-center justify-center gap-2
            ${loading || !isLive || initialChecking
                                    ? "bg-red-300 cursor-not-allowed"
                                    : "bg-[#f60800] hover:bg-[#f6080090] cursor-pointer"
                                }`}
                        >
                            {loading && isLive ? (
                                <>
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                    Ending...
                                </>
                            ) : "End"}
                        </button>

                    </div>
                </div>

            </div>

            <JoinClassModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                meetLink={modalLink}
                isInstructor={true}
            />
        </div>
    );
};

export default InstructorScheduleCard;
