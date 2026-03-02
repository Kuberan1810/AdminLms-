import { FileText, Download, Pencil, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { type Resource } from "../../../../store/slices/ResourcesSlice";

/* =====================================================
   Component
   ===================================================== */

export default function ModuleTopicResourcesSection() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch(); // Not needed if only reading/downloading

  const { chapters, resources: resourcesState } = useAppSelector((state) => state.resource);

  const chapter = chapterId ? chapters.byId[chapterId] : null;

  // Derived resources from store
  const resources = chapter
    ? chapter.resourceIds.map((resourceId) => resourcesState.byId[resourceId]).filter(Boolean)
    : [];

  /* ================= Download ================= */

  const downloadFile = (res: Resource) => {
    if (!res.url) return;
    const link = document.createElement("a");
    link.href = res.url;
    link.download = res.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto space-y-6 max-w-5xl">
        {/* ================= Title ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold">
              {chapter ? chapter.title : "Chapter Resources"}
            </h1>
          </div>
        </div>

        {/* ================= Class Content ================= */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Class Content:</h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
            {chapter?.classContent || "No class content description available."}
          </p>
        </div>

        {/* ================= Key Topics ================= */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-semibold mb-3">Key Topics:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            {(chapter?.keyTopics && chapter.keyTopics.length > 0) ? (
              chapter.keyTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))
            ) : (
              <li className="text-gray-400 italic list-none -ml-4">No key topics added.</li>
            )}
          </ul>
        </div>

        {/* ================= Resources ================= */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="font-semibold">Resources</h2>
          </div>

          <div className="space-y-3">
            {resources.map((res) => (
              <div
                key={res.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#d3d3d3] rounded-xl p-4 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="text-red-600" size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{res.name}</p>
                    <p className="text-xs text-gray-500">{res.size || "Unknown"}</p>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => downloadFile(res)}
                    className="p-2 rounded-lg hover:bg-gray-200"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
            {resources.length === 0 && (
              <div className="text-center text-gray-500 py-4 italic">
                No resources added yet.
              </div>
            )}
          </div>
        </div>

        {/* ================= Edit Button ================= */}
        <div className="flex justify-end pb-8">
          <button
            onClick={() => navigate(`/instructor/batch-details/upload-resources/${chapterId}`)}
            className="flex items-center gap-2 px-6 py-2 rounded-xl shadow text-white transition-colors bg-orange-500 hover:bg-orange-600"
          >
            <Pencil size={16} /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
