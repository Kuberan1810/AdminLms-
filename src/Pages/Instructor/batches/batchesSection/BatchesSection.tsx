import { useMemo, useState, useEffect, useRef } from "react";
import { Plus, Trash2, Search, Download } from "lucide-react";
import { ArrowDown2, ArrowUp2, } from "iconsax-react"
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addModule, addChapter, removeModule, removeChapter, addAssignment, removeAssignment, addTest } from "../../../../store/slices/ResourcesSlice";
import BtnCom from "../../../../Components/Student/BtnCom";
import { Calendar } from "iconsax-react";

/* ================= Component ================= */

export default function ClassesContentSection() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const location = useLocation();
  const { batchName: paramBatchName } = useParams();

  const batchName = location.state?.batchName || paramBatchName || "Batch";
  const courseName = location.state?.courseName || "Course";


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
        description: "A quiz on AI fundamentals",
        fromTime: "10:00",
        toTime: "11:00",
        questions: [],
        totalMarks: 100,
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
        category: "assessment",
        description: "Assessment for deployment module",
        fromTime: "14:00",
        toTime: "16:00",
        questions: [],
        totalMarks: 100,
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
    type: "module" | "chapter" | null;
    moduleId?: string;
    chapterId?: string;
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
  const dateRef = useRef<HTMLInputElement>(null);

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





  const handleConfirmDelete = () => {
    if (!confirm) return;

    if (confirm.type === "module" && confirm.moduleId) {
      dispatch(removeModule({ moduleId: confirm.moduleId }));
      addActivity("Module deleted");
    } else if (confirm.type === "chapter" && confirm.chapterId) {
      dispatch(removeChapter({ chapterId: confirm.chapterId }));
      addActivity("Chapter deleted");
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

  const handleTestRedirect = (_testId: string) => {
    // navigate(`/instructor/batch-details/test-section/${testId}`);
    navigate(`/instructor/tests/results`);

  }

  /* ================= Helpers ================= */
  const downloadFile = (resource: any) => {
    if (!resource || !resource.url) return;
    const link = document.createElement("a");
    link.href = resource.url;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= UI ================= */

  return (
    <div className="  min-h-screen">
      {/* Header */}
      <div className="boxStyle flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            aria-label="Back to batches"
          >
            <ArrowLeft size={28} color="#626262" />
          </button> */}
          <div className="flex flex-col justify-center items-start">
            <h2 className="lg:text-2xl text-lg  font-semibold truncate text-[#333] dark:text-white ">{batchName}</h2>
            <p className="lg:text-lg text-base font-medium truncate text-[#808080] dark:text-gray-400 ">{courseName}</p>
          </div>
        </div>

        <BtnCom label="View Students" onClick={() => {
          navigate(`/instructor/students`)
        }} />

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {stats.map((s) => (
          <div key={s.label} className="boxStyle">
            <p className="text-base lg:text-xl text-[#333] dark:text-white font-medium">{s.label}</p>
            <h2 className={`lg:text-2xl text-xl  font-semibold mt-2 ${s.color ?? "dark:text-white"}`}>
              {s.value}
            </h2>
            <p className="text-sm lg:text-base  text-gray-400 dark:text-[#A3A3A3] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ================= Main Grid ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* ================= Curriculum ================= */}
        <div className="lg:col-span-2 boxStyle ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="font-semibold text-lg lg:text-xl text-[#333] dark:text-white">Curriculum</h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center bg-gray-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-xl flex-1 sm:flex-none border border-transparent dark:border-[#363636]">
                <Search size={14} className="dark:text-white" />
                <input
                  placeholder="Search module"
                  className="bg-transparent outline-none text-sm ml-2 w-full dark:text-white"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Add Module */}
              <button
                onClick={() => setShowModuleModal(true)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#363636] cursor-pointer"
              >
                <Plus size={18} className="dark:text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {filteredModules.map((m, index) => (
              <div key={m.id} className="border border-[#F2EEF4] rounded-xl">

                <div className="flex justify-between items-center px-4 py-5 bg-white dark:bg-[#1E1E1E] rounded-xl">
                  <div className="space-x-5">
                    <span className="text-sm lg:text-lg font-medium dark:text-white">
                      Module {index + 1}: {m.title}
                    </span>
                    <span className="bg-[#FFEDDE] dark:bg-[#3d271d] ml-3 text-[#F67300] dark:text-[#ff9d4d] text-xs lg:text-sm font-medium px-4 py-2 rounded-full">
                      {m.status}
                    </span>
                  </div>


                  <div className="flex gap-5">
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
                        <ArrowUp2 size={24}  color="#626262" />
                      ) : (
                        <ArrowDown2 size={24}  color="#626262" />
                      )}
                    </button>
                  </div>
                </div>

                {openModule === m.id && (
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm lg:text-base font-medium dark:text-white">Chapters:</span>
                      <button
                        onClick={() => setShowChapterModal(m.id)}
                        className="bg-gray-100 dark:bg-[#2A2A2A] p-2 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-[#363636]"
                      >
                        <Plus size={16} className="dark:text-white" />
                      </button>
                    </div>

                    {m.chapters.map((c) => (
                      <div key={c.id}>
                        <div
                          className="flex justify-between border border-[#F2EEF4] dark:border-[#363636] rounded-lg p-2.5 text-sm text-[#333] dark:text-gray-300"
                        >
                          <div onClick={() => {
                            const hasResources = chapters.byId[c.id].resourceIds.length > 0;
                            if (hasResources) {
                              navigate(`/instructor/batch-details/resource-info/${c.id}`);
                            } else {
                              openUpload(c.id);
                            }
                          }} className="cursor-pointer text-sm lg:text-base">{c.name}</div>
                          <div className="flex gap-5">
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
                                  <ArrowUp2 size={16}  color="#626262" />
                                ) : (
                                  <ArrowDown2 size={16}  color="#626262" />
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
                                <div key={resourceId} className="flex justify-between items-center text-sm border border-[#F2EEF4] p-2 rounded-lg">
                                  <span
                                    onClick={() => downloadFile(resource)}
                                    className="cursor-pointer hover:text-orange-600 hover:underline"
                                  >
                                    {resource.name}
                                  </span>
                                  <button
                                    onClick={() => downloadFile(resource)}
                                    className="text-gray-500 hover:text-orange-600 cursor-pointer"
                                  >
                                    <Download size={14} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Resources Section */}
                    {/* <div className="mt-5">
                      <h4 className="text-sm lg:text-base font-medium mb-3 ">Resources:</h4>
                      <div className="space-y-2">
                        {m.chapters.flatMap((chapter) =>
                          chapters.byId[chapter.id].resourceIds.map((resourceId) => {
                            const resource = resources.byId[resourceId];
                            return (
                              <div key={resourceId} className="flex justify-between items-center text-sm border border-[#F2EEF4] p-2 rounded-lg">
                                <span
                                  onClick={() => downloadFile(resource)}
                                  className="cursor-pointer hover:text-orange-600 hover:underline"
                                >
                                  {resource.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className=" text-sm lg:text-base ">
                                    ({chapters.byId[chapter.id].title})
                                  </span>
                                  <button
                                    onClick={() => downloadFile(resource)}
                                    className="text-gray-500 hover:text-orange-600 cursor-pointer"
                                  >
                                    <Download size={14} />
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
                    </div> */}

                    {/* Assignments Section */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm lg:text-base font-medium dark:text-white">Assignments:</h4>
                        <button
                          onClick={() => setShowAssignmentModal(m.id)}
                          className="bg-gray-100 dark:bg-[#2A2A2A] p-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#363636]"
                        >
                          <Plus size={14} className="dark:text-white" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {modulesState.byId[m.id].assignmentIds.map((assignmentId) => {
                          const assignment = assignments.byId[assignmentId];
                          return (
                            <div key={assignmentId} className="flex justify-between items-center text-sm border border-[#F2EEF4] dark:border-[#363636] p-2.5 rounded-lg">
                              <div
                                className="cursor-pointer flex-1"
                                onClick={() => navigate("/instructor/assignment-details", { state: { ...assignment, isEdit: true, moduleId: m.id } })}
                              >
                                <span className="text-sm lg:text-base dark:text-gray-300">{assignment.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400 dark:text-[#A3A3A3] text-sm">Due: {assignment.dueDate}</span>
                                <button
                                  onClick={() => dispatch(removeAssignment({ assignmentId }))}
                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
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
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm lg:text-base font-medium dark:text-white">Tests:</h4>
                        <button
                          onClick={() => setShowTestModal(m.id)}
                          className="bg-gray-100 dark:bg-[#2A2A2A] p-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#363636]"
                        >
                          <Plus size={14} className="dark:text-white" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {modulesState.byId[m.id].testIds.map((testId) => {
                          const test = tests.byId[testId];
                          return (
                            <div key={testId} className="flex justify-between items-center text-sm border border-[#F2EEF4] dark:border-[#363636] p-2.5 rounded-lg">
                              <div className="flex-1">
                                <span className=" cursor-pointer text-sm lg:text-base dark:text-gray-300" onClick={() => handleTestRedirect(testId)}>{test.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400 dark:text-[#A3A3A3] text-sm">Date: {test.date}</span>
                                {/* Delete button removed */}
                              </div>
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
        <div className="boxStyle h-fit">
          <h3 className="font-semibold text-lg lg:text-xl mb-5 text-[#333] dark:text-white">Recent activity</h3>

          {activities.map((text, i) => (
            <div
              key={i}
              className="flex justify-between items-center boxStyle mb-3 bg-[#fafafa]! dark:bg-[#202020]! border border-[#F2EEF4] dark:border-[#363636]"
            >
              <div className="flex flex-col">
                <span className="text-sm lg:text-base font-medium text-[#333] dark:text-white">{text}</span>
                <span className="text-sm lg:text-base text-[#808080] dark:text-gray-400">2 min ago</span>
              </div>

              <BtnCom label="Review" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= Add Module Modal ================= */}
      {showModuleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Module</h3>

            <input
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="Module title"
              className="border dark:border-[#363636] p-2 rounded w-full mb-4 dark:bg-[#2A2A2A] dark:text-white"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModuleModal(false)} className="cursor-pointer dark:text-gray-400">Cancel</button>
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
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Chapter</h3>

            <input
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="Chapter title"
              className="border dark:border-[#363636] p-2 rounded w-full mb-4 dark:bg-[#2A2A2A] dark:text-white"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowChapterModal(null)} className="cursor-pointer dark:text-gray-400">Cancel</button>
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
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Assignment</h3>

            <input
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Assignment name"
              className="border border-[#F2EEF4] dark:border-[#363636] p-2 rounded w-full mb-4 text-[#626262] dark:text-white dark:bg-[#2A2A2A]"
            />

            <div className="relative mb-4">
              <input
                ref={dateRef}
                type="date"
                value={assignmentDue}
                onChange={(e) => setAssignmentDue(e.target.value)}
                className="border border-[#F2EEF4] dark:border-[#363636] p-2 pr-10 rounded w-full text-[#626262] dark:text-white dark:bg-[#2A2A2A] appearance-none"
              />


              <Calendar
                size={18}
                color="#626262"
                onClick={() => dateRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626262] cursor-pointer hover:text-[#F67300]"
              />
            </div>

            <div className="flex justify-end gap-5">
              <button onClick={() => setShowAssignmentModal(null)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A2A2A] px-4 rounded-lg dark:text-gray-400">Cancel</button>
              <button
                onClick={handleAddAssignment}
                className="bg-[#F67300] hover:bg-[#fa943a] text-white px-5 py-1.5 rounded-lg cursor-pointer "
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
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Test</h3>

            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Test name"
              className="border border-[#F2EEF4] dark:border-[#363636] p-2 rounded w-full mb-4 text-[#626262] dark:text-white dark:bg-[#2A2A2A]"
            />

            <div className="relative mb-4">
              <input
                ref={dateRef}
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="border border-[#F2EEF4] dark:border-[#363636] p-2 pr-10 rounded w-full text-[#626262] dark:text-white dark:bg-[#2A2A2A] appearance-none "
              />

              <Calendar
                size={18}
                color="#626262"
                onClick={() => dateRef.current?.showPicker()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626262] cursor-pointer hover:text-[#F67300]"
              />
            </div>




            <div className="flex justify-end gap-5">
              <button onClick={() => setShowTestModal(null)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A2A2A] px-4 rounded-lg dark:text-gray-400">Cancel</button>
              <button
                onClick={handleAddTest}
                className="bg-[#F67300] hover:bg-[#fa943a] text-white px-5 py-1.5 rounded-lg cursor-pointer "
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
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Confirm Delete</h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {confirm.type === "module"
                ? "Delete this module and all its content?"
                : "Delete this chapter?"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="px-4 py-2 border border-[#F2EEF4] dark:border-[#363636] rounded-lg cursor-pointer dark:text-gray-400"
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
