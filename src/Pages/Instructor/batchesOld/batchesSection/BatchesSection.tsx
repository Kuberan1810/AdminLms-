import { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  // Download,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useNavigate, useLocation, useParams } from "react-router-dom"; 
import { addModule, addChapter, removeModule, removeChapter, removeResource, addAssignment, removeAssignment, addTest, removeTest } from "../../../../store/slices/ResourcesSlice";
import BtnCom from "../../../../Components/Student/BtnCom";

/* ================= Types ================= */

/*
type Chapter = { id: string; name: string };
type Assignment = { id: string; name: string; due: string };
type Test = { id: string; name: string; date: string };
*/

/*
type ModuleType = {
  id: string;
  title: string;
  status: "Completed" | "Ongoing";
  chapters: Chapter[];
  resources: string[];
  assignments: Assignment[];
  tests: Test[];
};
*/



/* ================= Component ================= */

export default function ClassesContentSection() {
  
  const navigate = useNavigate();
  const location = useLocation();           
  const params = useParams();   

  const batch =
    (location.state as any)?.batchName || params.batchId || "Batch";



  const dispatch = useAppDispatch();
  // const batchName = useAppSelector((state) => state.batch.name);

  const { modules: modulesState, chapters, resources, assignments, tests } = useAppSelector((state) => state.resource);

  /* ================= Stats ================= */

  const [stats] = useState([
    {
      label: "Attendance Rate",
      value: "87%",
      sub: "Avg over last 30days",
      color: "text-[#F67300]",
    },
    { label: "Total Classes", value: "26", sub: "81% classes completed" },
    { label: "Total Students", value: "32", sub: "Enrolled active students" },
    { label: "Average Score", value: "78/100", sub: "Last assessment" },
  ]);

  /* ================= Initialize Redux State ================= */

  useEffect(() => {
    if (modulesState.allIds.length === 0) {
      const moduleId = crypto.randomUUID();
      dispatch(addModule({ id: moduleId, title: "Frontier AI Systems & Deployment" }));

      const chapter1Id = crypto.randomUUID();
      dispatch(addChapter({ id: chapter1Id, title: "AI Agents (LangChain, CrewAI, AutoGen)", moduleId }));

      const chapter2Id = crypto.randomUUID();
      dispatch(addChapter({ id: chapter2Id, title: "Deployment Basics", moduleId }));

      // Add mock test data for the first module
      const test1Id = crypto.randomUUID();
      dispatch(addTest({
        id: test1Id,
        name: "AI Fundamentals Quiz",
        date: "2024-01-15",
        moduleId,
        course: "Am101",
        batch: "Batch-01",
        category: "quiz",
        description: "",
        fromTime: "09:00",
        toTime: "10:00",
        questions: [],
        totalMarks: 0,
        createdAt: new Date().toISOString()
      }));

      const test2Id = crypto.randomUUID();
      dispatch(addTest({
        id: test2Id,
        name: "Deployment Assessment",
        date: "2024-01-20",
        moduleId,
        course: "Am101",
        batch: "Batch-01",
        category: "quiz",
        description: "",
        fromTime: "09:00",
        toTime: "10:00",
        questions: [],
        totalMarks: 0,
        createdAt: new Date().toISOString()
      }));
    }
  }, [dispatch, modulesState.allIds.length]);

  /* ================= Computed Modules ================= */

  const modules = useMemo(() => {
    return modulesState.allIds.map((moduleId, moduleIndex) => {
      const module = modulesState.byId[moduleId];
      const moduleChapters = module.chapterIds.map((chapterId, chapterIndex) => ({
        id: chapterId,
        name: `Chapter ${moduleIndex + 1}.${chapterIndex + 1} - ${chapters.byId[chapterId].title}`,
      }));
      return {
        id: moduleId,
        title: module.title,
        status: "Ongoing" as const,
        chapters: moduleChapters,
        resources: [], // Not used in UI
        assignments: [], // Keep local or empty
        tests: [], // Keep local or empty
      };
    });
  }, [modulesState, chapters]);

  const [openModule, setOpenModule] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /* ================= Confirm Modal ================= */

  const [confirm, setConfirm] = useState<{
    type: "module" | "chapter" | "resource" | "test" | null;
    moduleId?: string;
    chapterId?: string;
    resourceId?: string;
    testId?: string;
  } | null>(null);

  /* ================= NEW: Add Modals ================= */

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState<string | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState<string | null>(null);
  const [showTestModal, setShowTestModal] = useState<string | null>(null);

  const [moduleTitle, setModuleTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDue, setAssignmentDue] = useState("");
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");

  /* ================= Activity ================= */

  const [activities, setActivities] = useState<string[]>([
    "Alex Johnson submitted assignment",
    "Swetha submitted assignment",
    "Course content pdf uploaded",
  ]);

  const addActivity = (text: string) =>
    setActivities((prev) => [text, ...prev]);

  /* ================= Actions ================= */

  /* ---- Add Module (modal) ---- */
  const handleAddModule = () => {
    if (!moduleTitle.trim()) return;

    const id = crypto.randomUUID();
    dispatch(addModule({ id, title: moduleTitle }));

    addActivity(`New module "${moduleTitle}" added`);
    setModuleTitle("");
    setShowModuleModal(false);
  };

  /* ---- Add Chapter (modal) ---- */
  const handleAddChapter = () => {
    if (!chapterTitle.trim() || !showChapterModal) return;

    const id = crypto.randomUUID();
    dispatch(addChapter({ id, title: chapterTitle, moduleId: showChapterModal }));

    addActivity(`New chapter "${chapterTitle}" added`);
    setChapterTitle("");
    setShowChapterModal(null);
  };

  /* ---- Add Assignment (modal) ---- */
  const handleAddAssignment = () => {
    if (!assignmentName.trim() || !assignmentDue.trim() || !showAssignmentModal) return;

    const id = crypto.randomUUID();
    dispatch(addAssignment({
      id,
      title: assignmentName,
      dueDate: assignmentDue,
      dueTime: "23:59",
      moduleId: showAssignmentModal,
      description: "",
      objective: "",
      outcome: "",
      resources: [],
      batch: "Batch-01",
      course: "Am101"
    }));

    addActivity(`New assignment "${assignmentName}" added`);
    setAssignmentName("");
    setAssignmentDue("");
    setShowAssignmentModal(null);
  };

  /* ---- Add Test (modal) ---- */
  const handleAddTest = () => {
    if (!testName.trim() || !testDate.trim() || !showTestModal) return;

    const id = crypto.randomUUID();
    dispatch(addTest({
      id,
      name: testName,
      date: testDate,
      moduleId: showTestModal,
      course: "Am101",
      batch: "Batch-01",
      category: "quiz",
      description: "",
      fromTime: "09:00",
      toTime: "10:00",
      questions: [],
      totalMarks: 0,
      createdAt: new Date().toISOString()
    }));

    addActivity(`New test "${testName}" added`);
    setTestName("");
    setTestDate("");
    setShowTestModal(null);
  };

  /* ---- Delete ---- */

  const confirmDeleteModule = (mId: string) =>
    setConfirm({ type: "module", moduleId: mId });

  const confirmDeleteChapter = (mId: string, cId: string) =>
    setConfirm({ type: "chapter", moduleId: mId, chapterId: cId });

  const confirmDeleteResource = (rId: string, cId: string) =>
    setConfirm({ type: "resource", resourceId: rId, chapterId: cId });

  const confirmDeleteTest = (tId: string) =>
    setConfirm({ type: "test", testId: tId });

  const handleConfirmDelete = () => {
    if (!confirm) return;

    if (confirm.type === "module" && confirm.moduleId) {
      dispatch(removeModule({ moduleId: confirm.moduleId }));
      addActivity("Module deleted");
    } else if (confirm.type === "chapter" && confirm.chapterId) {
      dispatch(removeChapter({ chapterId: confirm.chapterId }));
      addActivity("Chapter deleted");
    } else if (confirm.type === "resource" && confirm.resourceId && confirm.chapterId) {
      dispatch(removeResource({ resourceId: confirm.resourceId, chapterId: confirm.chapterId }));
      addActivity("Resource deleted");
    } else if (confirm.type === "test" && confirm.testId) {
      dispatch(removeTest({ testId: confirm.testId }));
      addActivity("Test deleted");
    }

    setConfirm(null);
  };

  /* ================= Filter ================= */

  const filteredModules = useMemo(
    () =>
      modules.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      ),
    [modules, search]
  );

  const openUpload = (chapterId: string) => {
    navigate(`/instructor/batch-details/upload-resources/${chapterId}`);
  }

  const [openedChapter, setOpenedChapter] = useState<string | null>(null);

  const handleTestRedirect = (testId: string) => {
    navigate(`/instructor/batch-details/test-section/${testId}`);
  }

  /* ================= UI ================= */

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white py-4 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            aria-label="Back to batches"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-lg font-semibold truncate max-w-[70vw] sm:max-w-none">
            {/* {item.batch} */}
          </h2>
          <p className="text-lg font-semibold truncate max-w-[70vw] sm:max-w-none">
            {/* {item.title} */}
          </p>

        </div>

        <BtnCom
          label="View Students"
          onClick={() => navigate(`/instructor/students?batch=${batch}`)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <h2 className={`text-2xl font-semibold mt-1 ${s.color ?? ""}`}>
              {s.value}
            </h2>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ================= Main Grid ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* ================= Curriculum ================= */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="font-semibold text-lg">Curriculum</h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl flex-1 sm:flex-none">
                <Search size={14} />
                <input
                  placeholder="Search module"
                  className="bg-transparent outline-none text-sm ml-2 w-full"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Add Module */}
              <button
                onClick={() => setShowModuleModal(true)}
                className="p-2 rounded-xl bg-gray-100 cursor-pointer"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredModules.map((m, index) => (
              <div key={m.id} className="border border-[#D3D3D3] rounded-xl">
                <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-sm font-medium">
                      Module {index + 1} • {m.title}
                    </span>
                    <span className="bg-[#FFEDDE] ml-3 text-[#F67300] text-xs font-medium px-2 py-1 rounded-xl">
                      {m.status}
                    </span>
                  </div>


                  <div className="flex gap-2">
                    <button onClick={() => confirmDeleteModule(m.id)}>
                      <Trash2 size={16} className="text-red-500 cursor-pointer" />
                    </button>

                    <button
                      onClick={() =>
                        setOpenModule(openModule === m.id ? null : m.id)
                      }
                      className="cursor-pointer"
                    >
                      {openModule === m.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {openModule === m.id && (
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Chapters:</span>
                      <button
                        onClick={() => setShowChapterModal(m.id)}
                        className="bg-gray-100 p-2 rounded-xl cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {m.chapters.map((c) => (
                      <div key={c.id}>
                        <div
                          className="flex justify-between border border-[#D3D3D3] rounded-lg p-2 text-sm"
                        >
                          <div onClick={() => {
                            const hasResources = chapters.byId[c.id].resourceIds.length > 0;
                            if (hasResources) {
                              navigate(`/instructor/batch-details/resource-info/${c.id}`);
                            } else {
                              openUpload(c.id);
                            }
                          }} className="cursor-pointer">{c.name}</div>
                          <div className="flex gap-3">
                            <Trash2
                              size={14}
                              className="cursor-pointer text-red-500"
                              onClick={() => confirmDeleteChapter(m.id, c.id)}
                            />
                            <div onClick={() => {
                              setOpenedChapter(openedChapter === c.id ? null : c.id)
                            }} className="cursor-pointer">
                              {
                                openedChapter === c.id ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )
                              }
                            </div>
                          </div>
                        </div>
                        {openedChapter === c.id && (
                          <div className="ml-4 mt-2 space-y-1">
                            {chapters.byId[c.id].resourceIds.map((resourceId) => {
                              const resource = resources.byId[resourceId];
                              return (
                                <div key={resourceId} className="flex justify-between items-center text-xs text-gray-600 bg-gray-100 p-2 rounded">
                                  <span>{resource.name}</span>
                                  <button
                                    onClick={() => confirmDeleteResource(resourceId, c.id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Resources Section */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Resources:</h4>
                      <div className="space-y-2">
                        {m.chapters.flatMap((chapter) =>
                          chapters.byId[chapter.id].resourceIds.map((resourceId) => {
                            const resource = resources.byId[resourceId];
                            return (
                              <div key={resourceId} className="flex justify-between items-center text-xs text-gray-600 bg-gray-100 p-2 rounded">
                                <span>{resource.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">
                                    ({chapters.byId[chapter.id].title})
                                  </span>
                                  <button
                                    onClick={() => confirmDeleteResource(resourceId, chapter.id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                        {m.chapters.flatMap((chapter) => chapters.byId[chapter.id].resourceIds).length === 0 && (
                          <p className="text-xs text-gray-400 italic">No resources uploaded yet</p>
                        )}
                      </div>
                    </div>

                    {/* Assignments Section */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Assignments:</h4>
                        <button
                          onClick={() => setShowAssignmentModal(m.id)}
                          className="bg-gray-100 p-1 rounded cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {modulesState.byId[m.id].assignmentIds.map((assignmentId) => {
                          const assignment = assignments.byId[assignmentId];
                          return (
                            <div key={assignmentId} className="flex justify-between items-center text-xs text-gray-600 bg-gray-100 p-2 rounded">
                              <div>
                                <span className="font-medium">{assignment.title}</span>
                                <span className="text-gray-400 ml-2">Due: {assignment.dueDate}</span>
                              </div>
                              <button
                                onClick={() => dispatch(removeAssignment({ assignmentId }))}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                        {modulesState.byId[m.id].assignmentIds.length === 0 && (
                          <p className="text-xs text-gray-400 italic">No assignments created yet</p>
                        )}
                      </div>
                    </div>

                    {/* Tests Section */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Tests:</h4>
                        <button
                          onClick={() => setShowTestModal(m.id)}
                          className="bg-gray-100 p-1 rounded cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {modulesState.byId[m.id].testIds.map((testId) => {
                          const test = tests.byId[testId];
                          return (
                            <div key={testId} className="flex justify-between items-center text-xs text-gray-600 bg-gray-100 p-2 rounded">
                              <div>
                                <span className="font-medium cursor-pointer" onClick={() => handleTestRedirect(testId)}>{test.name}</span>
                                <span className="text-gray-400 ml-2">Date: {test.date}</span>
                              </div>
                              <button
                                onClick={() => confirmDeleteTest(testId)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                        {modulesState.byId[m.id].testIds.length === 0 && (
                          <p className="text-xs text-gray-400 italic">No tests created yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= Recent Activity (UNCHANGED) ================= */}
        <div className="bg-white rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Recent activity</h3>

          {activities.map((text, i) => (
            <div
              key={i}
              className="flex justify-between items-center border border-[#D3D3D3] rounded-xl p-3 mb-3"
            >
              <span className="text-sm">{text}</span>
              <button className="border border-[#D3D3D3] px-3 py-1 rounded-lg text-sm cursor-pointer">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Add Module Modal ================= */}
      {showModuleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Module</h3>

            <input
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="Module title"
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModuleModal(false)} className="cursor-pointer">Cancel</button>
              <button
                onClick={handleAddModule}
                className="bg-[#F67300] text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Add Chapter Modal ================= */}
      {showChapterModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Chapter</h3>

            <input
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="Chapter title"
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowChapterModal(null)} className="cursor-pointer">Cancel</button>
              <button
                onClick={handleAddChapter}
                className="bg-[#F67300] text-white px-4 py-2 rounded cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Add Assignment Modal ================= */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Assignment</h3>

            <input
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Assignment name"
              className="border p-2 rounded w-full mb-4"
            />

            <input
              type="date"
              value={assignmentDue}
              onChange={(e) => setAssignmentDue(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAssignmentModal(null)} className="cursor-pointer">Cancel</button>
              <button
                onClick={handleAddAssignment}
                className="bg-[#F67300] text-white px-4 py-2 rounded cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Add Test Modal ================= */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Test</h3>

            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Test name"
              className="border p-2 rounded w-full mb-4"
            />

            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowTestModal(null)} className="cursor-pointer">Cancel</button>
              <button
                onClick={handleAddTest}
                className="bg-[#F67300] text-white px-4 py-2 rounded cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Confirm Delete Modal (UNCHANGED) ================= */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>

            <p className="text-sm text-gray-500 mb-6">
              {confirm.type === "module"
                ? "Delete this module and all its content?"
                : confirm.type === "chapter"
                  ? "Delete this chapter?"
                  : confirm.type === "resource"
                    ? "Delete this resource?"
                    : "Delete this test?"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="px-4 py-2 border border-[#D3D3D3] rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
