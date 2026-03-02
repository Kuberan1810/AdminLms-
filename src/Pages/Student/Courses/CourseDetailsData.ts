export interface Assignment {
    id: string;
    title: string;
    dueDate: string;
    dueTime: string;
    status: 'In Progress' | 'Completed' | 'Over Due';
}

export interface Lesson {
    id: string;
    title: string;
    duration?: string;
    type: 'video' | 'article' | 'quiz';
    isCompleted?: boolean;
}

export interface Module {
    id: number;
    title: string;
    content: string; // Simplified for now
    lessons?: Lesson[];
}

export interface CourseData {
    course: {
     
        title: string;
        description: string;
        instructor: {
            name: string;
            role: string;
            image?: string;
        };
        duration: string;
        enrolled: string;
        community: string;
    };
    modules: Module[];
    assignments: Assignment[];
    liveClass?: {
        code: string;
        title: string;
        instructor: string;
        topic: string;
        studentsCount: number;
    };
    upcomingClasses?: {
        code: string;
        title: string;
        instructor: string;
        topic: string;
        date: string;
        reminderOn: boolean;
    }[];
}

const am101Data: CourseData = {
    course: {
        title: "1 - AI/ML frontier Engineer",
        description: "Builds advanced AI and Machine Learning systems to solve complex real-world problems using cutting-edge technologies like deep learning and generative AI. Focuses on research, experimentation, and deploying scalable AI solutions in production.",
        instructor: {
            name: "Naveenkumar S",
            role: "CEO of Coirei",
            // image: "https://i.pravatar.cc/150?u=EdDonner" // Placeholder
        },
    duration: "14 weeks",
        enrolled: "60 Students",
        community: "Soon"
    },
    liveClass: {
        code: "AM101",
        title: "AI / ML Frontier AI Engineer",
        instructor: "Naveenkumar S",
        topic: "Introduction to the world of AI",
        studentsCount: 200
    },
    upcomingClasses: [
        {
            code: "AM101",
            title: "AI / ML Frontier AI Engineer",
            instructor: "Naveenkumar S",
            topic: "Introduction to the world of AI",
            date: "Today 07:30 PM - 08:30 PM",
            reminderOn: true
        },
        {
            code: "AM101",
            title: "AI / ML Frontier AI Engineer",
            instructor: "Naveenkumar S",
            topic: "Introduction to the world of AI",
            date: "Tomorrow 10:30 AM - 11:30 AM",
            reminderOn: false
        }
    ],
    modules: [
        {
            id: 1,
            title: "Frontier AI Systems & Deployment",
            content: "...",
            lessons: [
                { id: '1.1', title: 'introduction to the world of AI', type: 'video', isCompleted: false },
                // { id: '3.4', title: 'AI Agents (LangChain, CrewAI, AutoGen)', type: 'video', isCompleted: true },
                // { id: '3.3', title: 'Tool-using autonomous agents', type: 'video', isCompleted: true },
                // { id: '3.2', title: 'API & Web App integration (FastAPI/Flask)', type: 'video', isCompleted: true },
                // { id: '3.1', title: 'Model deployment & basics of MLOps', type: 'video', isCompleted: true },
            ]
        },
        // {
        //     id: 2,
        //     title: "Generative AI & LLM Engineering",
        //     content: "...",
        //     lessons: [
        //         { id: '2.3', title: 'Transformer Architecture Deep Dive', type: 'video', isCompleted: true },
        //         { id: '2.2', title: 'Prompt Engineering Techniques', type: 'video', isCompleted: true },
        //         { id: '2.1', title: 'Introduction to Large Language Models', type: 'video', isCompleted: true },
        //     ]
        // },
        // {
        //     id: 1,
        //     title: "AI & ML Foundations",
        //     content: "...",
        //     lessons: [
        //         { id: '1.2', title: 'Neural Networks Fundamentals', type: 'video', isCompleted: true },
        //         { id: '1.1', title: 'Mathematics for Machine Learning', type: 'video', isCompleted: false },
        //     ]
        // },
    ],
    assignments: [
        // { id: '1', title: 'AM101 - AI / ML Frontier Ai Engineer', dueDate: 'Jan 17, 26', dueTime: '9:00 - 10:00 am', status: 'In Progress' },
        // { id: '2', title: 'AM101 - AI / ML Frontier Ai Engineer', dueDate: 'Jan 15, 26', dueTime: '9:00 - 10:00 am', status: 'Completed' },
        // { id: '3', title: 'AM101 - AI / ML Frontier Ai Engineer', dueDate: 'Jan 16, 26', dueTime: '9:00 - 10:00 am', status: 'In Progress' },
        // { id: '4', title: 'AM101 - AI / ML Frontier Ai Engineer', dueDate: 'Jan 15, 26', dueTime: '9:00 - 10:00 am', status: 'Over Due' },
    ]
};

const ss102Data: CourseData = {
    course: {
        title: "SS102 - System and Software System Pro",
        description: "The System and Software System Pro course provides a comprehensive deep dive into modern system design, software architecture, and DevOps practices. Students will learn to design scalable systems, write production-grade software, and manage complex deployment pipelines.",
        instructor: {
            name: "Sarah Chen",
            role: "Senior Systems Architect",
            image: "https://i.pravatar.cc/150?u=SarahChen"
        },
        duration: "14 weeks",
        enrolled: "60 Students",
        community: "Soon"
    },
    liveClass: {
        code: "SS102",
        title: "System and Software System Pro",
        instructor: "Sarah Chen",
        topic: "Microservices communication patterns",
        studentsCount: 150
    },
    upcomingClasses: [
        {
            code: "SS102",
            title: "System and Software System Pro",
            instructor: "Sarah Chen",
            topic: "Microservices communication patterns",
            date: "Today 03:00 PM - 4:30 PM",
            reminderOn: true
        },
        {
            code: "SS102",
            title: "System and Software System Pro",
            instructor: "Sarah Chen",
            topic: "CI/CD pipeline deep dive",
            date: "Tomorrow 02:00 PM - 3:30 PM",
            reminderOn: false
        }
    ],
    modules: [
        {
            id: 3,
            title: "DevOps & Deployment",
            content: "...",
            lessons: [
                { id: '3.4', title: 'Microservices communication patterns', type: 'video', isCompleted: false },
                { id: '3.3', title: 'Containerization with Docker & Kubernetes', type: 'video', isCompleted: true },
                { id: '3.2', title: 'CI/CD pipelines (GitHub Actions, Jenkins)', type: 'video', isCompleted: true },
                { id: '3.1', title: 'Infrastructure as Code (Terraform)', type: 'video', isCompleted: true },
            ]
        },
        {
            id: 2,
            title: "Software Architecture Patterns",
            content: "...",
            lessons: [
                { id: '2.4', title: 'Event-driven architecture', type: 'video', isCompleted: true },
                { id: '2.3', title: 'Domain-Driven Design (DDD)', type: 'video', isCompleted: true },
                { id: '2.2', title: 'Clean Architecture & SOLID principles', type: 'video', isCompleted: true },
                { id: '2.1', title: 'Monolith vs Microservices', type: 'video', isCompleted: true },
            ]
        },
        {
            id: 1,
            title: "System Design Fundamentals",
            content: "...",
            lessons: [
                { id: '1.3', title: 'Database design & scaling strategies', type: 'video', isCompleted: true },
                { id: '1.2', title: 'Load balancing & caching', type: 'video', isCompleted: true },
                { id: '1.1', title: 'Introduction to distributed systems', type: 'video', isCompleted: true },
            ]
        },
    ],
    assignments: [
        { id: '1', title: 'SS102 - System and Software System Pro', dueDate: 'Jan 20, 26', dueTime: '11:00 - 12:00 pm', status: 'Completed' },
        { id: '2', title: 'SS102 - System and Software System Pro', dueDate: 'Jan 22, 26', dueTime: '2:00 - 3:00 pm', status: 'In Progress' },
        { id: '3', title: 'SS102 - System and Software System Pro', dueDate: 'Jan 18, 26', dueTime: '10:00 - 11:00 am', status: 'Over Due' },
        { id: '4', title: 'SS102 - System and Software System Pro', dueDate: 'Jan 25, 26', dueTime: '9:00 - 10:00 am', status: 'In Progress' },
    ]
};

const q1103Data: CourseData = {
    course: {
        title: "Q1103 - Quantum Intelligence",
        description: "The Quantum Intelligence course explores the intersection of quantum computing and artificial intelligence. Learn quantum mechanics fundamentals, quantum algorithms, and how quantum computing can accelerate machine learning tasks and solve previously intractable problems.",
        instructor: {
            name: "Dr. James Wright",
            role: "Quantum Computing Researcher",
            image: "https://i.pravatar.cc/150?u=JamesWright"
        },
        duration: "14 weeks",
        enrolled: "60 Students",
        community: "Soon"
    },
    liveClass: {
        code: "Q1103",
        title: "Quantum Intelligence",
        instructor: "Dr. James Wright",
        topic: "Quantum error correction techniques",
        studentsCount: 95
    },
    upcomingClasses: [
        {
            code: "Q1103",
            title: "Quantum Intelligence",
            instructor: "Dr. James Wright",
            topic: "Quantum error correction techniques",
            date: "Today 11:00 AM - 12:30 PM",
            reminderOn: true
        },
        {
            code: "Q1103",
            title: "Quantum Intelligence",
            instructor: "Dr. James Wright",
            topic: "Quantum machine learning algorithms",
            date: "Thursday 10:00 AM - 11:30 AM",
            reminderOn: false
        }
    ],
    modules: [
        {
            id: 3,
            title: "Quantum Machine Learning",
            content: "...",
            lessons: [
                { id: '3.4', title: 'Quantum error correction techniques', type: 'video', isCompleted: false },
                { id: '3.3', title: 'Quantum neural networks (QNN)', type: 'video', isCompleted: false },
                { id: '3.2', title: 'Variational Quantum Eigensolver (VQE)', type: 'video', isCompleted: true },
                { id: '3.1', title: 'Quantum kernel methods for classification', type: 'video', isCompleted: true },
            ]
        },
        {
            id: 2,
            title: "Quantum Algorithms",
            content: "...",
            lessons: [
                { id: '2.4', title: 'Quantum entanglement & teleportation', type: 'video', isCompleted: true },
                { id: '2.3', title: 'Grover\'s search algorithm', type: 'video', isCompleted: true },
                { id: '2.2', title: 'Shor\'s factoring algorithm', type: 'video', isCompleted: true },
                { id: '2.1', title: 'Quantum Fourier Transform', type: 'video', isCompleted: true },
            ]
        },
        {
            id: 1,
            title: "Quantum Computing Foundations",
            content: "...",
            lessons: [
                { id: '1.3', title: 'Quantum circuits & gates (Hadamard, CNOT, Pauli)', type: 'video', isCompleted: true },
                { id: '1.2', title: 'Qubits, superposition & measurement', type: 'video', isCompleted: true },
                { id: '1.1', title: 'Introduction to quantum mechanics for CS', type: 'video', isCompleted: true },
            ]
        },
    ],
    assignments: [
        { id: '1', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 19, 26', dueTime: '10:00 - 11:00 am', status: 'Completed' },
        { id: '2', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 23, 26', dueTime: '11:00 - 12:00 pm', status: 'In Progress' },
        { id: '3', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 17, 26', dueTime: '9:00 - 10:00 am', status: 'Over Due' },
        { id: '4', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 26, 26', dueTime: '2:00 - 3:00 pm', status: 'Completed' },
    ]
};

export const coursesData: Record<string, CourseData> = {
    '1': am101Data,
    '2': ss102Data,
    '3': q1103Data
};
export const upcomingClasses = [
    {
        code: "AM101",
        title: "AI / ML Frontier AI Engineer",
        instructor: "Naveenkumar S",
        topic: "Introduction to the world of AI",
        date: "04 Mar,  07:30 PM - 08:30 PM",
        reminderOn: true,
    },
    // {
    //     code: "AM101",
    //     title: "AI / ML Frontier AI Engineer",
    //     instructor: "Naveenkumar S",
    //     topic: "Introduction to the world of AI",
    //     date: "Tomorrow 10:30 AM - 11:30 AM",
    //     reminderOn: false,
    // },
];