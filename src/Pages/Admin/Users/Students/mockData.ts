import avatarImg from '../../../../assets/avatar.jpg';

export interface AttendanceRecord {
  date: string;
  course: string;
  time: string;
  status: 'Present' | 'Absent';
}

export interface TestPerformance {
  date: string;
  name: string;
  mark: number;
  result: 'Passed' | 'Fail';
}

export interface Activity {
  iconType: 'file' | 'check' | 'mail' | 'exam';
  title: string;
  subtitle: string;
  time: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  course: string;
  courseSubtitle: string;
  status: 'Active' | 'Leave' | 'Pending' | 'Dropped';
  attendance: string;
  dateJoined: string;
  certificateStatus: 'Verified' | 'Pending' | 'Rejected';
  completionDate: string;
  action: string;
  batches: string[];
  attendanceRecords: AttendanceRecord[];
  testPerformance: TestPerformance[];
  recentActivity: Activity[];
}

export const mockStudents: Student[] = [
  {
    id: 'BT011',
    name: 'Alice Smith',
    email: 'alice.smith@gmail.com',
    phone: '+91 9876543210',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Active',
    attendance: '92%',
    dateJoined: 'Jan 22, 2026',
    certificateStatus: 'Verified',
    completionDate: '23/02/2026',
    action: 'Download',
    batches: ['#AM101-B01', '#AM101-B04'],
    attendanceRecords: [
      { date: 'Jan 24, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '09:00 AM - 10:30 AM', status: 'Present' },
      { date: 'Jan 23, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '11:00 AM - 12:30 PM', status: 'Present' },
      { date: 'Jan 22, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '02:00 PM - 03:30 PM', status: 'Absent' },
      { date: 'Jan 21, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '10:00 AM - 11:30 AM', status: 'Present' },
    ],
    testPerformance: [
      { date: '23 Jan 2026', name: 'Mid-Term AM101 Proficiency Test', mark: 88, result: 'Passed' },
      { date: '15 Jan 2026', name: 'AI Ethics Fundamentals', mark: 92, result: 'Passed' },
      { date: '05 Jan 2026', name: 'Python for Data Science', mark: 45, result: 'Fail' },
    ],
    recentActivity: [
      { iconType: 'file', title: 'Assignment Uploaded', subtitle: 'AM101-B01', time: '10 mins ago' },
      { iconType: 'check', title: 'Submitted Assignment', subtitle: 'AM101-B04', time: '30 mins ago' },
      { iconType: 'mail', title: 'Replied to query', subtitle: 'AM101-B01', time: '1 hour ago' },
      { iconType: 'exam', title: 'Exam result published', subtitle: 'Q1103-B01', time: '1 hour ago' },
    ]
  },
  {
    id: 'BT013',
    name: 'Charlie Brown',
    email: 'charlie.b@gmail.com',
    phone: '+91 9876543212',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: 'Q1103 - Quantum Intelligence',
    status: 'Active',
    attendance: '88%',
    dateJoined: 'Oct 05, 2023',
    certificateStatus: 'Verified',
    completionDate: '12/03/2026',
    action: 'Download',
    batches: ['#AM101-B01', '#Q1103-B02'],
    attendanceRecords: [
      { date: 'Jan 24, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '09:00 AM - 10:30 AM', status: 'Present' },
      { date: 'Jan 24, 2026', course: 'Q1103 - Quantum Intelligence', time: '11:00 AM - 12:30 PM', status: 'Present' },
      { date: 'Jan 23, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '02:00 PM - 03:30 PM', status: 'Absent' },
      { date: 'Jan 22, 2026', course: 'Q1103 - Quantum Intelligence', time: '10:00 AM - 11:30 AM', status: 'Present' },
    ],
    testPerformance: [
      { date: '23 Jan 2026', name: 'Quantum Basics Quiz', mark: 95, result: 'Passed' },
      { date: '20 Jan 2026', name: 'AI/ML Mid-Term', mark: 82, result: 'Passed' },
      { date: '15 Jan 2026', name: 'Neural Networks Basics', mark: 88, result: 'Passed' },
    ],
    recentActivity: [
      { iconType: 'exam', title: 'Exam result published', subtitle: 'Q1103-B01', time: '1 hour ago' },
      { iconType: 'file', title: 'Assignment Uploaded', subtitle: 'Q1103-B02', time: '2 hours ago' },
      { iconType: 'mail', title: 'Replied to query', subtitle: 'Q1103-B02', time: '3 hours ago' },
    ]
  },
  {
    id: 'BT012',
    name: 'Bob Jones',
    email: 'bob.jones@gmail.com',
    phone: '+91 9876543211',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Leave',
    attendance: '65%',
    dateJoined: 'Sep 15, 2023',
    certificateStatus: 'Pending',
    completionDate: '15/01/2026',
    action: 'Upload',
    batches: ['#AM101-B01'],
    attendanceRecords: [
      { date: 'Jan 10, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '09:00 AM - 10:30 AM', status: 'Absent' },
      { date: 'Jan 09, 2026', course: 'AM101 - AI / ML Frontier AI Engineer', time: '11:00 AM - 12:30 PM', status: 'Present' },
    ],
    testPerformance: [
      { date: '08 Jan 2026', name: 'Python Basics', mark: 72, result: 'Passed' },
    ],
    recentActivity: [
      { iconType: 'file', title: 'Assignment Uploaded', subtitle: 'AM101-B01', time: '2 weeks ago' },
    ]
  },
  {
    id: 'BT014',
    name: 'Diana Prince',
    email: 'diana.p@themyscira.com',
    phone: '+91 9876543213',
    avatar: avatarImg,
    course: 'Q1103 - Quantum Intelligence',
    courseSubtitle: 'AM101 - AI / ML Frontier AI Engineer',
    status: 'Active',
    attendance: '98%',
    dateJoined: 'Nov 01, 2023',
    certificateStatus: 'Verified',
    completionDate: '01/03/2026',
    action: 'Download',
    batches: ['#Q1103-B01', '#AM101-B02'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT015',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@impossible.com',
    phone: '+91 9876543214',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Dropped',
    attendance: '45%',
    dateJoined: 'Aug 20, 2023',
    certificateStatus: 'Rejected',
    completionDate: 'N/A',
    action: 'N/A',
    batches: ['#AM101-B03'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT016',
    name: 'Fiona Gallagher',
    email: 'fiona.g@southside.com',
    phone: '+91 9876543215',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: 'Q1103 - Quantum Intelligence',
    status: 'Active',
    attendance: '85%',
    dateJoined: 'Oct 10, 2023',
    certificateStatus: 'Pending',
    completionDate: '28/02/2026',
    action: 'Upload',
    batches: ['#AM101-B02'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT017',
    name: 'George Weasley',
    email: 'george.w@joke-shop.com',
    phone: '+91 9876543216',
    avatar: avatarImg,
    course: 'Q1103 - Quantum Intelligence',
    courseSubtitle: '',
    status: 'Leave',
    attendance: '72%',
    dateJoined: 'Sep 01, 2023',
    certificateStatus: 'Verified',
    completionDate: '10/02/2026',
    action: 'Download',
    batches: ['#Q1103-B03'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT018',
    name: 'Hannah Montana',
    email: 'hannah.m@disney.com',
    phone: '+91 9876543217',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Active',
    attendance: '90%',
    dateJoined: 'Nov 15, 2023',
    certificateStatus: 'Verified',
    completionDate: '15/03/2026',
    action: 'Download',
    batches: ['#AM101-B01'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT019',
    name: 'Ian Somerhalder',
    email: 'ian.s@mystic-falls.com',
    phone: '+91 9876543218',
    avatar: avatarImg,
    course: 'Q1103 - Quantum Intelligence',
    courseSubtitle: '',
    status: 'Pending',
    attendance: '0%',
    dateJoined: 'Jan 05, 2024',
    certificateStatus: 'Pending',
    completionDate: 'N/A',
    action: 'Upload',
    batches: ['#Q1103-B01'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT020',
    name: 'Julia Roberts',
    email: 'julia.r@hollywood.com',
    phone: '+91 9876543219',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Active',
    attendance: '95%',
    dateJoined: 'Jul 12, 2023',
    certificateStatus: 'Verified',
    completionDate: '12/12/2025',
    action: 'Download',
    batches: ['#AM101-B05'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT021',
    name: 'Kevin Hart',
    email: 'kevin.h@comedy.com',
    phone: '+91 9876543220',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: 'Q1103 - Quantum Intelligence',
    status: 'Active',
    attendance: '82%',
    dateJoined: 'Oct 25, 2023',
    certificateStatus: 'Pending',
    completionDate: '25/02/2026',
    action: 'Upload',
    batches: ['#AM101-B01', '#Q1103-B01'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT022',
    name: 'Lara Croft',
    email: 'lara.c@tomb-raider.com',
    phone: '+91 9876543221',
    avatar: avatarImg,
    course: 'Q1103 - Quantum Intelligence',
    courseSubtitle: '',
    status: 'Leave',
    attendance: '78%',
    dateJoined: 'Aug 15, 2023',
    certificateStatus: 'Verified',
    completionDate: '15/01/2026',
    action: 'Download',
    batches: ['#Q1103-B02'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
  {
    id: 'BT023',
    name: 'Mike Wheeler',
    email: 'mike.w@hawkins.com',
    phone: '+91 9876543222',
    avatar: avatarImg,
    course: 'AM101 - AI / ML Frontier AI Engineer',
    courseSubtitle: '',
    status: 'Active',
    attendance: '89%',
    dateJoined: 'Dec 01, 2023',
    certificateStatus: 'Pending',
    completionDate: '01/04/2026',
    action: 'Upload',
    batches: ['#AM101-B04'],
    attendanceRecords: [],
    testPerformance: [],
    recentActivity: []
  },
];

export const studentStats = {
  totalStudents: 550,
  activeStudents: 18,
  graduated: 106,
  avgAttendance: '95%',
  attendanceTrend: '+12%'
};

