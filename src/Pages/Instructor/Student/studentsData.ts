export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  contact: string; // ✅ ADDED
  attendance: string;
  lastScore: string;
  image?: string;
  status: "Active" | "Inactive";
  stats: {
    overallAttendance: string;
    averageScore: string;
    liveParticipation: string;
    classesAttended: string;
  };
  recentSubmissions?: {
    name: string;
    date: string;
    type: "assignment" | "test";
    score?: string;
    status: "on time" | "late";
  }[];
}

export const students: Student[] = Array(13)
  .fill(null)
  .map((_, index) => {
    if (index === 0) {
      // Aarav
      return {
        id: "1",
        studentId: "BT011",
        name: "Aarav",
        email: "aarav@example.com",
        contact: "+91 9876543210",
        attendance: "92%",
        lastScore: "95%",
        status: "Active",
        stats: {
          overallAttendance: "92%",
          averageScore: "95%",
          liveParticipation: "96%",
          classesAttended: "13/14",
        },
        recentSubmissions: [
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            score: "95/100",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 11",
            type: "test",
            score: "98/100",
            status: "on time",
          },
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 10",
            type: "assignment",
            status: "late",
          },
        ],
      };
    } else if (index === 1) {
      // Aadhya
      return {
        id: "2",
        studentId: "BT012",
        name: "Aadhya",
        email: "aadhya@example.com",
        contact: "+91 9123456780",
        attendance: "78%",
        lastScore: "85%",
        status: "Active",
        stats: {
          overallAttendance: "78%",
          averageScore: "85%",
          liveParticipation: "80%",
          classesAttended: "11/14",
        },
        recentSubmissions: [
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "85/100",
            status: "on time",
          },
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "75/100",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "85/100",
            status: "on time",
          },
        ],
      };
    } else {
      // Others
      return {
        id: (index + 1).toString(),
        studentId: `BT01${index + 1}`,
        name: `Student ${index + 1}`,
        email: `student${index + 1}@example.com`,
        contact: "+91 9000000000",
        attendance: "70%",
        lastScore: "80%",
        status: "Active",
        stats: {
          overallAttendance: "70%",
          averageScore: "75%",
          liveParticipation: "70%",
          classesAttended: "9/14",
        },
        recentSubmissions: [
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "85/100",
            status: "on time",
          },
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "AI Ethics Essay assignment.pdf",
            date: "Jan 12",
            type: "assignment",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "75/100",
            status: "on time",
          },
          {
            name: "Mid-term AI Proficiency test",
            date: "Jan 10",
            type: "test",
            score: "85/100",
            status: "on time",
          },
        ],
      };
    }
  });


  // assignmentData.ts

export interface Assignment {
  submission: string;
  id: number;
  name: string;
  submissionStatus: "On Time" | "Late" | "Overdue";
  mark: number;
}

export const assignmentData = [
  {
    id: 1,
    name: "AI Agent Basics",
    submission: "On Time",
    mark: 92,
  },
  {
    id: 2,
    name: "Machine Learning Intro",
    submission: "Late",
    mark: 78,
  },
  {
    id: 3,
    name: "React Dashboard UI",
    submission: "On Time",
    mark: 85,
  },
  {
    id: 4,
    name: "Database Design",
    submission: "Overdue",
    mark: 0,
  },
  {
    id: 5,
    name: "TypeScript Fundamentals",
    submission: "On Time",
    mark: 88,
  },
  {
    id: 6,
    name: "Next.js Routing",
    submission: "Late",
    mark: 81,
  },
];

// Dummy Data
export const testData = [
  {
    id: 1,
    date: "23 Jan 2026",
    name: "Mid-Term AI Proficiency Test",
    mark: 86,
    result: "Passed",
  },
  {
    id: 2,
    date: "25 Jan 2026",
    name: "React Fundamentals Assessment",
    mark: 72,
    result: "Passed",
  },
  {
    id: 3,
    date: "28 Jan 2026",
    name: "Database Design Evaluation",
    mark: 45,
    result: "Fail",
  },
  {
    id: 4,
    date: "02 Feb 2026",
    name: "Node.js Practical Exam",
    mark: 91,
    result: "Passed",
  },
  {
    id: 5,
    date: "05 Feb 2026",
    name: "System Design Mock Test",
    mark: 39,
    result: "Fail",
  },
  {
    id: 6,
    date: "28 Jan 2026",
    name: "Database Design Evaluation",
    mark: 45,
    result: "Fail",
  }
];
export const attendanceData = [
  { id: 1, date: "12 Jan 2026", className: "AI Agent", status: "Present" },
  { id: 2, date: "14 Jan 2026", className: "React Basics", status: "Present" },
  { id: 3, date: "16 Jan 2026", className: "Database Design", status: "Absent" },
  { id: 4, date: "18 Jan 2026", className: "Node.js Intro", status: "Present" },
  { id: 5, date: "20 Jan 2026", className: "System Architecture", status: "Absent" },
];

export const recentActivityData = [
  {
    id: 1,
    title: "AI Agent.pdf assignment submitted",
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "React Mid-Term test completed",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Database Design assignment graded",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Attendance marked for AI class",
    time: "2 days ago",
  },
];
