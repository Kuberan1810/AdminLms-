export interface CourseCardData {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  duration: string;
  totalBatches: number;
  totalStudents: number;
  activeStudents: number;
  progress: number; // 0-100
  status: "active" | "upcoming" | "completed";
  thumbnail: string;
}

export interface BatchCardData {
  id: string;
  courseId: string;
  batchName: string;
  instructor: { name: string; avatar: string };
  startDate: string;
  endDate: string;
  totalStudents: number;
  capacity: number;
  status: "active" | "upcoming" | "completed";
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: number;
  status: "active" | "inactive";
  joinedDate: string;
}

