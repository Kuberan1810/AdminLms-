import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Edit2, Check, X } from "lucide-react";
import StatsCards from "./section/StatsCards";
import CurriculumSyllabus from "./section/CurriculumSyllabus";
import UpcomingSessions from "./section/UpcomingSessions";
import LeadInstructor from "./section/LeadInstructor";
import EnrollmentStats from "./section/EnrollmentStats";
import { getBatchData } from "../../../../data/BatchMockData";

export default function CoursesOverview() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();

  // Get dynamic data based on batchId
  const batchData = getBatchData(batchId || "b1");

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "The AI / ML Frontier AI Engineer course is designed to equip learners with the skills required to build, deploy, and scale real-world AI and machine learning solutions. This course covers the complete AI/ML lifecycle—from data preparation and model development to deployment and monitoring in production environments."
  );
  const [tempDescription, setTempDescription] = useState(description);

  // Sync description if batchId changes
  useEffect(() => {
    // In a real app, you'd fetch the specific description for this batch
    setTempDescription(description);
  }, [batchId]);

  const handleSave = () => {
    setDescription(tempDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#333333] dark:text-white hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xl font-bold">{batchData.id}</span>
        </button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="p-2 rounded-xl border border-green-200 bg-green-50 text-green-600 cursor-pointer">
                <Check size={20} />
              </button>
              <button onClick={handleCancel} className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 cursor-pointer">
                <X size={20} />
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="p-2 rounded-xl border border-[#F2EEF4] dark:border-[#3B3B3B] hover:bg-gray-50 cursor-pointer">
              <Edit2 size={20} className="text-[#626262]" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              rows={4}
              className="w-full text-base text-[#626262] dark:text-[#A3A3A3] leading-relaxed bg-transparent border border-[#E2E8F0] rounded-xl p-4 focus:outline-none focus:border-[#F67300]"
            />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[#333333] dark:text-white">Courses Overview</h1>
            <p className="text-base text-[#626262] dark:text-[#A3A3A3] leading-relaxed max-w-7xl">
              {description}
            </p>
          </>
        )}
      </div>

      {/* ─── Stats Cards ────────────────────────────────────────────── */}
      <StatsCards stats={batchData.stats} />

      {/* ─── Main Content Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Curriculum & Sessions) */}
        <div className="lg:col-span-2 space-y-8">
          <CurriculumSyllabus modules={batchData.modules} />
          <UpcomingSessions sessions={batchData.sessions} />
        </div>

        {/* Right Column (Instructor & Enrollment) */}
        <div className="space-y-8">
          <LeadInstructor instructor={batchData.instructor} />
          <EnrollmentStats enrollment={batchData.enrollment} />
        </div>
      </div>
    </div>
  );
}
