import type { CommunityTab } from "../types/tab";
import CreatePostButton from "./CreatePostButton";

const tabs: CommunityTab[] = [
  "All Post",
  "My Post",
  "Announcements",
  "Doubts & Q/A",
  "General Discussion",
  "Saved Post",
];

interface Props {
  activeTab: CommunityTab;
  setActiveTab: (tab: CommunityTab) => void;
  onCreate: () => void;
}

export default function CommunityTabs({
  activeTab,
  setActiveTab,
  onCreate,
}: Props) {
  return (
    <div className="w-full pb-2 sticky top-0 z-40  dark:bg-[#1E1E1E] transition-colors duration-300">

      {/* MAIN CONTAINER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-15    ">

        {/* TABS */}
        <div className="w-full overflow-x-auto no-scrollbar scroll-smooth scrollbar-hide ">
          <div className="flex gap-8 min-w-max justify-between w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-2 text-sm md:text-base  border-b-2 transition cursor-pointer
                  ${
                    activeTab === tab
                      ? "border-orange-500 text-orange-500 font-medium"
                      : "border-transparent text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CREATE POST BUTTON */}
         <div className=" flex justify-end w-full md:w-40">
          <CreatePostButton onCreate={onCreate} />
        </div>

      </div>
    </div>
  );
}
