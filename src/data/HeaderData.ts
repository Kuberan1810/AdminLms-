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
};


export const profile = {
    image: profileImg,
};