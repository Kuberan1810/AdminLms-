export type StatusType =
  | 'In Progress'
  | 'Submitted'
  | 'Graded'
  | 'Overdue'
  | 'Submitted Late'
  | 'All status';

export interface Resource {
  id: number;
  title: string;
  subText?: string;
  url: string;
  type: "pdf" | "link" | "image";
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  objective: string;
  expectedOutcome: string;
  status: StatusType;
  deadline: string;
  resources: Resource[];
}

// export const Assignments: Assignment[] = [
//   {
//     id: 1,
//     title: "Build Q&A system using RAG",
//     course: "AM101 - AI / ML Frontier Ai Engineer",
//     description:
//       "Build a Question Answering (Q&A) system using Retrieval-Augmented Generation (RAG). In this assignment, you will combine a language model with external knowledge sources to generate more accurate and context-aware answers instead of relying only on the model's memory.",
//     objective:
//       "Design and implement a basic retrieval pipeline that searches relevant information, passes it as context to the language model, and produces meaningful responses.",
//     expectedOutcome:
//       "A working RAG-based Q&A system that can answer questions accurately using provided data, demonstrating the practical application of AI in learning platforms.",
//     status: "Overdue",
//     deadline: "Due Jan 26, 11:59 PM",
//     resources: [
//       { id: 1, title: "Project_Guidelines.pdf", subText: "2.4 MB", url: "#", type: "pdf" },
//       { id: 2, title: "RAG Architecture Overview", subText: "Google Drive", url: "https://drive.google.com", type: "link" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Implement PDF-based Q&A using Vector Database",
//     course: "AM101 - AI / ML Frontier Ai Engineer",
//     description:
//       "Extract content from PDF documents, generate vector embeddings, store them in a vector database, and use semantic search to answer user queries with relevant context from the documents.",
//     objective:
//       "Build a pipeline that ingests PDFs, chunks text, creates embeddings using an embedding model, stores them in a vector DB (e.g., Pinecone, ChromaDB), and retrieves relevant chunks to answer questions.",
//     expectedOutcome:
//       "A functional PDF Q&A tool where users can upload documents and ask questions, receiving accurate answers grounded in the uploaded content.",
//     status: "Submitted",
//     deadline: "Submitted on Jan 18, 12:06 PM",
//     resources: [
//       { id: 1, title: "VectorDB_Setup_Guide.pdf", subText: "1.8 MB", url: "#", type: "pdf" },
//       { id: 2, title: "Embedding Models Comparison", subText: "Notion Doc", url: "https://notion.so", type: "link" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Integrate OpenAI API with Retrieval Pipeline",
//     course: "AM101 - AI / ML Frontier Ai Engineer",
//     description:
//       "Connect the OpenAI API with a custom retrieval pipeline to generate context-aware responses. The pipeline should fetch relevant documents and pass them as context to the language model for accurate answer generation.",
//     objective:
//       "Implement an end-to-end retrieval-augmented generation workflow using the OpenAI API, including prompt engineering, context injection, and response formatting.",
//     expectedOutcome:
//       "A working integration where the OpenAI model generates answers based on retrieved context, with proper error handling and rate limiting.",
//     status: "Overdue",
//     deadline: "Last date: Jan 26, 11:59 PM",
//     resources: [
//       { id: 1, title: "OpenAI_API_Reference.pdf", subText: "3.1 MB", url: "#", type: "pdf" },
//       { id: 2, title: "Prompt Engineering Guide", subText: "GitHub Repo", url: "https://github.com", type: "link" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Build a Rule-Based Chatbot for System FAQs",
//     course: "SS102 - System and Software System Pro",
//     description:
//       "Create a rule-based chatbot that can answer frequently asked questions about system and software topics. The chatbot should use pattern matching and predefined rules to identify user intent and provide appropriate responses.",
//     objective:
//       "Design a chatbot architecture with intent recognition, response templates, and a knowledge base of system FAQs. Implement conversation flow management and fallback handling.",
//     expectedOutcome:
//       "A deployed chatbot that handles at least 20 common system FAQs with high accuracy, including graceful fallback for unrecognized queries.",
//     status: "Submitted Late",
//     deadline: "Jan 27, 10:30 AM (1 day late)",
//     resources: [
//       { id: 1, title: "Chatbot_Design_Patterns.pdf", subText: "1.5 MB", url: "#", type: "pdf" },
//       { id: 2, title: "FAQ Knowledge Base Template", subText: "Google Sheets", url: "https://docs.google.com", type: "link" },
//     ],
//   },
//   {
//     id: 5,
//     title: "Simulate quantum entanglement using code",
//     course: "Q1103 - Quantum Intelligence",
//     description:
//       "Simulate quantum entanglement concepts using code and visualize quantum state behavior. Use libraries like Qiskit or Cirq to create entangled qubit pairs and observe measurement correlations.",
//     objective:
//       "Implement Bell state preparation, apply quantum gates to create entanglement, and measure the resulting quantum states to verify entanglement through statistical analysis of measurement outcomes.",
//     expectedOutcome:
//       "A simulation that demonstrates quantum entanglement with visualizations of quantum state probabilities, Bell inequality violations, and measurement correlation plots.",
//     status: "Submitted",
//     deadline: "Submitted on Jan 18, 12:06 PM",
//     resources: [
//       { id: 1, title: "Quantum_Computing_Basics.pdf", subText: "4.2 MB", url: "#", type: "pdf" },
//       { id: 2, title: "Qiskit Tutorial Notebook", subText: "Google Colab", url: "https://colab.research.google.com", type: "link" },
//     ],
//   },
//   {
//     id: 6,
//     title: "Create a Search Interface for system logs",
//     course: "SS102 - System and Software System Pro",
//     description:
//       "Build a search interface that allows users to query and filter system logs efficiently. The interface should support full-text search, date range filtering, log level filtering, and real-time log streaming.",
//     objective:
//       "Design and implement a responsive search UI with advanced filtering capabilities, connected to a log data source. Include features like search highlighting, pagination, and export functionality.",
//     expectedOutcome:
//       "A fully functional log search interface that can handle large volumes of log data, with sub-second search performance and an intuitive user experience.",
//     status: "In Progress",
//     deadline: "Due Jan 26, 11:59 PM",
//     resources: [
//       { id: 1, title: "Log_Search_Requirements.pdf", subText: "1.2 MB", url: "#", type: "pdf" },
//       { id: 2, title: "Elasticsearch Query DSL Guide", subText: "Official Docs", url: "https://elastic.co", type: "link" },
//       { id: 3, title: "UI Mockups", subText: "Figma", url: "https://figma.com", type: "link" },
//     ],
//   },
// ];

// /** Look up a single assignment by its numeric ID */
// export const getAssignmentById = (id: number): Assignment | undefined => {
//   return Assignments.find((a) => a.id === id);
// };
