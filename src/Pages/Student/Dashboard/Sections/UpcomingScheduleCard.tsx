import { useEffect, useState, useCallback, useRef } from "react";
import { Clock, Calendar } from "iconsax-react";
import { motion } from "framer-motion";
import API_BASE from "../../../../config/axios";
import { saveAttendanceRecord } from "../../../../store/attendanceStore";

/* ===================== TYPES ===================== */

interface Schedule {
  id: number;
  course_id: number;
  batch_name: string;
  title: string;
  time: string;
  date: string;
  class?: string;
  instructor: string;
}

interface ActiveSessionData {
  session_id: number;
  join_enabled: boolean;
  meet_link?: string;
  guest_link?: string;
}

/* ===================== SCHEDULE DATA ===================== */

const schedules: Schedule[] = [
  {
    id: 1,
    course_id: 1,
    batch_name: "Batch-A",
    title: "AI / ML Frontier Engineer",
    time: "7:30 - 08:30 pm",
    date: "March 04, 26",
    class: "introduction to programming with python",
    instructor: "Naveenkumar S",
  },
  {
    id: 2,
    course_id: 1,
    batch_name: "Batch-B",
    title: "AI / ML Frontier Engineer",
    time: "07:30 - 08:30 pm",
    date: "March 06, 26",
    instructor: "Naveenkumar S",
  },
];

/* ===================== COMPONENT ===================== */

const UpcomingScheduleCard = () => {
  // Live session data per batch: { session_id, meet_link }
  const [liveSessions, setLiveSessions] = useState<
    Record<string, { session_id: number; meet_link: string }>
  >({});

  const [joiningBatch, setJoiningBatch] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const meetWindowRef = useRef<Window | null>(null);
  const joinedSessionIdRef = useRef<number | null>(null);
  const windowCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasLeftRef = useRef(false);  // guard: prevent double leave calls

  /* ================= AUTO-HIDE TOOLTIP ================= */
  useEffect(() => {
    if (activeTooltip !== null) {
      const timer = setTimeout(() => {
        setActiveTooltip(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  /* ================================================================
     STEP 3: LEAVE — called when student closes the meet tab
     POST /sessions/leave?session_id=...
     ================================================================ */

  const triggerLeave = useCallback(async (sessionId: number) => {
    // Guard: only call leave once per session
    if (hasLeftRef.current) return;
    hasLeftRef.current = true;

    try {
      const res = await API_BASE.post("/sessions/leave", {}, {
        params: { session_id: sessionId },
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });

      console.log("Leave response:", res.data);

      saveAttendanceRecord(res.data);
      window.dispatchEvent(new CustomEvent("attendance-updated", { detail: res.data }));
    } catch (err: any) {
      console.error("Leave API failed:", err.response?.data || err.message);
      hasLeftRef.current = false; // allow retry on failure
    }

    joinedSessionIdRef.current = null;
  }, []);

  /* ================================================================
     STEP 1: POLL — check if class is live every 5 seconds
     GET /sessions/active?course_id=...&batch_name=...
     Stores meet_link from response for each batch
     ================================================================ */

  const checkActiveSessions = useCallback(async () => {
    const updated: Record<string, { session_id: number; meet_link: string }> = {};

    await Promise.all(
      schedules.map(async (schedule) => {
        try {
          const res = await API_BASE.get("/sessions/active", {
            params: {
              course_id: schedule.course_id,
              batch_name: schedule.batch_name,
            },
            headers: { 'ngrok-skip-browser-warning': 'true' },
          });

          const data: ActiveSessionData & { guest_link?: string } | null = res.data?.data || res.data;

          if (data?.join_enabled && (data?.guest_link || data?.meet_link)) {
            updated[schedule.batch_name] = {
              session_id: data.session_id,
              meet_link: (data.guest_link || data.meet_link) as string,
            };
          }
        } catch {
          // No active session for this batch — expected
        }
      })
    );



    setLiveSessions(updated);
  }, []);

  /* ================= POLLING: every 5 seconds ================= */

  useEffect(() => {
    checkActiveSessions();
    const interval = setInterval(checkActiveSessions, 5000);
    return () => clearInterval(interval);
  }, [checkActiveSessions]);

  /* ================= AUTO-LEAVE WHEN SESSION ENDS ================= */

  useEffect(() => {
    if (!joinedSessionIdRef.current) return;

    // Check if the joined session is STILL in the liveSessions list
    const isSessionStillActive = Object.values(liveSessions).some(
      (session) => session.session_id === joinedSessionIdRef.current
    );

    // If it's missing (instructor ended it), force leave
    if (!isSessionStillActive && !hasLeftRef.current) {
      console.log("Session ended by instructor — auto-leaving");

      // Stop the tab-close polling check
      if (windowCheckRef.current) {
        clearInterval(windowCheckRef.current);
        windowCheckRef.current = null;
      }

      // Close the meet tab if it's still open
      if (meetWindowRef.current && !meetWindowRef.current.closed) {
        try {
          meetWindowRef.current.close();
        } catch (e) {
          console.error("Could not auto-close meet window:", e);
        }
      }
      meetWindowRef.current = null;

      // Trigger the backend leave logic
      triggerLeave(joinedSessionIdRef.current);
    }
  }, [liveSessions, triggerLeave]);

  /* ================= CLEANUP ON UNMOUNT ================= */

  useEffect(() => {
    return () => {
      if (windowCheckRef.current) clearInterval(windowCheckRef.current);
    };
  }, []);



  /* ================================================================
     STEP 2: JOIN — when student clicks "Join" button
     POST /sessions/join → attendance tracking starts
     Then open the stored meet_link from /active in new tab
     ================================================================ */

  const handleJoin = useCallback(async (courseId: number, batchName: string) => {
    const sessionData = liveSessions[batchName];
    if (!sessionData) return;

    setJoiningBatch(batchName);

    try {
      const res = await API_BASE.post("/sessions/join", {}, {
        params: { course_id: courseId, batch_name: batchName },
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });

      console.log("Join response:", res.data);

      const meetLink = sessionData.meet_link;
      if (!meetLink) {
        console.log("No meet link available");
        return;
      }

      // Open same-origin wrapper page (NOT the raw meet URL)
      const wrapperUrl = `/student/live-class?url=${encodeURIComponent(meetLink)}`;
      console.log("Opening wrapper:", wrapperUrl);

      const meetWindow = window.open(wrapperUrl, "_blank");
      if (!meetWindow) {
        alert("Please allow popups to open the live class.");
        return;
      }

      meetWindowRef.current = meetWindow;
      joinedSessionIdRef.current = sessionData.session_id;
      hasLeftRef.current = false;

      if (windowCheckRef.current) clearInterval(windowCheckRef.current);

      const sessionId = sessionData.session_id;

      // Simple 2s polling — works because wrapper is same-origin
      windowCheckRef.current = setInterval(() => {
        if (meetWindow.closed) {
          console.log("Tab closed — triggering /sessions/leave");
          triggerLeave(sessionId);

          if (windowCheckRef.current) clearInterval(windowCheckRef.current);
          windowCheckRef.current = null;
          meetWindowRef.current = null;
        }
      }, 2000);

    } catch (err) {
      console.error("Join API failed:", err);
    } finally {
      setJoiningBatch(null);
    }
  }, [liveSessions, triggerLeave]);

  /* ================= UI ================= */

  return (
    <section className="space-y-5" onClick={() => setActiveTooltip(null)}>
      {schedules.map((item) => {
        const liveData = liveSessions[item.batch_name];
        const isLive = Boolean(liveData);
        const isJoining = joiningBatch === item.batch_name;

        return (
          <div
            key={item.id}
            className="boxStyle flex flex-col md:flex-row md:justify-between md:items-center bg-[#FAFAFA]! p-5 rounded-xl"
          >
            {/* Schedule Info */}
            <div>
              <h4 className="font-semibold text-primary mb-1">
                {item.title}
              </h4>
              <p className=" text-sm text-[#4d4d4d] mb-2.5 md:mb-2 capitalize">
                {item.class}
              </p>
              <div className="flex gap-4 text-sm text-[#626262]">
                <div className="flex items-center gap-1">
                  <span className="iconStyle">
                    <Clock size={16} color="#626262" />
                  </span>
                  {item.time}
                </div>

                <div className="flex items-center gap-1">
                  <span className="iconStyle">
                    <Calendar size={16} color="#626262" />
                  </span>
                  {item.date}
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600 mb-2.5 md:mb-0">
                {item.instructor}
              </div>
            </div>

            {/* Join / Soon Button */}
            <div className="relative group/tooltip">
              {isLive ? (
                <button
                  onClick={() => handleJoin(item.course_id, item.batch_name)}
                  disabled={isJoining}
                  className={`px-7 py-2.5 rounded-xl text-white text-sm font-semibold md:w-fit w-full transition-all
                    ${isJoining
                      ? "bg-orange-300 cursor-not-allowed"
                      : "bg-[#F67300] hover:bg-[#ff7a05] cursor-pointer"
                    }`}
                >
                  {isJoining ? "Joining..." : "Join"}
                </button>
              ) : (
                <>
                  <button
                    disabled
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTooltip(activeTooltip === item.id ? null : item.id);
                    }}
                    className="px-7 py-2.5 rounded-xl bg-[#F3F4F6] text-[#9CA3AF] text-sm font-semibold cursor-not-allowed md:w-fit w-full pointer-events-auto"
                  >
                    Soon
                  </button>
                  {/* Tooltip */}

                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 
                      ${activeTooltip === item.id ? "block" : "hidden md:group-hover/tooltip:block"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-[#808080] text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap shadow-lg relative"
                    >
                      Class has not started yet
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#808080]" />
                    </motion.div>
                  </div>

                </>
              )}

            </div>
          </div>
        );
      })}
    </section>
  );
};

export default UpcomingScheduleCard;
