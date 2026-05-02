export interface AttendanceRecord {
  date: string;
  courseName: string;
  sessionTime: string;
  status: "Present" | "Leave";
}

export interface UploadedFile {
  title: string;
  batch: string;
  timeAgo: string;
  type: "pdf" | "doc";
}

export interface Activity {
  title: string;
  batch: string;
  timeAgo: string;
  type: "upload" | "assignment" | "reply";
}

export interface InstructorData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  instructorId: string;
  courses: string[];
  status: "Active" | "Leave" | "Pending" | "Resigned";
  attendance: string;
  phone?: string;
  joinedDate?: string;
  qualification?: string;
  batches?: string[];
  attendanceHistory?: AttendanceRecord[];
  uploadedContent?: UploadedFile[];
  recentActivity?: Activity[];
}

export const instructorMockData: InstructorData[] = [
  {
    id: "1",
    name: "Dr. Arvind Dravid",
    email: "arvind.dravid@example.com",
    avatar: "https://i.pravatar.cc/150?u=1",
    instructorId: "BT011",
    courses: ["AM101 - AI / ML Frontier AI Engineer", "Q1103 - Quantum Intelligence"],
    status: "Active",
    attendance: "85%",
    phone: "+91 8976543278",
    joinedDate: "Jan 22, 2026",
    qualification: "M.Tech AI , B.Tech",
    batches: ["#AM101-B01", "#AM101-B04", "#Q1103-B02"],
    attendanceHistory: [
      { date: "Jan 24, 2026", courseName: "Advanced Algorithms", sessionTime: "09:00 AM - 10:30 AM", status: "Present" },
      { date: "Jan 24, 2026", courseName: "Data Structures", sessionTime: "11:00 AM - 12:30 PM", status: "Present" },
      { date: "Jan 23, 2026", courseName: "Faculty Meeting", sessionTime: "02:00 PM - 03:30 PM", status: "Leave" },
      { date: "Jan 21, 2026", courseName: "Machine Learning Intro", sessionTime: "10:00 AM - 11:30 AM", status: "Present" },
    ],
    uploadedContent: [
      { title: "Agents (LangChain, CrewAI, AutoGen).pdf", batch: "AM101-B01", timeAgo: "10 mins ago", type: "pdf" },
      { title: "Theory Analysis Paper (Due 21, Jan 2026)", batch: "AM101-B04", timeAgo: "10 mins ago", type: "doc" },
      { title: "Module 3 Proficiency Test", batch: "Q1103-B02", timeAgo: "10 mins ago", type: "pdf" },
    ],
    recentActivity: [
      { title: "Submitted Agents", batch: "AM101-B01", timeAgo: "10 mins ago", type: "upload" },
      { title: "Assignment created", batch: "AM101-B04", timeAgo: "30 mins ago", type: "assignment" },
      { title: "Replied to query", batch: "AM101-B01", timeAgo: "1 hour ago", type: "reply" },
    ]
  },
  {
    id: "2",
    name: "Sonal Sharma",
    email: "sonal.sharma@example.com",
    avatar: "https://i.pravatar.cc/150?u=2",
    instructorId: "BT012",
    courses: ["AM101 - AI / ML Frontier AI Engineer"],
    status: "Leave",
    attendance: "75%",
    joinedDate: "Feb 10, 2026",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    avatar: "https://i.pravatar.cc/150?u=3",
    instructorId: "BT013",
    courses: ["AM101 - AI / ML Frontier AI Engineer", "Q1103 - Quantum Intelligence"],
    status: "Active",
    attendance: "95%",
    joinedDate: "Mar 15, 2025",
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    avatar: "https://i.pravatar.cc/150?u=4",
    instructorId: "BT014",
    courses: ["AM101 - AI / ML Frontier AI Engineer", "Q1103 - Quantum Intelligence"],
    status: "Leave",
    attendance: "60%",
    joinedDate: "Dec 05, 2025",
  },
  {
    id: "5",
    name: "Robert Davis",
    email: "robert.davis@example.com",
    avatar: "https://i.pravatar.cc/150?u=5",
    instructorId: "BT015",
    courses: ["AM101 - AI / ML Frontier AI Engineer"],
    status: "Pending",
    attendance: "-",
    joinedDate: "Apr 01, 2026",
  },
  {
    id: "6",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    avatar: "https://i.pravatar.cc/150?u=6",
    instructorId: "BT016",
    courses: ["Q1103 - Quantum Intelligence"],
    status: "Pending",
    attendance: "-",
    joinedDate: "Apr 10, 2026",
  },
  {
    id: "7",
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "https://i.pravatar.cc/150?u=7",
    instructorId: "BT017",
    courses: ["Q1103 - Quantum Intelligence"],
    status: "Active",
    attendance: "88%",
    joinedDate: "Jun 22, 2024",
  },
  {
    id: "8",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    avatar: "https://i.pravatar.cc/150?u=8",
    instructorId: "BT018",
    courses: ["Q1103 - Quantum Intelligence"],
    status: "Resigned",
    attendance: "45%",
    joinedDate: "Nov 11, 2023",
  },
];
