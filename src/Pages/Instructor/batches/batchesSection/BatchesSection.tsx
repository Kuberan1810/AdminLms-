import { useMemo, useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Download,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  X
} from "lucide-react";
import { Calendar } from "iconsax-react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addModule, addChapter, removeModule, removeChapter, addAssignment, addTest } from "../../../../store/slices/ResourcesSlice";
import BtnCom from "../../../../Components/Student/BtnCom";
import { useInstructorAssignments, useInstructorModules, useBatchOverview } from "../../../../hooks/useAssignments";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { deleteAssignment } from "../../../../services/assignmentService";
import { listTests } from "../../../../services/testService";
import { capitalizeWords } from "../../../../utils/capitalize";
import type { TestListItem } from "../../../../services/testService";
import AddTestModal from "./AddTestmodal";

/* ================= Skeletons ================= */

const ModuleCardSkeleton = () => (
  <div className="bg-white dark:bg-[#1E1E1E] rounded-[24px] p-6 border border-gray-100 dark:border-[#333] mb-4 animate-pulse">
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <div className="h-6 bg-gray-100 dark:bg-[#333] rounded-md w-[200px]"></div>
        <div className="h-6 w-16 bg-orange-50 dark:bg-[#F673001A] rounded-full"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 dark:bg-[#333] rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-100 dark:bg-[#333] rounded-lg"></div>
      </div>
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <div className="boxStyle animate-pulse min-h-[140px] flex flex-col justify-center">
    <div className="h-5 bg-gray-100 dark:bg-[#333] rounded-md w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-100 dark:bg-[#333] rounded-md w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-100 dark:bg-[#333] rounded-md w-2/3"></div>
  </div>
);

/* ================= Component ================= */

export default function ClassesContentSection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { batchName: paramBatchName } = useParams();

  const batchName = location.state?.batchName || paramBatchName || "Batch";
  const courseName = location.state?.courseName || "Course";


  const { modules: modulesState, chapters, resources, assignments: reduxAssignments, tests } = useAppSelector((state) => state.resource);

  // API Data
  const courseId = location.state?.courseId || 1; // Default to 1 if not found
  // Normalize batch name for API (e.g., "Batch A" -> "Batch-A")
  const apiBatchName = batchName.replace(/\s+/g, "-");

  const { data: apiModules, isLoading: loadingModules } = useInstructorModules(courseId, apiBatchName);
  const { data: apiAssignments, isLoading: loadingAssignments } = useInstructorAssignments(courseId, apiBatchName);
  const { data: batchOverview, isLoading: loadingOverview } = useBatchOverview(courseId, apiBatchName);

  /* ================= Stats ================= */

  const stats = useMemo(() => [
    {
      label: "Attendance Rate",
      value: batchOverview?.attendance_rate !== undefined && batchOverview?.attendance_rate !== null
        ? (typeof batchOverview.attendance_rate === 'number'
          ? `${batchOverview.attendance_rate}%`
          : batchOverview.attendance_rate)
        : "0%",
      sub: batchOverview
        ? `Avg over last ${batchOverview.attendance_window_days} days`
        : "Avg over last 30 days",
      color: "text-[#F67300]",
    },
    {
      label: "Total Classes",
      value: batchOverview ? `${batchOverview.classes_completed}/${batchOverview.classes_total}` : "0/0",
      sub: batchOverview
        ? `${Math.round(batchOverview.classes_completion_percent)}% classes completed`
        : "0% classes completed"
    },
    {
      label: "Total Students",
      value: String(batchOverview?.total_students || "0"),
      sub: "Enrolled active students"
    },
    {
      label: "Average Score",
      value: batchOverview ? `${batchOverview.average_score ?? 0}/${batchOverview.average_score_max}` : "0/100",
      sub: "Last assessment"
    },
  ], [batchOverview]);

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

  /* ================= API Tests State (must be before useMemo) ================= */

  const [apiTests, setApiTests] = useState<TestListItem[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await listTests(courseId, apiBatchName);
        setApiTests(data);
      } catch (e) {
        // silently ignore if endpoint doesn't exist yet
      }
    };
    fetchTests();
  }, [courseId, apiBatchName]);

  /* ================= Computed Modules ================= */

  const modules = useMemo(() => {
    if (apiModules) {
      return apiModules.map((m, index) => {
        // Group assignments for this module
        const moduleAssignments = (apiAssignments || []).filter(
          (a) => a.module_name === m.module_name
        );

        // Group API tests for this module
        const moduleTests = apiTests.filter(t => t.module_name === m.module_name);

        return {
          id: String(m.module_id),
          title: m.module_name,
          status: "Ongoing" as const,
          chapters: (modulesState.byId[m.module_id] || modulesState.byId[String(m.module_id)])?.chapterIds.map((chapterId, chapterIndex) => ({
            id: chapterId,
            name: `Chapter ${index + 1}.${chapterIndex + 1} - ${chapters.byId[chapterId].title}`,
          })) || [],
          resources: [],
          assignments: moduleAssignments.map(a => ({
            id: String(a.id),
            title: a.title,
            dueDate: a.due_date ? format(new Date(a.due_date), "MMM d, hh:mm a") : "No deadline",
            description: a.description,
            objective: "",
            outcome: a.expected_outcome,
            resources: a.resources.map(r => r.file_name)
          })),
          tests: moduleTests.length > 0
            ? moduleTests.map(t => ({
              id: String(t.id),
              name: t.title,
              date: t.start_time ? format(new Date(t.start_time), "MMM d, hh:mm a") : "No date"
            }))
            : (modulesState.byId[m.module_id] || modulesState.byId[String(m.module_id)])?.testIds.map((testId) => {
              const test = tests.byId[testId];
              return { id: testId, name: test.name, date: test.date };
            }) || [],
        };
      });
    }

    // Fallback to Redux mock if API fails/loading (or just show empty)
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
        resources: [],
        assignments: module.assignmentIds.map(id => {
          const a = reduxAssignments.byId[id];
          return {
            id: a.id,
            title: a.title,
            dueDate: a.dueDate,
            description: a.description,
            objective: a.objective,
            outcome: a.outcome,
            resources: a.resources
          };
        }),
        tests: [],
      };
    });
  }, [apiModules, apiAssignments, apiTests, modulesState, chapters, reduxAssignments, tests]);

  const [openModule, setOpenModule] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /* ================= Toast ================= */

  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  /* ================= Deletion State ================= */

  const [isDeleting, setIsDeleting] = useState(false);

  /* ================= Confirm Modal ================= */

  const [confirm, setConfirm] = useState<{
    type: "module" | "chapter" | "assignment" | null;
    moduleId?: string;
    chapterId?: string;
    assignmentId?: string;
    label?: string;
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
  const dateRef = useRef<HTMLInputElement>(null);


  /* ================= Activity ================= */

  const initialActivities = [
    "Alex Johnson submitted assignment",
    "Swetha submitted assignment",
    "Course content pdf uploaded",
  ];

  const [activities, setActivities] = useState<string[]>(initialActivities);

  useEffect(() => {
    if (batchOverview?.activities && batchOverview.activities.length > 0) {
      setActivities(batchOverview.activities);
    }
  }, [batchOverview]);

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
    queryClient.invalidateQueries({ queryKey: ["instructor-modules"] });
    queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
  };

  /* ---- Add Chapter (modal) ---- */
  const handleAddChapter = () => {
    if (!chapterTitle.trim() || !showChapterModal) return;

    const id = crypto.randomUUID();
    dispatch(addChapter({ id, title: chapterTitle, moduleId: showChapterModal }));

    addActivity(`New chapter "${chapterTitle}" added`);
    setChapterTitle("");
    setShowChapterModal(null);
    queryClient.invalidateQueries({ queryKey: ["instructor-modules"] });
    queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
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
    queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
    queryClient.invalidateQueries({ queryKey: ["instructor-modules"] });
  };

  const handleAddTest = (data: { name: string; date: Date | null }) => {
    if (!showTestModal) return;
    const moduleId = showTestModal;

    // Find module title
    const moduleObj = filteredModules.find(m => m.id === moduleId);
    const moduleTitle = moduleObj ? moduleObj.title : "";

    navigate("/instructor/create-test", {
      state: {
        name: data.name,
        date: data.date ? data.date.toISOString() : new Date().toISOString(),
        courseId,
        course: courseName,
        batch: batchName,
        module: moduleTitle,
        moduleId: moduleId
      }
    });

    setShowTestModal(null);
  };

  /* ---- Delete ---- */

  const confirmDeleteModule = (mId: string) =>
    setConfirm({ type: "module", moduleId: mId });

  const confirmDeleteChapter = (mId: string, cId: string) =>
    setConfirm({ type: "chapter", moduleId: mId, chapterId: cId });





  const handleConfirmDelete = async () => {
    if (!confirm) return;
    const label = confirm.label || "Item";
    setConfirm(null);

    if (confirm.type === "module" && confirm.moduleId) {
      dispatch(removeModule({ moduleId: confirm.moduleId }));
      addActivity("Module deleted");
      showToast("Module deleted successfully");
    } else if (confirm.type === "chapter" && confirm.chapterId) {
      dispatch(removeChapter({ chapterId: confirm.chapterId }));
      addActivity("Chapter deleted");
      showToast("Chapter deleted successfully");
    } else if (confirm.type === "assignment" && confirm.assignmentId) {
      setIsDeleting(true);
      try {
        await deleteAssignment(confirm.assignmentId);
        queryClient.invalidateQueries({ queryKey: ["instructor-assignments"] });
        addActivity(`Assignment "${label}" deleted`);
        showToast(`Assignment "${label}" deleted successfully`);
      } catch (error) {
        console.error("Failed to delete assignment:", error);
        showToast("Failed to delete assignment. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDeleteAssignment = (assignmentId: string, title: string) => {
    setConfirm({ type: "assignment", assignmentId, label: title });
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
            <h2 className="lg:text-2xl text-lg font-semibold truncate text-[#333] dark:text-white ">
              {batchOverview?.batch_name || batchName}
            </h2>
            <p className="lg:text-lg text-base font-medium truncate text-[#808080] dark:text-gray-400 ">
              {batchOverview?.course_title || courseName}
            </p>
          </div>
        </div>

        <BtnCom label="View Students" onClick={() => {
          navigate(`/instructor/students`)
        }} />

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {loadingOverview ? (
          [1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)
        ) : (
          stats.map((s) => (
            <div key={s.label} className="boxStyle">
              <p className="text-base lg:text-xl text-[#333] dark:text-white font-medium">{s.label}</p>
              <h2 className={`lg:text-2xl text-xl  font-semibold mt-2 ${s.color ?? "dark:text-white"}`}>
                {s.value}
              </h2>
              <p className="text-sm lg:text-base  text-gray-400 dark:text-[#A3A3A3] mt-1">{s.sub}</p>
            </div>
          ))
        )}
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

          <div className="space-y-4">
            {loadingModules || loadingAssignments ? (
              <div className="space-y-4 px-2">
                {[1, 2, 3].map((i) => <ModuleCardSkeleton key={i} />)}
              </div>
            ) : filteredModules.length === 0 ? (
              <div className="text-center py-20 text-gray-400 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#F2EEF4] dark:border-[#333]">
                No items found in this category
              </div>
            ) : (
              filteredModules.map((m, mIndex) => (
                <div key={m.id} className="border border-[#F2EEF4] dark:border-[#363636] rounded-xl overflow-hidden bg-white dark:bg-[#1E1E1E]">
                  {/* Module Header */}
                  <div className="flex justify-between items-center px-4 py-[18px]">
                    <div className="flex items-center gap-3">
                      <span className="text-[18px] font-medium text-[#333] dark:text-white">
                        Module {mIndex + 1}: {m.title}
                      </span>
                      <span className="bg-[#FFF5ED] text-[#F67300] text-[11px] font-medium px-3 py-0.5 rounded-full">
                        Ongoing
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => confirmDeleteModule(m.id)}
                        className="text-[#f32d2d] hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer hover:text-red-600 dark:hover:bg-red-800/30 "
                      >
                        <Trash2 size={18} />
                      </button>

                      <button
                        onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                        className="cursor-pointer text-[#626262] dark:text-gray-400 hover:opacity-80 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] p-2 rounded-lg transition-colors"
                      >
                        {openModule === m.id ? (
                          <ChevronUp size={24} />
                        ) : (
                          <ChevronDown size={24} />
                        )}
                      </button>
                    </div>
                  </div>

                  {openModule === m.id && (
                    <div className="px-4 pb-4 space-y-6">
                      {/* Chapters Section */}
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-base font-semibold text-[#333] dark:text-white">Chapters:</h4>
                          <button
                            onClick={() => setShowChapterModal(m.id)}
                            className="bg-[#fafafa] dark:bg-[#2A2A2A] p-2 rounded-xl border border-[#F2EEF4] dark:border-[#363636] cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} className="text-[#333] dark:text-white hover:text-black" />
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {m.chapters.map((c, cIndex) => (
                            <div key={c.id}>
                              <div className="flex justify-between items-center border border-[#F2EEF4] dark:border-[#363636] rounded-xl px-4 py-3 text-sm bg-white dark:bg-[#1E1E1E]">
                                <div
                                  onClick={() => {
                                    const hasResources = chapters.byId[c.id].resourceIds.length > 0;
                                    if (hasResources) {
                                      navigate(`/instructor/batch-details/resource-info/${c.id}`);
                                    } else {
                                      openUpload(c.id);
                                    }
                                  }}
                                  className="cursor-pointer text-[#4D4D4D] dark:text-gray-300 flex-1 font-normal"
                                >
                                  Chapter {mIndex + 1}.{cIndex + 1} - {c.name}
                                </div>
                                <div className="flex items-center gap-4">
                                  <button onClick={() => confirmDeleteChapter(m.id, c.id)} className="text-[#f32d2d] hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer hover:text-red-600 dark:hover:bg-red-800/30 ">
                                    <Trash2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => setOpenedChapter(openedChapter === c.id ? null : c.id)}
                                    className="cursor-pointer text-[#626262] hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    {openedChapter === c.id ? (
                                      <ChevronUp size={20} />
                                    ) : (
                                      <ChevronDown size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {openedChapter === c.id && (
                                <div className="ml-4 mt-1` space-y-1">
                                  {chapters.byId[c.id].resourceIds.map((resourceId) => {
                                    const resource = resources.byId[resourceId];
                                    return (
                                      <div key={resourceId} className="flex justify-between items-center text-[13px] border border-[#F2EEF4] dark:border-[#363636] p-2.5 rounded-xl bg-gray-50/50 dark:bg-[#202020]">
                                        <span
                                          onClick={() => downloadFile(resource)}
                                          className="cursor-pointer hover:text-[#F67300] text-[#626262] dark:text-gray-400 truncate"
                                        >
                                          {resource.name}
                                        </span>
                                        <button
                                          onClick={() => downloadFile(resource)}
                                          className="text-gray-400 hover:text-[#F67300] cursor-pointer"
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
                          {m.chapters.length === 0 && <p className="text-sm text-[#626262] px-2">No chapters found</p>}
                        </div>
                      </div>

                      {/* Assignments Section */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-base font-semibold text-[#333] dark:text-white">Assignments:</h4>
                          <button
                            onClick={() => navigate("/instructor/create-assignment/details", {
                              state: {
                                courseId: courseId,
                                course: courseName,
                                batch: batchName,
                                module: m.title,
                                moduleId: m.id
                              }
                            })}
                            className="bg-[#fafafa] dark:bg-[#2A2A2A] p-2 rounded-xl border border-[#F2EEF4] dark:border-[#363636] cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} className="text-[#333] dark:text-white hover:text-black" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {m.assignments.map((assignment: any, aIndex: number) => (
                            <div key={assignment.id} className="flex justify-between items-center border border-[#F2EEF4] dark:border-[#363636] px-4 py-3 rounded-xl text-sm bg-white dark:bg-[#1E1E1E] hover:bg-gray-50 cursor-pointer">
                              <div
                                className="cursor-pointer flex-1 text-[#4D4D4D] dark:text-gray-300 font-normal "
                                onClick={() => navigate("/instructor/assignment-details", {
                                  state: {
                                    id: assignment.id,
                                    title: assignment.title,
                                    isEdit: true,
                                    moduleId: m.id,
                                    batch: batchName,
                                    courseId: courseId,
                                    moduleInfo: m.title
                                  }
                                })}
                              >
                                <p className="text-[15px] font-medium">Assignment {mIndex + 1}.{aIndex + 1} - {assignment.title}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-[#909090] text-[12px] font-semibold">Due: {assignment.dueDate}</span>
                                <button
                                  onClick={() => handleDeleteAssignment(assignment.id, assignment.title)}
                                  className="text-[#f32d2d] hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer hover:text-red-600 dark:hover:bg-red-800/30 "
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {m.assignments.length === 0 && (
                            <p className="text-sm text-[#626262]  px-2">No assignments found</p>
                          )}
                        </div>
                      </div>

                      {/* Tests Section */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-base font-semibold text-[#333] dark:text-white">Tests:</h4>
                          <button
                            onClick={() => setShowTestModal(m.id)}
                            className="bg-[#fafafa] dark:bg-[#2A2A2A] p-2 rounded-xl border border-[#F2EEF4] dark:border-[#363636] cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} className="text-[#333] dark:text-white hover:text-black" />
                          </button>
                        </div>
                        <div className="space-y-1.5 ">
                          {m.tests.map((test: any, tIndex: number) => (
                            <div key={test.id} className="flex justify-between items-center border border-[#F2EEF4] dark:border-[#363636] px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#1E1E1E]">
                              <div className="flex-1 text-[#4D4D4D] dark:text-gray-300 font-normal">
                                <span className="cursor-pointer" onClick={() => handleTestRedirect(test.id)}>
                                  Test {mIndex + 1}.{tIndex + 1} - {test.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-[#808080] text-[14px] font-medium">Date: {test.date}</span>
                              </div>
                            </div>
                          ))}
                          {m.tests.length === 0 && (
                            <p className="text-sm text-[#626262]  px-2">No tests found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-[350px] shadow-xl border border-transparent dark:border-[#363636] relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowModuleModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Module</h3>

            <input
              value={moduleTitle}
              onChange={(e) => setModuleTitle(capitalizeWords(e.target.value))}
              placeholder="Module title"
              autoCapitalize="words"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-[350px] shadow-xl border border-transparent dark:border-[#363636] relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowChapterModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Chapter</h3>

            <input
              value={chapterTitle}
              onChange={(e) => setChapterTitle(capitalizeWords(e.target.value))}
              placeholder="Chapter title"
              autoCapitalize="words"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-full max-w-[350px] shadow-xl border border-transparent dark:border-[#363636] relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowAssignmentModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add Assignment</h3>

            <input
              value={assignmentName}
              onChange={(e) => setAssignmentName(capitalizeWords(e.target.value))}
              placeholder="Assignment name"
              autoCapitalize="words"
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
      <AddTestModal
        isOpen={!!showTestModal}
        onClose={() => setShowTestModal(null)}
        onAdd={handleAddTest}
      />

      {/* ================= Confirm Delete Modal ================= */}
      {/* ================= Deletion Progress Overlay ================= */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[24px] p-8 w-[320px] shadow-2xl border border-transparent dark:border-[#363636] flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-red-100 dark:border-red-900/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-red-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Trash2 size={20} className="text-red-500" />
              </div>
            </div>
            <h3 className="text-lg font-bold dark:text-white mb-2">Deleting...</h3>
            <p className="text-sm text-gray-400">Please wait while we remove the assignment.</p>
          </div>
        </div>
      )}

      {/* ================= Premium Toast ================= */}
      <div
        className={`fixed bottom-6 right-6 z-70 transition-all duration-500 transform ${toast.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-4 bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-[#333] min-w-[320px]">
          <div className="w-10 h-10 bg-[#FFF5ED] dark:bg-[#F67300]/10 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} className="text-[#F67300]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold leading-tight">Success</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast({ ...toast, visible: false })}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ================= Confirm Delete Modal ================= */}
      {confirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-[24px] p-8 w-[380px] shadow-2xl border border-transparent dark:border-[#363636] flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <Trash2 size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Confirm Delete</h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {confirm.type === "module"
                ? "Are you sure you want to delete this module? This action cannot be undone and will remove all associated content."
                : confirm.type === "chapter"
                  ? "Are you sure you want to delete this chapter?"
                  : `Are you sure you want to delete "${confirm.label}"? This action cannot be undone.`}
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-[#363636] rounded-xl cursor-pointer font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer font-semibold shadow-lg shadow-red-100 dark:shadow-none transition-all active:scale-95"
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
