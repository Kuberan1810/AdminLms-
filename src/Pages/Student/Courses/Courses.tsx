import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LiveClassCard from "../../../Components/Student/LiveClassCard";
import UpcomingClassCard from "../../../Components/Student/UpcomingClassCard";
import EnrolledClasses from "../Dashboard/Sections/EnrolledClasses";
import { useMyCourses } from "../../../hooks/useMyCourses";
import { upcomingClasses } from "./CourseDetailsData";
import { Video } from 'iconsax-react';
import API_BASE from "../../../config/axios";
import { saveAttendanceRecord } from "../../../store/attendanceStore";

/* ===================== TYPES ===================== */

interface ActiveSession {
  session_id: number;
  join_url: string;
  live: boolean;
  course_id: number;
  batch_name: string;
  course_name?: string;
  instructor?: string;
  topic?: string;
  students_count?: number;
}

/* ===================== COMPONENT ===================== */

const Courses = () => {
  const navigate = useNavigate();
  const { data: courses = [], isLoading } = useMyCourses();

  // Live session state
  const [liveSession, setLiveSession] = useState<ActiveSession | null>(null);

  const meetWindowRef = useRef<Window | null>(null);
  const joinedSessionIdRef = useRef<number | null>(null);
  const windowCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasLeftRef = useRef(false);

  // Same schedule combos as UpcomingScheduleCard (backend needs both params)
  const schedules = [
    { course_id: 1, batch_name: "Batch-A", title: "AI / ML Frontier Engineer", instructor: "Ms Samantha William" },
    { course_id: 1, batch_name: "Batch-B", title: "AI / ML Frontier Engineer", instructor: "Ms Samantha William" },
  ];

  /* ================= LEAVE API ================= */

  const triggerLeave = useCallback(async (sessionId: number) => {
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
      hasLeftRef.current = false;
    }
    joinedSessionIdRef.current = null;
  }, []);

  /* ================= POLL ACTIVE SESSIONS ================= */

  const checkActiveSessions = useCallback(async () => {
    let foundSession: ActiveSession | null = null;

    for (const schedule of schedules) {
      try {
        const res = await API_BASE.get("/sessions/active", {
          params: {
            course_id: schedule.course_id,
            batch_name: schedule.batch_name,
          },
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });

        const data = res.data?.data || res.data;

        if (data?.session_id) {
          foundSession = {
            session_id: data.session_id,
            join_url: data.meet_link || data.join_url,
            live: true,
            course_id: schedule.course_id,
            batch_name: schedule.batch_name,
            course_name: data.course_name || schedule.title,
            instructor: data.instructor || schedule.instructor,
            topic: data.topic || "Live Session",
            students_count: data.students_count || 0,
          };
          break;
        }
      } catch {
        // no live session for this batch
      }
    }

    // Just update the live session state — leave is ONLY triggered by tab close
    setLiveSession(foundSession);
  }, []);

  useEffect(() => {
    checkActiveSessions();
    const interval = setInterval(checkActiveSessions, 8000);
    return () => clearInterval(interval);
  }, [checkActiveSessions]);

  /* ================= JOIN ================= */

  const handleJoin = async () => {
    if (!liveSession) return;
    try {
      const res = await API_BASE.post("/sessions/join", {}, {
        params: { course_id: liveSession.course_id, batch_name: liveSession.batch_name },
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      console.log("Join response:", res.data);

      const meetLink = liveSession.join_url;
      if (!meetLink) {
        console.log("No meet link available");
        return;
      }

      // Open same-origin wrapper page (NOT the raw meet URL)
      // This makes meetWindow.closed tracking reliable
      const wrapperUrl = `/student/live-class?url=${encodeURIComponent(meetLink)}`;
      console.log("Opening wrapper:", wrapperUrl);

      const meetWindow = window.open(wrapperUrl, "_blank");
      console.log("Window:", meetWindow ? "opened" : "BLOCKED");

      if (!meetWindow) return;

      meetWindowRef.current = meetWindow;
      joinedSessionIdRef.current = liveSession.session_id;
      hasLeftRef.current = false;

      if (windowCheckRef.current) clearInterval(windowCheckRef.current);

      const sessionId = liveSession.session_id;

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
    }
  };

  const isLive = liveSession !== null;

  /* ================= FALLBACK LIVE DATA ================= */

  const liveClass = {
    code: "AM101",
    title: liveSession?.course_name || "AI / ML Frontier AI Engineer",
    instructor: liveSession?.instructor || "ED Donner",
    topic: liveSession?.topic || "AI safety & real-world use cases",
    studentsCount: liveSession?.students_count || 200,
  };

  return (
    <div className="space-y-5 md:mb-0 mb-10">

      {/*  SAME COMPONENT AS DASHBOARD (ONLY DIFFERENCE = onCardClick) */}
      <EnrolledClasses
        classes={courses}
        isLoading={isLoading}
        onCardClick={(courses) =>
          navigate(`/student/courses/${courses.id}`)
        }
      />

      {/* ================= Live Now ================= */}
      <section className="boxStyle">
        <div className="flex items-center gap-2 mb-5">
          {isLive && <div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse" />}
          <h2 className="text-[20px] font-medium text-gray-900">
            Live Now
          </h2>
        </div>

        {isLive ? (
          <LiveClassCard {...liveClass} onJoin={handleJoin} />
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-4 bg-[#FFF0EF] rounded-full mb-4">
              <Video size={32} color="#EF7A02" />
            </div>
            <p className="text-[#626262] text-base font-medium">No Live Classes</p>
            <p className="text-[#989898] text-sm mt-1">There are no live classes at the moment</p>
          </div>
        )}
      </section>

      {/* ================= Upcoming Classes ================= */}
      <section className="boxStyle">
        <h2 className="text-[20px] font-medium text-gray-900 mb-5">
          Upcoming Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingClasses.map((cls, index) => (
            <UpcomingClassCard key={index} {...cls} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Courses;

