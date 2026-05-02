import profileImg from "../assets/Images/home/profile.png";


export const headerMap: Record<string, { title: string; subtitle: string }> = {
    
    "/dashboard": {
        title: "Dashboard",
        subtitle: "Welcome ",
    },
    "/courses": {
        title: "Courses",
        subtitle: "Manage and continue your enrolled courses",
    },
    "/assignments": {
        title: "Assignments",
        subtitle: "Track, submit and review your assignments",
    },
    "/community": {
        title: "Community",
        subtitle: "Connect and collaborate with learners",
    },
    "/chat": {
        title: "Chat",
        subtitle: "Conversations with mentors and classmates",
    },
    "/chats": {
        title: "Chat",
        subtitle: "Conversations with mentors and classmates",
    },
    
    "/test": {
        title: "Test",
        subtitle: "Attend tests and view performance",
    },
    "/attendance": {
        title: "Attendance",
        subtitle: "Track your class attendance",
    },

    "/profile": {
        title: "Profile",
        subtitle: "View and update your profile details",
    },

    // Admin
    "/admin/dashboard": {
        title: "Admin Dashboard",
        subtitle: "Comprehensive overview of system performance",
    },
    "/admin/courses": {
        title: "Course Management",
        subtitle: "Manage, edit and create courses for the platform",
    },
    "/admin/courses/overview": {
        title: "Course Overview",
        subtitle: "View and manage course details and batches",
    },
    "/admin/courses/batch": {
        title: "Batch Overview",
        subtitle: "Manage enrolled students and batch sessions",
    },
    "/admin/users/instructors": {
        title: "Instructor Management",
        subtitle: "Overview of faculty members",
    },
    "/admin/users/students": {
        title: "Student Management",
        subtitle: "Manage and oversee all platform students",
    },
    "/admin/community": {
        title: "Community Moderation",
        subtitle: "Moderate community discussions and posts",
    },
    "/admin/chat": {
        title: "Chat Monitor",
        subtitle: "Monitor and manage system-wide communications",
    },
    "/admin/reports": {
        title: "System Reports",
        subtitle: "Generate and view platform performance reports",
    },
    
};


export const profile = {
    image: profileImg,
};