import type { Post } from "../types/post";

export const posts: Post[] = [
  {
    id: 1,
    author: "Ed Donner",
    role: "Instructor",
    title: "New Module: CI/CD for Machine Learning Pipelines",
    description:
      "This module will help you bridge the gap between building ML models and deploying them in production, making you more industry-ready.",
    tag: "Announcement",
    time: "30 mins ago",

    likes: 42,
    liked: false,
    saved: false,
    isMine: false,

    isInstructor: true,
    isPinned: true,

    comments: [
      {
        id: 1,
        author: "Zara",
        role: "Student",
        time: "10 mins ago",
        text:
          "@Ed Donner, this module sounds very practical. Will we learn real-world deployment tools like Docker or cloud platforms?"
      },
      {
        id: 2,
        author: "Zara",
        role: "Student",
        time: "10 mins ago",
        text:
          "@Ed Donner, this module seems very industry-focused. Could you share what deployment frameworks we'll be using?"
      },
      {
        id: 3,
        author: "Zara",
        role: "Student",
        time: "10 mins ago",
        text:
          "Will there be a hands-on project where we deploy an ML model end-to-end?"
      }
    ]
  },

  {
    id: 2,
    author: "Keerthi",
    role: "Student",
    title: "Explain RAG in simple terms.",
    description:
      "I am confused about Retrieval-Augmented Generation. Can someone explain it in easy words?",
    tag: "Doubt",
    time: "10 mins ago",

    likes: 3,
    liked: false,
    saved: false,
    isMine: true,

    isInstructor: false,
    isPinned: false,

    comments: []
  },

  {
    id: 3,
    author: "Varsha",
    role: "Student",
    title: "Explain RAG in simple terms.",
    description:
      "I need a beginner-friendly explanation with an example.",
    tag: "Doubt",
    time: "5 mins ago",

    likes: 1,
    liked: false,
    saved: false,
    isMine: false,

    isInstructor: false,
    isPinned: false,

    comments: []
  }
];
