export interface Message {
    id: number;
    from: "student" | "instructor";
    text: string;
    time: string;
    status?: "sent" | "delivered" | "seen";
}

export interface User {
    id: number;
    name: string;
    role: string;
    online: boolean;
    unread: number;
    batch: string;
    messages: Message[];
}




export const chatUsers: User[] = [
    {
        id: 1,
        name: "Sara Williams",
        role: "AI Engineer - Batch 01",
        online: true,
        unread: 2,
        batch:"Batch-A",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Good morning sir!",
                time: "9:10 AM",
            },
    {
                id: 2,
                from: "instructor",
                text: "Good morning Sara ",
                time: "9:12 AM",
                status: "seen",
            },
            {
                id: 3,
                from: "student",
                text: "Today's session was really helpful.",
                time: "9:30 AM",
            },
        ],
    },
    {
        id: 2,
        name: "Rahul Sharma",
        role: "Full Stack - Batch 02",
        online: false,
        unread: 1,
        batch: "Batch-B",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Sir, I am stuck in Redux setup.",
                time: "Yesterday",
            },
        ],
    },
    {
        id: 3,
        name: "Ananya Iyer",
        role: "Data Science - Batch 03",
        online: true,
        unread: 0,
        batch: "Batch-c",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Assignment submitted.",
                time: "11:40 AM",
            },
            {
                id: 2,
                from: "instructor",
                text: "Received. Will review today.",
                time: "12:05 PM",
                status: "delivered",
            },
        ],
    },
    {
        id: 4,
        name: "Mohammed Arif",
        role: "AI Engineer - Batch 01",
        online: false,
        unread: 3,
        batch: "Batch-d",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Can you share the CNN architecture diagram?",
                time: "Monday",
            },
        ],
    },
    {
        id: 5,
        name: "Divya K",
        role: "Full Stack - Batch 04",
        online: true,
        unread: 0,
        batch: "Batch-A",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Sir, when is the next live session?",
                time: "8:15 AM",
            },
            {
                id: 2,
                from: "instructor",
                text: "Tomorrow at 5:30 PM.",
                time: "8:20 AM",
                status: "seen",
            },
        ],
    },
    {
        id: 6,
        name: "Karthik Raj",
        role: "DevOps - Batch 01",
        online: true,
        unread: 4,
        batch: "Batch-b",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Facing issue in Docker build.",
                time: "10:00 AM",
            },
        ],
    },
    {
        id: 7,
        name: "Meera Nair",
        role: "Data Analytics - Batch 02",
        online: false,
        unread: 0,
        batch: "Batch-c",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Thank you for the extra class.",
                time: "Last Week",
            },
            {
                id: 2,
                from: "instructor",
                text: "You're welcome ",
                time: "Last Week",
                status: "seen",
            },
        ],
    },
    {
        id: 8,
        name: "Vignesh Kumar",
        role: "Cyber Security - Batch 01",
        online: true,
        unread: 1,
        batch: "Batch-d",
        messages: [
            {
                id: 1,
                from: "student",
                text: "Is today's lab mandatory?",
                time: "1:20 PM",
            },
        ],
    },
];
