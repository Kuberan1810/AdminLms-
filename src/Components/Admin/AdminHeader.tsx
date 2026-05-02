import { useState, useRef, useEffect } from "react";
import { SearchNormal1, NotificationBing, Setting } from "iconsax-react";
import { Sun, Moon } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CoireiLogo from "../../assets/Images/home/coirei-logo-orange.png";
import { headerMap, profile } from "../../data/HeaderData";
import ProfileInfo from "../Student/ProfileInfo";
import ProfileDropdownMenu from "../Student/ProfileDropdownMenu";
import ConfirmLogoutModal from "../Student/ConfirmLogoutModal";

import { useAuth } from "../../context/AuthContext";
import { AnimatePresence } from "framer-motion";
import StudentNotificationPopup from "../common/Student/StudentNotificationPopup.tsx";
import SettingsSidebar from "../common/Student/SettingsSidebar.tsx";
import { useNotifications } from "../../context/StudentNotification/NotificationContext.tsx";
import GlobalSearchDropdown from "../common/GlobalSearchDropdown";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.theme === "dark" || document.documentElement.classList.contains("dark");
  });


  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const path = location.pathname.split("/")[2];
  // gets: dashboard, profile, courses

  let header =
    headerMap[location.pathname] ||
    headerMap[`/admin/${path}`] ||
    headerMap[`/${path}`] || {
      title: "Admin Dashboard",
      subtitle: "Welcome to Admin Panel",
    };


  const { unreadCount } = useNotifications();

  // outside click close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };



  useEffect(() => {
    const checkScreen = () => {
      // setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  return (

    <header className="w-full flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-5 py-4 sm:py-5 gap-4 lg:gap-0 md:bg-white dark:md:bg-[#2d2d2d]  transition-colors duration-300 sm:border-b sm:border-[#F2EEF4] dark:sm:border-[#3B3B3B] sm:mb-5">

      {/* ================= LEFT – TITLE ================= */}
      <div className="flex-1  self-start ">
        <h1
          className="
            text-[22px] sm:text-[26px] lg:text-[28px]
            font-medium text-[#333333] dark:text-white
          "
        >
          {header.title}
        </h1>

        <p
          className="
            text-base sm:text-lg lg:text-xl
            font-normal text-[#626262] dark:text-[#A3A3A3]
          "
        >
          {header.subtitle}
          {path === "dashboard" && user?.name}

        </p>
      </div>

      {/* ================= RIGHT ================= */}
      <div
        className="
          flex justify-between self-end sm:self-center w-full sm:w-fit
        "
      >

        <div >
          <img src={CoireiLogo} alt="CoireiLogo" className="w-20  sm:hidden self-start " />
        </div>

        <div className="flex items-center
          gap-3 sm:gap-4 lg:gap-5
          flex-wrap lg:flex-nowrap">
          {/* SEARCH – hide on mobile */}
          <div className="relative" ref={searchRef}>
            <div
              className="
              hidden md:flex
              items-center gap-2
              px-4 py-2.5
              border border-[#F2EEF4] dark:border-[#3B3B3B]
              rounded-full
              text-sm text-[#626262] dark:text-white
              bg-[#FAFAFA] dark:bg-[#2A2A2A]
            "
            >
              <SearchNormal1 size={18} color="currentColor" />
              <input
                type="text"
                placeholder="Search for everything"
                className="outline-none w-44 md:w-52 lg:w-60 bg-transparent text-[#333333] dark:text-white placeholder-[#626262] dark:placeholder-[#A3A3A3]"
                value={searchParams.get("search") || ""}
                onFocus={() => setShowSearchPopup(true)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    searchParams.set("search", value);
                    setShowSearchPopup(true);
                  } else {
                    searchParams.delete("search");
                    setShowSearchPopup(false);
                  }
                  setSearchParams(searchParams, { replace: true });
                }}
              />
            </div>
            {/* Global Search Popup */}
            <AnimatePresence>
              {showSearchPopup && searchParams.get("search") && (
                <GlobalSearchDropdown
                  query={searchParams.get("search") || ""}
                  role="student"
                  onClose={() => setShowSearchPopup(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Notification */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] cursor-pointer text-[#626262] dark:text-white"
          >
            <NotificationBing
              size={24}
              color={isDarkMode ? "#ffffff" : "#626262"}
            />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-semibold bg-[#F67300] text-white rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>


          {/* Popup */}
          <AnimatePresence>
            {showNotifications && (
              <StudentNotificationPopup
                onClose={() => setShowNotifications(false)}
              />
            )}
          </AnimatePresence>

          {/* ================= SETTINGS ================= */}
          <button
            onClick={() => setShowSettings(true)}
            className="  sm:flex p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] cursor-pointer text-[#626262] dark:text-white transition-colors"
          >
            <Setting size={24} color="currentColor" />
          </button>

          <AnimatePresence>
            {showSettings && (
              <SettingsSidebar
                onClose={() => setShowSettings(false)}
              />
            )}
          </AnimatePresence>

          {/* dark mode toggle */}
          <button
            onClick={() => {
              const html = document.documentElement;
              if (html.classList.contains("dark")) {
                html.classList.remove("dark");
                localStorage.theme = "light";
                setIsDarkMode(false);
              } else {
                html.classList.add("dark");
                localStorage.theme = "dark";
                setIsDarkMode(true);
              }
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#363636] cursor-pointer flex items-center justify-center transition-colors text-[#626262] dark:text-white"
          >
            {isDarkMode ? (
              <Sun size={24} strokeWidth={1.5} color="currentColor" />
            ) : (
              <Moon size={24} strokeWidth={1.5} color="currentColor" />
            )}
          </button>

          {/* Profile */}
          <div className="relative" ref={ref}>
            <ProfileInfo
              image={profile.image}
              name={user?.name || "Admin"}
              role="Admin"
              onClick={() => setOpen((prev) => !prev)} // 👈 ONLY toggle
            />


            {open && (
              <ProfileDropdownMenu
                onProfileClick={() => {
                  setOpen(false);
                  navigate("/admin/profile");
                }}
                onLogoutClick={() => {
                  setOpen(false);
                  setShowConfirmLogout(true);
                }}
              />
            )}

          </div>
        </div>
      </div>

      {/* ================= CONFIRM LOGOUT MODAL ================= */}
      {showConfirmLogout && (
        <ConfirmLogoutModal
          onCancel={() => setShowConfirmLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </header>

  );
};

export default AdminHeader;
