/* ================================================================
   Shared Attendance Store
   ────────────────────────
   Saves leave response data to localStorage so it persists across
   page navigations. All components listen for the same custom event.
   ================================================================ */

export interface AttendanceRecord {
  date: string;                     // "2026-02-26"
  status: "present" | "absent";
  course_name?: string;
  join_time?: string;
  leave_time?: string;
  duration_minutes?: number;
  note?: string;
}

const STORAGE_KEY = "lms_attendance_records";

// ─── Read all records ───
export function getAttendanceRecords(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ─── Save a new attendance record (from /sessions/leave response) ───
export function saveAttendanceRecord(leaveData: Record<string, unknown>): void {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${day}`;

  const record: AttendanceRecord = {
    date: today,
    status: (leaveData.attendance_status as string)?.toLowerCase() === "present" ? "present" : "absent",
    course_name: leaveData.course_name as string,
    join_time: leaveData.join_time as string,
    leave_time: leaveData.leave_time as string,
    duration_minutes: leaveData.duration_minutes as number,
    note: leaveData.note as string,
  };

  const records = getAttendanceRecords();

  // Avoid duplicate for same date (replace if exists)
  const existingIdx = records.findIndex(r => r.date === today);
  if (existingIdx >= 0) {
    records[existingIdx] = record;
  } else {
    records.push(record);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

  // Dispatch event with the record so all components update
  window.dispatchEvent(new CustomEvent("attendance-updated", { detail: record }));

  console.log("Attendance saved:", record);
}

// ─── Get summary counts ───
export function getAttendanceSummary(defaults: { attended: number; absent: number; upcoming: number }) {
  const records = getAttendanceRecords();
  const presentCount = records.filter(r => r.status === "present").length;
  const absentCount = records.filter(r => r.status === "absent").length;

  return {
    attended: defaults.attended + presentCount,
    absent: defaults.absent + absentCount,
    upcoming: Math.max(0, defaults.upcoming - (presentCount + absentCount)),
  };
}

// ─── Get calendar map (date → status) ───
export function getAttendanceCalendar(): Record<string, "present" | "absent"> {
  const records = getAttendanceRecords();
  const map: Record<string, "present" | "absent"> = {};
  records.forEach(r => {
    map[r.date] = r.status;
  });
  return map;
}
