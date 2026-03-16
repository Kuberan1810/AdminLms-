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
    content?: string;
    keyTopics?: string[];
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
            role: "Instructor",
            // image: "https://i.pravatar.cc/150?u=EdDonner" // Placeholder
        },
        duration: "12 weeks",
        enrolled: "60 Students",
        community: "Soon"
    },
    liveClass: {
        code: "AM101",
        title: "AI / ML Frontier AI Engineer",
        instructor: "Naveenkumar S",
        topic: "introduction to programming with python",
        studentsCount: 200
    },
    upcomingClasses: [
        {
            code: "AM101",
            title: "AI / ML Frontier AI Engineer",
            instructor: "Naveenkumar S",
            topic: "Introduction to the world of AI",
            date: "Today 08:30 PM - 09:30 PM",
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
                {
                    id: '1.1',
                    title: 'introduction to the world of AI',
                    type: 'video',
                    isCompleted: true,
                    content: 'In this introductory lesson, we will explore the fundamental concepts of Artificial Intelligence (AI). We will discuss its history, evolution, and various real-world applications across different industries. You will gain a clear understanding of machine learning verses deep learning.',
                    keyTopics: [
                        'What is AI, Machine Learning, and Deep Learning?',
                        'Brief history and evolution of AI',
                        'Real-world applications and use cases',
                        'Ethical considerations in AI'
                    ]
                },
                {
                    id: '1.2',
                    title: 'introduction to programming with python',
                    type: 'video',
                    isCompleted: true,
                    content: 'This lesson covers the basics of Python programming, a language widely used in AI. We will go over how to install Python, set up your Integrated Development Environment (IDE), and write your first script. By the end, you will be comfortable running basic Python commands.',
                    keyTopics: [
                        'What is Python and where it is used',
                        'Installing Python / using IDE (VS Code / Jupyter)',
                        'Running Python scripts',
                        'Basic syntax, Variables, and Comments',
                        'Input and Output (print(), input())'
                    ]
                },
                {
                    id: '1.3',
                    title: 'Python Data Types',
                    type: 'video',
                    isCompleted: true,
                    content: 'Understand how data is stored and manipulated in Python. We will explore numeric types, strings, booleans, and compound data types like lists, tuples, dictionaries, and sets. Practice exercises will include storing student details and performing list operations.',
                    keyTopics: [
                        'Numeric types (int, float), Strings, and Booleans',
                        'Type conversion and basic string operations',
                        'Lists, Tuples, Dictionaries, and Sets',
                        'Practice: Store student details in dictionary',
                        'Practice: List operations (append, remove, indexing)'
                    ]
                },
                {
                    id: '1.4',
                    title: ' Conditional Statements',
                    type: 'video',
                    isCompleted: true,
                    content: 'Learn how to implement decision-making logic in your Python programs. This module covers conditional statements such as if, else, elif, and nested conditions. You will also learn about logical and comparison operators to build complex conditions.',
                    keyTopics: [
                        'if, if else, and elif statements',
                        'Nested conditions',
                        'Logical operators (and, or, not)',
                        'Comparison operators',
                        'Practice: Check if number is even or odd, Grade calculator'
                    ]
                },
                {
                    id: '1.5',
                    title: 'Functions',
                    type: 'video',
                    isCompleted: true,
                    content: 'Discover how to write reusable and organized code using functions. We will cover defining functions, passing arguments, return values, and scopes. You will also practice writing functions to calculate logic like checking prime numbers or computing factorials.',
                    keyTopics: [
                        'What are functions and Defining functions (def)',
                        'Parameters, arguments, and return values',
                        'Default arguments and Lambda functions',
                        'Scope (local vs global)',
                        'Practice: Function to calculate factorial'
                    ]
                }, {
                    id: '1.6',
                    title: 'OOPS (Object-Oriented Programming)',
                    type: 'video',
                    isCompleted: false,
                    content: 'Learn the fundamentals of Object-Oriented Programming (OOP) and how it helps organize code using objects and classes. In this lesson, you will understand how to create classes, define objects, and use important OOP concepts like encapsulation, inheritance, polymorphism, and abstraction. These concepts make programs more reusable, scalable, and easier to maintain.',
                    keyTopics: [
                        'Introduction to Object-Oriented Programming',
                        'Classes and Objects',
                        'Constructor (__init__) and instance variables',
                        'Encapsulation and data hiding',
                        'Inheritance and code reusability',
                        'Polymorphism (method overriding)',
                        'Abstraction and real-world examples',
                    ]
                },
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
        // { id: '1', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 19, 26', dueTime: '10:00 - 11:00 am', status: 'Completed' },
        // { id: '2', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 23, 26', dueTime: '11:00 - 12:00 pm', status: 'In Progress' },
        // { id: '3', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 17, 26', dueTime: '9:00 - 10:00 am', status: 'Over Due' },
        // { id: '4', title: 'Q1103 - Quantum Intelligence', dueDate: 'Jan 26, 26', dueTime: '2:00 - 3:00 pm', status: 'Completed' },
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
        topic: "Introduction to programming with python",
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