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
  { label: "Assignments", icon: Note1, path: "/student/assignments" },
  { label: "Community", icon: People, path: "/student/community" },
  { label: "Chat", icon: Messages3, path: "/student/chat" },
  { label: "Test", icon: ClipboardText, path: "/student/test" },
  { label: "Attendance", icon: CalendarTick, path: "/student/attendance" },
];

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

export default function Sidebar({ collapsed, setCollapsed }: Props) {
  return (
    
      <>
        {/* ================= MOBILE BOTTOM NAV ================= */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[#F3F5F7] md:hidden flex justify-around py-4">
          {PlatformList.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.label} to={item.path}>
                {({ isActive }) => (
                  <Icon
                    size={24}
                    variant={isActive ? "Bold" : "Outline"}
                    color={isActive ? "#F67300" : "#626262"}
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* ================= TABLET + DESKTOP SIDEBAR ================= */}
        <aside
          className={`
          hidden md:block
          h-screen bg-white border-r border-[#F3F5F7]
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

            <button onClick={() => setCollapsed(!collapsed)} className="px-4 py-2.5 hover:bg-[#fafafa] rounded-lg cursor-pointer">
              <PanelRight size={22} color="#626262" />
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
                  className={({ isActive }) =>
                    `
                  flex items-center rounded-xl transition
                  ${collapsed
                      ? "justify-center px-4 py-2.5"
                      : "gap-3 px-4 py-2.5"
                    }
                  ${isActive
                      ? "bg-[#FAFAFA] text-[#F67300] font-semibold "
                      : "text-[#626262]"
                    }
                  ${!collapsed && "hover:bg-[#FAFAFA]"}
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
                          isActive ? (
                            <DocumentText size={24} variant="Bold" color="#F67300" />
                          ) : (
                            <DocumentText1 size={24} color="#626262" />
                          )
                        ) : (
                          <Icon
                            size={24}
                            variant={isActive ? "Bold" : "Outline"}
                            color={isActive ? "#F67300" : "#626262"}
                          />
                        )}
                      </div>

                      {/* TEXT */}
                      {!collapsed && (
                        <span className="text-xl font-medium">
                          {item.label}
                        </span>
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
