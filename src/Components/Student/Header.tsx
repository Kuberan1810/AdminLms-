import { useState, useRef, useEffect } from "react";
import { SearchNormal1, NotificationBing, Setting } from "iconsax-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CoireiLogo from "../../assets/Images/home/coirei-logo-orange.png";
import { headerMap, profile } from "../../data/HeaderData";
import ProfileInfo from "../Student/ProfileInfo";
import ProfileDropdownMenu from "../Student/ProfileDropdownMenu";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

import { useAuth } from "../../context/AuthContext";
import { AnimatePresence } from "framer-motion";
import StudentNotificationPopup from "../common/Student/StudentNotificationPopup.tsx";
import SettingsSidebar from "../common/Student/SettingsSidebar.tsx";
import {useNotifications } from "../../context/StudentNotification/NotificationContext.tsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);


  const ref = useRef<HTMLDivElement>(null);

  const path = location.pathname.split("/")[2];
  // gets: dashboard, profile, courses

  let header =
    headerMap[`/${path}`] || {
      title: "Dashboard",
      subtitle: "Welcome ",
    };

  //  Create Assignment Section
  // if (location.pathname.startsWith("/student/assignments")) {
  //   header = {
  //     title: "Assignments",
  //     subtitle: "Track your coursework and upcoming deadlines.",
  //   };
  // }


  const { unreadCount } = useNotifications();

  // outside click close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
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



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  return (
   
    <header className="w-full flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-5 py-4 sm:py-5 gap-4 lg:gap-0">

      {/* ================= LEFT – TITLE ================= */}
      <div className="flex-1  self-start ">
        <h1
          className="
            text-[22px] sm:text-[26px] lg:text-[30px]
            font-medium text-[#333333]
          "
        >
          {header.title}
        </h1>

        <p
          className="
            text-base sm:text-lg lg:text-xl
            font-normal text-[#626262]
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
          <div
            className="
            hidden md:flex
            items-center gap-2
            px-3 py-2.5 lg:py-3
            border border-[#F2EEF4]
            rounded-[15px]
            text-sm text-[#626262]
            bg-white
          "
          >
            <SearchNormal1 size={18} color="#626262" />
            <input
              type="text"
              placeholder="Search for classes, assignments"
              className="outline-none w-44 md:w-52 lg:w-60 bg-transparent"
            />
          </div>

          {/* Notification */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 sm:p-2.5 rounded-[10px] bg-white border border-[#F2EEF4] cursor-pointer"
          >
            <NotificationBing size={24} color="#626262" />

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
            className="  sm:flex p-2 sm:p-2.5 rounded-[10px] bg-white border border-[#F2EEF4] cursor-pointer"
          >
            <Setting size={24} color="#626262" />
          </button>

          <AnimatePresence>
            {showSettings && (
              <SettingsSidebar
                onClose={() => setShowSettings(false)}
              />
            )}
          </AnimatePresence>

          {/* Profile */}
          <div className="relative" ref={ref}>
            <ProfileInfo
              image={profile.image}
              name="Philip Stanton"
              role="Student"
              onClick={() => setOpen((prev) => !prev)} // 👈 ONLY toggle
            />


            {open && (
              <ProfileDropdownMenu
                onProfileClick={() => {
                  setOpen(false);
                  navigate("/student/profile");
                }}
                // onSettingsClick={() => {
                //   setOpen(false);
                //   setShowSettings(true);   // 👈 open sidebar
                // }}
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

export default Header;
