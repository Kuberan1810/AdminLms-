import { NavLink } from "react-router-dom";
import CoireiLogo from "../../assets/Images/home/coirei-logo-orange.png";
import { PanelRight } from "lucide-react";
import {
  Home3,
  DocumentText,
  DocumentText1,
  Note1,
  People,
  Messages3,
  ClipboardText,
  CalendarTick,
} from "iconsax-react";

const PlatformList = [
  { label: "Dashboard", icon: Home3, path: "/student/dashboard" },
  { label: "Courses", icon: DocumentText1, path: "/student/courses" },
  { label: "Assignments", icon: Note1, path: "/student/assignments", comingSoon: true },
  { label: "Community", icon: People, path: "/student/community", comingSoon: true },
  { label: "Chat", icon: Messages3, path: "/student/chat", comingSoon: true },
  { label: "Test", icon: ClipboardText, path: "/student/test", comingSoon: true },
  { label: "Attendance", icon: CalendarTick, path: "/student/attendance", comingSoon: true },
];

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

export default function Sidebar({ collapsed, setCollapsed }: Props) {
  return (

    <>
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#2A2A2A] border-t-[#F3F5F7] dark:border-t-[#3B3B3B] md:hidden flex justify-around py-4">
        {PlatformList.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={(e) => item.comingSoon && e.preventDefault()}
              className={`relative flex flex-col items-center justify-center ${item.comingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    variant={isActive && !item.comingSoon ? "Bold" : "Outline"}
                    className={isActive && !item.comingSoon ? "text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
                    color="currentColor"
                  />
                  {item.comingSoon && (
                    <span className="absolute -top-2.5 -right-3 text-[8px] bg-[#F3F5F7] dark:bg-[#3B3B3B] text-[#808080] dark:text-[#CCCCCC] px-1 rounded-full font-bold">
                      Soon
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* ================= TABLET + DESKTOP SIDEBAR ================= */}
      <aside
        className={`
          hidden md:block
          h-screen bg-white dark:bg-[#1E1E1E] border-r border-[#F3F5F7] dark:border-[#3B3B3B]
          transition-all duration-300
          ${collapsed ? "w-16" : "w-60"}

          /* desktop */
          lg:relative lg:z-0

          /* tablet overlay ONLY when expanded */
          ${!collapsed ? "md:fixed md:top-0 md:left-0 md:z-50" : "md:relative"}
        `}
      >
        {/* ===== HEADER ===== */}
        <div
          className={`
            flex items-center px-4 pt-6 mb-6
            ${collapsed ? "justify-center" : "justify-between"}
          `}
        >
          {!collapsed && (
            <img src={CoireiLogo} alt="CoireiLogo" className="w-25" />
          )}

          <button onClick={() => setCollapsed(!collapsed)} className="px-4 py-2.5 hover:bg-[#fafafa] dark:hover:bg-[#2A2A2A] rounded-lg cursor-pointer">
            <PanelRight size={22} className="text-[#626262] dark:text-white" />
          </button>
        </div>

        {/* ===== NAV ===== */}
        <nav className="space-y-4 px-2">
          {PlatformList.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={(e) => item.comingSoon && e.preventDefault()}
                className={({ isActive }) =>
                  `
                  flex items-center rounded-xl transition w-full
                  ${collapsed
                    ? "justify-center px-4 py-2.5"
                    : "gap-3 px-4 py-2.5"
                  }
                  ${isActive && !item.comingSoon
                    ? "bg-[#FAFAFA] dark:bg-[#2A2A2A] text-[#F67300] font-semibold "
                    : "text-[#626262] dark:text-[#A3A3A3]"
                  }
                  ${!collapsed && !item.comingSoon && "hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A]"}
                  ${item.comingSoon ? "opacity-60 cursor-not-allowed" : ""}
                `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* ICON */}
                    <div
                      className={`
                        flex items-center justify-center
                        ${collapsed
                          ? " rounded-lg px-4 py-2.5 hover:bg-[#FAFAFA]"
                          : ""
                        }
                      `}
                    >
                      {item.label === "Courses" ? (
                        isActive && !item.comingSoon ? (
                          <DocumentText size={24} variant="Bold" className="text-[#F67300]" color="currentColor" />
                        ) : (
                          <DocumentText1 size={24} className="text-[#626262] dark:text-[#A3A3A3]" color="currentColor" />
                        )
                      ) : (
                        <Icon
                          size={24}
                          variant={isActive && !item.comingSoon ? "Bold" : "Outline"}
                          className={isActive && !item.comingSoon ? "text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
                          color="currentColor"
                        />
                      )}
                    </div>

                    {/* TEXT */}
                    {!collapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xl font-medium">
                          {item.label}
                        </span>
                        {item.comingSoon && (
                          <span className="text-[10px] bg-[#F3F5F7] dark:bg-[#3B3B3B] text-[#808080] dark:text-[#CCCCCC] px-2 py-0.5 rounded-full font-medium ml-2">
                            Soon
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>


  );
}
