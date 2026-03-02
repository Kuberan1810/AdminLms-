import { useRef, useState } from "react";
import { FileText, Upload, Download, Pencil, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";

/* =====================================================
   Types
===================================================== */

interface Resource {
  id: string;
  name: string;
  size: string;
  url?: string;
}

/* =====================================================
   Component
===================================================== */

export default function ModuleTopicResourcesSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  const { chapters, resources: resourcesState } = useAppSelector((state) => state.resource);

  const chapter = chapterId ? chapters.byId[chapterId] : null;
  const chapterResources = chapter ? chapter.resourceIds.map((resourceId) => resourcesState.byId[resourceId]) : [];

  const [resources, setResources] = useState<Resource[]>(chapterResources.map((res) => ({
    id: res.id,
    name: res.name,
    size: "Unknown", // Placeholder, as size is not stored
    url: res.url,
  })));

  /* ================= Upload ================= */

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: Resource[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: URL.createObjectURL(file),
    }));

    setResources((prev) => [...prev, ...newItems]);
  };

  /* ================= Download ================= */

  const downloadFile = (res: Resource) => {
    if (!res.url) return;
    const link = document.createElement("a");
    link.href = res.url;
    link.download = res.name;
    link.click();
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

          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow w-full sm:w-auto">
            <Pencil size={16} /> Edit
          </button>
        </div>

        {/* ================= Class Content ================= */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Class Content:</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            AI Agents are systems that use LLMs to plan, act, and collaborate
            autonomously. LangChain builds tool-using agents for workflows and
            RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses
            on conversation-driven agents that interact with each other and
            humans to solve complex tasks.
          </p>
        </div>

        {/* ================= Key Topics ================= */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-semibold mb-3">Key Topics:</h2>

          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            <li>Introduction to AI Agents</li>
            <li>Agent Architecture & Planning</li>
            <li>Tools, Memory & RAG</li>
            <li>Multi-Agent Collaboration</li>
            <li>Frameworks Overview</li>
          </ul>
        </div>

        {/* ================= Resources ================= */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="font-semibold">Resources</h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-50 w-full sm:w-auto justify-center sm:justify-start"
              >
                <Upload size={16} /> Upload
              </button>

              <input
                type="file"
                multiple
                hidden
                ref={inputRef}
                onChange={handleUpload}
              />
            </div>
          </div>

          <div className="space-y-3">
            {resources.map((res) => (
              <div
                key={res.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#d3d3d3] rounded-xl p-4 hover:bg-gray-50"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="text-red-600" size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{res.name}</p>
                    <p className="text-xs text-gray-500">{res.size}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => downloadFile(res)}
                    className="p-2 rounded-lg hover:bg-gray-200"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
