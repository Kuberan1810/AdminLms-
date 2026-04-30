import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CoireiLogo from "../../assets/Images/home/coirei-logo-orange.png";
import { PanelRight } from "lucide-react";
import {
  Home3,
  DocumentText,
  DocumentText1,
  People,
  ClipboardText,
  Profile2User,
  Chart1,
  Setting2,
  Messages3,
} from "iconsax-react";

const AdminList = [
  { label: "Dashboard", icon: Home3, path: "/admin/dashboard" },
  { label: "Courses", icon: DocumentText1, path: "/admin/courses" },
  {
    label: "Users",
    icon: Profile2User,
    subItems: [
      { label: "Instructors", path: "/admin/users/instructors" },
      { label: "Students", path: "/admin/users/students" },
    ],
  },
  { label: "Community", icon: People, path: "/admin/community" },
  { label: "Chat", icon: Messages3, path: "/admin/chat" },
  { label: "Reports", icon: Chart1, path: "/admin/reports" },
];

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

export default function AdminSidebar({ collapsed, setCollapsed }: Props) {
  const location = useLocation();
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  // Check if any sub-item of Users is active to keep it highlighted/open
  const isUsersActive = location.pathname.includes("/admin/users/instructors") || location.pathname.includes("/admin/users/students");

  // Close dropdown when navigating to other main sections
  useEffect(() => {
    if (!isUsersActive) {
      setIsUsersOpen(false);
    }
  }, [location.pathname, isUsersActive]);
  
  return (
    <>
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#2A2A2A] border-t-[#F3F5F7] dark:border-t-[#3B3B3B] md:hidden flex justify-around py-4">
        {AdminList.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center justify-center"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    variant={isActive ? "Bold" : "Outline"}
                    className={isActive ? "text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
                    color="currentColor"
                  />
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

        {/* ===== NAV =====
        <div className="px-4 mb-4">
          <span className="text-[#626262] text-xl font-medium opacity-70">Overview</span>
        </div> */}
        <nav className="space-y-2 px-2">
          {AdminList.map((item) => {
            const Icon = item.icon;

            if (item.subItems) {
              return (
                <div 
                  key={item.label} 
                  className="space-y-1"
                  onMouseEnter={() => !collapsed && setIsUsersOpen(true)}
                  onMouseLeave={() => !collapsed && !isUsersActive && setIsUsersOpen(false)}
                >
                  <div 
                    onClick={() => !collapsed && setIsUsersOpen(!isUsersOpen)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 
                      ${(isUsersOpen || isUsersActive) ? "bg-[#FAFAFA] dark:bg-[#2A2A2A] text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
                      ${collapsed ? "justify-center" : ""}`}
                  >
                    <Icon 
                      size={24} 
                      variant={(isUsersOpen || isUsersActive) ? "Bold" : "Outline"} 
                      className={(isUsersOpen || isUsersActive) ? "text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
                      color="currentColor"
                    />
                    {!collapsed && <span className="text-xl font-medium">{item.label}</span>}
                  </div>
                  {!collapsed && (isUsersOpen || isUsersActive) && (
                    <div className="ml-6 pl-2.5 space-y-1 border-l border-[#F2EEF4] dark:border-[#3B3B3B]">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.label}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-xl transition-all duration-200 text-lg font-medium
                            ${isActive
                              ? "bg-[#FFF5EB] text-[#F67300]"
                              : "text-[#626262] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A]"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center rounded-xl transition w-full
                  ${collapsed
                    ? "justify-center px-4 py-2.5"
                    : "gap-3 px-4 py-2.5"
                  }
                  ${isActive
                    ? "bg-[#FAFAFA] dark:bg-[#2A2A2A] text-[#F67300] font-semibold "
                    : "text-[#626262] dark:text-[#A3A3A3]"
                  }
                  ${!collapsed && "hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A]"}
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
                          <DocumentText size={24} variant="Bold" className="text-[#F67300]" color="currentColor" />
                        ) : (
                          <DocumentText1 size={24} className="text-[#626262] dark:text-[#A3A3A3]" color="currentColor" />
                        )
                      ) : (
                        <Icon
                          size={24}
                          variant={isActive ? "Bold" : "Outline"}
                          className={isActive ? "text-[#F67300]" : "text-[#626262] dark:text-[#A3A3A3]"}
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
