import { createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
/* ================= Types ================= */

export type Resource = {
  id: string;
  name: string;
  url: string;
};

export type Assignment = {
  id: string;
  name: string;
  due: string;
  moduleId: string;
};

export type Test = {
  id: string;
  name: string;
  date: string;
  moduleId: string;
};

export type Chapter = {
  id: string;
  title: string;
  moduleId: string;
  resourceIds: string[];
};

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
  };
};

/* ================= Initial ================= */

const initialState: ResourcesState = {
  modules: { byId: {}, allIds: [] },
  chapters: { byId: {}, allIds: [] },
  resources: { byId: {}, allIds: [] },
  assignments: { byId: {}, allIds: [] },
  tests: { byId: {}, allIds: [] },
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
      }>
    ) => {
      const { id, title, moduleId } = action.payload;

      state.chapters.byId[id] = {
        id,
        title,
        moduleId,
        resourceIds: [],
      };

      state.chapters.allIds.push(id);

      state.modules.byId[moduleId].chapterIds.push(id);
    },

    /* ---------- Resource ---------- */
    addResource: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        url: string;
        chapterId: string;
      }>
    ) => {
      const { id, name, url, chapterId } = action.payload;

      state.resources.byId[id] = { id, name, url };
      state.resources.allIds.push(id);

      state.chapters.byId[chapterId].resourceIds.push(id);
    },

    removeResource: (
      state,
      action: PayloadAction<{ resourceId: string; chapterId: string }>
    ) => {
      const { resourceId, chapterId } = action.payload;

      delete state.resources.byId[resourceId];

      state.chapters.byId[chapterId].resourceIds =
        state.chapters.byId[chapterId].resourceIds.filter(
          (id) => id !== resourceId
        );
    },

    removeModule: (state, action: PayloadAction<{ moduleId: string }>) => {
      const { moduleId } = action.payload;

      // Remove all chapters in the module
      const chapterIds = state.modules.byId[moduleId].chapterIds;
      chapterIds.forEach((chapterId) => {
        // Remove resources in each chapter
        const resourceIds = state.chapters.byId[chapterId].resourceIds;
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

      // Remove all assignments in the module
      const assignmentIds = state.modules.byId[moduleId].assignmentIds;
      assignmentIds.forEach((assignmentId) => {
        delete state.assignments.byId[assignmentId];
      });
      state.assignments.allIds = state.assignments.allIds.filter(
        (id) => !assignmentIds.includes(id)
      );

      // Remove all tests in the module
      const testIds = state.modules.byId[moduleId].testIds;
      testIds.forEach((testId) => {
        delete state.tests.byId[testId];
      });
      state.tests.allIds = state.tests.allIds.filter(
        (id) => !testIds.includes(id)
      );

      delete state.modules.byId[moduleId];
      state.modules.allIds = state.modules.allIds.filter((id) => id !== moduleId);
    },

    removeChapter: (state, action: PayloadAction<{ chapterId: string }>) => {
      const { chapterId } = action.payload;

      const moduleId = state.chapters.byId[chapterId].moduleId;

      // Remove resources in the chapter
      const resourceIds = state.chapters.byId[chapterId].resourceIds;
      resourceIds.forEach((resourceId) => {
        delete state.resources.byId[resourceId];
      });
      state.resources.allIds = state.resources.allIds.filter(
        (id) => !resourceIds.includes(id)
      );

      delete state.chapters.byId[chapterId];
      state.chapters.allIds = state.chapters.allIds.filter((id) => id !== chapterId);

      state.modules.byId[moduleId].chapterIds = state.modules.byId[moduleId].chapterIds.filter(
        (id) => id !== chapterId
      );
    },

    /* ---------- Assignment ---------- */
    addAssignment: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        due: string;
        moduleId: string;
      }>
    ) => {
      const { id, name, due, moduleId } = action.payload;

      state.assignments.byId[id] = { id, name, due, moduleId };
      state.assignments.allIds.push(id);

      state.modules.byId[moduleId].assignmentIds.push(id);
    },

    removeAssignment: (
      state,
      action: PayloadAction<{ assignmentId: string }>
    ) => {
      const { assignmentId } = action.payload;

      const moduleId = state.assignments.byId[assignmentId].moduleId;

      delete state.assignments.byId[assignmentId];
      state.assignments.allIds = state.assignments.allIds.filter(
        (id) => id !== assignmentId
      );

      state.modules.byId[moduleId].assignmentIds = state.modules.byId[moduleId].assignmentIds.filter(
        (id) => id !== assignmentId
      );
    },

    /* ---------- Test ---------- */
    addTest: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        date: string;
        moduleId: string;
      }>
    ) => {
      const { id, name, date, moduleId } = action.payload;

      state.tests.byId[id] = { id, name, date, moduleId };
      state.tests.allIds.push(id);

      state.modules.byId[moduleId].testIds.push(id);
    },

    removeTest: (
      state,
      action: PayloadAction<{ testId: string }>
    ) => {
      const { testId } = action.payload;

      const moduleId = state.tests.byId[testId].moduleId;

      delete state.tests.byId[testId];
      state.tests.allIds = state.tests.allIds.filter(
        (id) => id !== testId
      );

      state.modules.byId[moduleId].testIds = state.modules.byId[moduleId].testIds.filter(
        (id) => id !== testId
      );
    },
  },
});

/* ================= Exports ================= */

export const {
  addModule,
  addChapter,
  addResource,
  removeResource,
  removeModule,
  removeChapter,
  addAssignment,
  removeAssignment,
  addTest,
  removeTest,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
