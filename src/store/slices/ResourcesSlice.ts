import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
/* ================= Types ================= */

export type Resource = {
  id: string;
  name: string;
  url: string;
  size?: string;
};

export type Chapter = {
  id: string;
  title: string;
  moduleId: string;
  resourceIds: string[];
  assignmentIds: string[];
  classContent?: string;
  keyTopics?: string[];
};

export type Assignment = {
  id: string;
  title: string;
  moduleId: string;
  dueDate: string;
  dueTime: string;
  description: string;
  objective: string;
  outcome: string;
  resources: string[]; // URLs or file paths
  batch: string;
  course: string;
};

export type QuestionType = "mcq" | "checkbox" | "short" | "long";

export type Question = {
  id: number;
  text: string;
  type: QuestionType;
  options: any[];
  required: boolean;
  answerKey: number[];
  points: number;
}

export type Test = {
  id: string;
  name: string;
  title?: string;
  moduleId: string;
  module_name?: string;
  course: string;
  batch: string;
  category: string;
  description: string;
  fromTime: string;
  toTime: string; // or duration
  questions: Question[];
  totalMarks: number;
  createdAt: string;
  date: string; // Added back date field for compatibility
}

export type Module = {
  id: string;
  title: string;
  chapterIds: string[];
  assignmentIds: string[];
  testIds: string[];
};

type ResourcesState = {
  modules: {
    byId: Record<string, Module>;
    allIds: string[];
  };
  chapters: {
    byId: Record<string, Chapter>;
    allIds: string[];
  };
  resources: {
    byId: Record<string, Resource>;
    allIds: string[];
  };
  assignments: {
    byId: Record<string, Assignment>;
    allIds: string[];
  };
  tests: {
    byId: Record<string, Test>;
    allIds: string[];
  }
};

/* ================= Initial ================= */

const initialState: ResourcesState = {
  modules: { byId: {}, allIds: [] },
  chapters: { byId: {}, allIds: [] },
  resources: { byId: {}, allIds: [] },
  assignments: { byId: {}, allIds: [] },
  tests: { 
    byId: {
      "test-1": {
        id: "test-1",
        name: "Full Stack Development - Quiz 1",
        title: "Full Stack Development - Quiz 1",
        moduleId: "mod-1",
        module_name: "React Basics",
        course: "FS-101",
        batch: "Batch A",
        category: "Test",
        description: "This test covers the basics of React and Redux. Make sure you have reviewed the last 3 modules.",
        fromTime: "01:00 PM",
        toTime: "02:00 PM",
        date: "2026-03-24", // Today
        questions: [
          { id: 1, text: "Which hook is used for side effects in React?", type: "mcq", options: [{ id: 1, text: "useState" }, { id: 2, text: "useEffect" }, { id: 3, text: "useContext" }, { id: 4, text: "useMemo" }], required: true, answerKey: [2], points: 5 },
          { id: 2, text: "What does 'RAG' stand for in AI?", type: "mcq", options: [{ id: 5, text: "Random Access Generation" }, { id: 6, text: "Retrieval-Augmented Generation" }, { id: 7, text: "Rapid AI Growth" }, { id: 8, text: "Recursive Analysis Group" }], required: true, answerKey: [6], points: 5 },
          { id: 3, text: "Redux is primarily used for:", type: "mcq", options: [{ id: 9, text: "Styling" }, { id: 10, text: "Global State Management" }, { id: 11, text: "Routing" }, { id: 12, text: "Database Management" }], required: true, answerKey: [10], points: 5 }
        ],
        totalMarks: 15,
        createdAt: new Date().toISOString()
      },
      "test-2": {
        id: "test-2",
        name: "Backend Architecture - Final Exam",
        title: "Backend Architecture - Final Exam",
        moduleId: "mod-2",
        module_name: "System Design",
        course: "BE-202",
        batch: "Batch B",
        category: "Test",
        description: "Final examination for Backend Architecture. Coverage: Microservices, SQL vs NoSQL, and API Design.",
        fromTime: "04:00 PM",
        toTime: "06:00 PM",
        date: "2026-03-25", // Tomorrow
        questions: [
          { id: 4, text: "Which database is known for being NoSQL?", type: "mcq", options: [{ id: 13, text: "PostgreSQL" }, { id: 14, text: "MySQL" }, { id: 15, text: "MongoDB" }, { id: 16, text: "Oracle" }], required: true, answerKey: [15], points: 10 },
          { id: 5, text: "What does REST stand for?", type: "mcq", options: [{ id: 17, text: "Representational State Transfer" }, { id: 18, text: "Remote State Text" }, { id: 19, text: "Regional Site Tool" }, { id: 20, text: "None of above" }], required: true, answerKey: [17], points: 10 }
        ],
        totalMarks: 20,
        createdAt: new Date().toISOString()
      },
      "test-3": {
        id: "test-3",
        name: "UI/UX Design - Midterm",
        title: "UI/UX Design - Midterm",
        moduleId: "mod-3",
        module_name: "UX Research",
        course: "UI-303",
        batch: "Batch C",
        category: "Test",
        description: "Midterm test for UI/UX Design course.",
        fromTime: "09:00 AM",
        toTime: "10:30 AM",
        date: "2026-03-23", // Yesterday
        questions: [
          { id: 6, text: "What is a wireframe?", type: "mcq", options: [{ id: 21, text: "A colored final design" }, { id: 22, text: "A low-fidelity structural sketch" }, { id: 23, text: "A coding framework" }, { id: 24, text: "A user interview" }], required: true, answerKey: [22], points: 5 }
        ],
        totalMarks: 5,
        createdAt: new Date().toISOString()
      }
    },
    allIds: ["test-1", "test-2", "test-3"]
  },
};

/* ================= Slice ================= */

const resourcesSlice = createSlice({
  name: "resourcesManager",
  initialState,
  reducers: {
    /* ---------- Module ---------- */
    addModule: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;

      state.modules.byId[id] = {
        id,
        title,
        chapterIds: [],
        assignmentIds: [],
        testIds: [],
      };

      state.modules.allIds.push(id);
    },

    /* ---------- Chapter ---------- */
    addChapter: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        moduleId: string;
        classContent?: string;
        keyTopics?: string[];
      }>
    ) => {
      const { id, title, moduleId, classContent, keyTopics } = action.payload;

      state.chapters.byId[id] = {
        id,
        title,
        moduleId,
        resourceIds: [],
        assignmentIds: [],
        classContent: classContent || "",
        keyTopics: keyTopics || [],
      };

      state.chapters.allIds.push(id);

      if (state.modules.byId[moduleId]) {
        state.modules.byId[moduleId].chapterIds.push(id);
      }
    },

    updateChapter: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        classContent?: string;
        keyTopics?: string[];
      }>
    ) => {
      const { id, title, classContent, keyTopics } = action.payload;
      const chapter = state.chapters.byId[id];
      if (chapter) {
        if (title !== undefined) chapter.title = title;
        if (classContent !== undefined) chapter.classContent = classContent;
        if (keyTopics !== undefined) chapter.keyTopics = keyTopics;
      }
    },

    /* ---------- Resource ---------- */
    addResource: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        url: string;
        chapterId: string;
        size?: string;
      }>
    ) => {
      const { id, name, url, chapterId, size } = action.payload;

      state.resources.byId[id] = { id, name, url, size };
      state.resources.allIds.push(id);

      if (state.chapters.byId[chapterId]) {
        state.chapters.byId[chapterId].resourceIds.push(id);
      }
    },

    updateResource: (
      state,
      action: PayloadAction<{ id: string; name: string; url?: string }>
    ) => {
      const { id, name, url } = action.payload;
      if (state.resources.byId[id]) {
        state.resources.byId[id].name = name;
        if (url) state.resources.byId[id].url = url;
      }
    },

    /* ---------- Assignment ---------- */
    addAssignment: (
      state,
      action: PayloadAction<Assignment>
    ) => {
      const assignment = action.payload;
      state.assignments.byId[assignment.id] = assignment;
      state.assignments.allIds.push(assignment.id);

      // Add to Module
      if (state.modules.byId[assignment.moduleId]) {
        state.modules.byId[assignment.moduleId].assignmentIds.push(assignment.id);
      }
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const assignment = action.payload;
      if (state.assignments.byId[assignment.id]) {
        state.assignments.byId[assignment.id] = assignment;
      }
    },

    removeAssignment: (state, action: PayloadAction<{ assignmentId: string; moduleId?: string }>) => {
      const { assignmentId, moduleId } = action.payload;
      const assignment = state.assignments.byId[assignmentId];
      // If moduleId not provided, try to find it from the assignment itself
      const modId = moduleId || (assignment ? assignment.moduleId : null);

      delete state.assignments.byId[assignmentId];
      state.assignments.allIds = state.assignments.allIds.filter(id => id !== assignmentId);

      if (modId && state.modules.byId[modId]) {
        state.modules.byId[modId].assignmentIds = state.modules.byId[modId].assignmentIds.filter(id => id !== assignmentId);
      }
    },

    /* ---------- Test ---------- */
    addTest: (state, action: PayloadAction<Test>) => {
      const test = action.payload;
      state.tests.byId[test.id] = test;
      state.tests.allIds.push(test.id);

      if (state.modules.byId[test.moduleId]) {
        state.modules.byId[test.moduleId].testIds.push(test.id);
      }
    },

    removeTest: (state, action: PayloadAction<{ testId: string }>) => {
      const { testId } = action.payload;
      const test = state.tests.byId[testId];

      if (test) {
        const moduleId = test.moduleId;
        delete state.tests.byId[testId];
        state.tests.allIds = state.tests.allIds.filter(id => id !== testId);

        if (state.modules.byId[moduleId]) {
          state.modules.byId[moduleId].testIds = state.modules.byId[moduleId].testIds.filter(id => id !== testId);
        }
      }
    },

    /* ---------- Removals ---------- */
    removeResource: (
      state,
      action: PayloadAction<{ resourceId: string; chapterId: string }>
    ) => {
      const { resourceId, chapterId } = action.payload;

      delete state.resources.byId[resourceId];
      state.resources.allIds = state.resources.allIds.filter(id => id !== resourceId);

      if (state.chapters.byId[chapterId]) {
        state.chapters.byId[chapterId].resourceIds =
          state.chapters.byId[chapterId].resourceIds.filter(
            (id) => id !== resourceId
          );
      }
    },

    removeModule: (state, action: PayloadAction<{ moduleId: string }>) => {
      const { moduleId } = action.payload;

      const module = state.modules.byId[moduleId];
      if (!module) return;

      // Remove all chapters in the module
      const chapterIds = module.chapterIds;
      chapterIds.forEach((chapterId) => {
        // Remove resources in each chapter
        const resourceIds = state.chapters.byId[chapterId]?.resourceIds || [];
        resourceIds.forEach((resourceId) => {
          delete state.resources.byId[resourceId];
        });
        state.resources.allIds = state.resources.allIds.filter(
          (id) => !resourceIds.includes(id)
        );

        delete state.chapters.byId[chapterId];
      });
      state.chapters.allIds = state.chapters.allIds.filter(
        (id) => !chapterIds.includes(id)
      );

      // Remove assignments in the module
      const assignmentIds = module.assignmentIds || [];
      assignmentIds.forEach(id => {
        delete state.assignments.byId[id];
      });
      state.assignments.allIds = state.assignments.allIds.filter(id => !assignmentIds.includes(id));

      // Remove tests in the module
      const testIds = module.testIds || [];
      testIds.forEach(id => {
        delete state.tests.byId[id];
      });
      state.tests.allIds = state.tests.allIds.filter(id => !testIds.includes(id));

      delete state.modules.byId[moduleId];
      state.modules.allIds = state.modules.allIds.filter((id) => id !== moduleId);
    },

    removeChapter: (state, action: PayloadAction<{ chapterId: string }>) => {
      const { chapterId } = action.payload;
      const chapter = state.chapters.byId[chapterId];
      if (!chapter) return;

      const moduleId = chapter.moduleId;

      // Remove resources in the chapter
      const resourceIds = chapter.resourceIds;
      resourceIds.forEach((resourceId) => {
        delete state.resources.byId[resourceId];
      });
      state.resources.allIds = state.resources.allIds.filter(
        (id) => !resourceIds.includes(id)
      );

      delete state.chapters.byId[chapterId];
      state.chapters.allIds = state.chapters.allIds.filter((id) => id !== chapterId);

      if (state.modules.byId[moduleId]) {
        state.modules.byId[moduleId].chapterIds = state.modules.byId[moduleId].chapterIds.filter(
          (id) => id !== chapterId
        );
      }
    },
  },
});

/* ================= Exports ================= */

export const {
  addModule,
  addChapter,
  addResource,
  updateResource,
  removeResource,
  addAssignment,
  updateAssignment,
  removeAssignment,
  removeModule,
  removeChapter,
  updateChapter,
  addTest,
  removeTest
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
