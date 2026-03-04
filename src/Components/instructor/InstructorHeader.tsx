import { useState, useRef, useEffect } from "react";
import { SearchNormal1, NotificationBing, Setting } from "iconsax-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import { headerMap, profile } from "../../data/HeaderData";
import { useAuth } from "../../context/AuthContext";
import CoireiLogo from "../../assets/Images/home/coirei-logo-orange.png";
import ProfileInfo from "./ProfileInfo";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import PlusIcon from "./PlusIcon";
import QuickActionsModal from "./QuickActionsModal";

import NotificationPopup from "../common/Instructor/NotificationPopup";
import SettingsSidebar from "../common/Instructor/SettingsSidebar";
import { useInstructorNotifications } from "../../context/InstructorNotification/InstructorNotificationContext";
import { ArrowLeft } from "lucide-react";
import GlobalSearchDropdown from "../common/GlobalSearchDropdown";

const InstructorHeader = () => {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const { unreadCount } = useInstructorNotifications();
  /* ================= HOOKS ================= */
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  /* ================= REFS ================= */
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  /* ================= HEADER DATA ================= */
  const batchMatch = useMatch("/instructor/batch-details/:batchName");
  const isDashboard = location.pathname === "/instructor/dashboard";

  let header = headerMap[location.pathname] || {
    title: "Dashboard",
    subtitle: "Welcome ",
  };

  if (batchMatch) {
    header = {
      title: "Classes",
      subtitle: "Create and manage your curriculum content.",
    };
  }

  if (location.pathname.startsWith("/instructor/students")) {
    header = {
      title: "Students",
      subtitle: "Manage and monitor student performance.",
    };
  }
  // ✅ Chat Section
  if (location.pathname.startsWith("/instructor/chat")) {
    header = {
      title: "Chat",
      subtitle: "Communicate and collaborate with students.",
    };
  }

  // ✅ Community Section
  if (location.pathname.startsWith("/instructor/community")) {
    header = {
      title: "Community",
      subtitle: "Engage and interact with your learning network.",
    };
  }
  // ✅ Create Assignment Section
  if (location.pathname.startsWith("/instructor/create-assignment")) {
    header = {
      title: "Create Assignment",
      subtitle: "Design and manage assignment details efficiently.",
    };
  }
  // ✅ Create Test Section
  if (location.pathname.startsWith("/instructor/create-test")) {
    header = {
      title: "Create Test",
      subtitle: "Build and manage your test content efficiently.",
    };
  }
  if (location.pathname.startsWith("/instructor/batch-details/test-section")) {
    header = {
      title: "Review Section",
      subtitle: "Review and analyze test performance.",
    };
  }
  // ✅ Test Results Section
  if (location.pathname.startsWith("/instructor/tests/results")) {
    header = {
      title: "Test Results",
      subtitle: "View and analyze student test performance.",
    };
  }

  // ✅ Test Results Section
  if (location.pathname.startsWith("/instructor/assignment/assignment-review")) {
    header = {
      title: "Assignment Results",
      subtitle: "View and analyze student Assginments submission.",
    };
  }


  /* ================= OUTSIDE CLICK HANDLER ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="w-full flex xl:flex-row justify-between px-4 sm:px-5 py-4 sm:py-5 gap-5 lg:gap-0 flex-col-reverse ">

      {/* ================= LEFT – TITLE ================= */}
      <div className="flex flex-col  xl:flex-row  items-center gap-5 xl:gap-10 justify-start">
        <img
          src={CoireiLogo}
          alt="CoireiLogo"
          className="w-20 xl:w-24 hidden xl:flex"
        />

        <div className="flex self-start  items-center md:gap-4 gap-2">

          {!isDashboard && (
            <div
              onClick={() => navigate(-1)}
              className="cursor-pointer hover:bg-gray-100 rounded-full p-2"
            >
              <ArrowLeft strokeWidth={1.7} color="#333333" className="md:size-7.5 size-5" />
            </div>
          )}

          <div className="self-start">
            <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-medium text-[#333333]">
              {header.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-normal text-[#626262] whitespace-nowrap">
              {header.subtitle}
              {isDashboard && user?.name}
            </p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-start justify-between xl:justify-end w-full ">
        <div className=" self-start xl:self-center xl:hidden flex ">
          <img
            src={CoireiLogo}
            alt="CoireiLogo"
            className="w-20 xl:w-24"
          />
        </div>

        <div className="flex gap-5 justify-between">
          {/* SEARCH */}
          <div className="relative" ref={searchRef}>
            <div className="hidden md:flex items-center gap-2 px-3 py-2.5 lg:py-3 border border-[#F2EEF4] rounded-[15px] text-sm text-[#626262] bg-white">
              <SearchNormal1 size={18} color="#626262" />
              <input
                type="text"
                placeholder="Search for classes, assignments"
                className="outline-none w-40 md:w-52 lg:w-60 bg-transparent"
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
                  role="instructor"
                  onClose={() => setShowSearchPopup(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ================= NOTIFICATION ================= */}
          <div className="relative" ref={notificationRef}>
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

            <AnimatePresence>
              {showNotifications && (
                <NotificationPopup
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ================= QUICK ACTION ================= */}
          <div className="scale-90 sm:scale-100">
            <PlusIcon onClick={() => setShowQuickActions(true)} />
          </div>

          {/* ================= SETTINGS ================= */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 sm:p-2.5 rounded-[10px] bg-white border border-[#F2EEF4] cursor-pointer"
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

          {/* ================= PROFILE ================= */}
          <div className="relative" ref={profileRef}>
            <ProfileInfo
              image={profile.image}
              name="Philip Stanton"
              role="Instructor"
              onClick={() => setOpen(prev => !prev)}
            />

            {open && (
              <ProfileDropdownMenu
                onProfileClick={() => {
                  setOpen(false);
                  navigate("/instructor/profile");
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

      {/* ================= MODALS ================= */}

      {showConfirmLogout && (
        <ConfirmLogoutModal
          onCancel={() => setShowConfirmLogout(false)}
          onConfirm={handleLogout}
        />
      )}

      {showQuickActions && (
        <QuickActionsModal
          onClose={() => setShowQuickActions(false)}
          onAction={() => { }}
        />
      )}

    </header>
  );
};

export default InstructorHeader;
