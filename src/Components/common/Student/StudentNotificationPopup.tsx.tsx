import { Clock, TickCircle, Teacher } from "iconsax-react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useNotifications } from "../../../context/StudentNotification/NotificationContext";
import type { JSX } from "react";

interface StudentNotificationPopupProps {
  onClose: () => void;
}

type NotificationCategory = "reminder" | "score" | "system";

/* CATEGORY STYLE MAP */

const categoryStyles: Record<
  NotificationCategory,
  { icon: JSX.Element; bg: string }
> = {
  reminder: {
    icon: <Clock size={22} color="#DC2626" variant="Outline" />,
    bg: "bg-red-50",
  },
  score: {
    icon: <Teacher size={22} color="#F67300" variant="Outline" />,
    bg: "bg-[#FFF5ED]",
  },
  system: {
    icon: <TickCircle size={22} color="#16A34A" variant="Bold" />,
    bg: "bg-green-50",
  },
};

const StudentNotificationPopup = ({ onClose }: StudentNotificationPopupProps) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const isToday = (date: Date) =>
    date.toDateString() === new Date().toDateString();

  const todayNotifications = notifications.filter(n => isToday(n.date));
  const yesterdayNotifications = notifications.filter(n => !isToday(n.date));

  const formatTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return "Yesterday";
  };

  const NotificationItem = ({ item }: any) => {
    const style =
      categoryStyles[item.category as NotificationCategory] ??
      categoryStyles.reminder;

    return (
      <div
        onClick={() => markAsRead(item.id)}
        className={`bg-white rounded-2xl p-4 flex gap-4 border border-[#F2EEF4] 
        hover:bg-gray-50 transition cursor-pointer
        ${!item.unread ? "opacity-60" : ""}`}
      >
        <div
          className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}
        >
          {style.icon}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-base lg:text-lg font-semibold text-[#333333] leading-snug">
              {item.title}
            </h4>

            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#808080] whitespace-nowrap">
                {formatTime(item.date)}
              </span>

              {item.unread && (
                <div className="w-2 h-2 rounded-full bg-[#F67300]" />
              )}
            </div>
          </div>

          <p className="text-[13px] md:text-[14px] text-[#626262] mt-1">
            {item.subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/30 z-[1000]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-[#fafafa] z-[1001] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F2EEF4] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-[20px] md:text-2xl font-semibold">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <span className="bg-[#F67300] text-white text-[12px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[13px] md:text-sm text-[#F67300] font-semibold hover:underline"
              >
                Mark all as read
              </button>
            )}
            <button onClick={onClose} className="cursor-pointer">
              <X size={18} color="#626262" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">

          {todayNotifications.length > 0 && (
            <div>
              <h4 className="text-[#F67300] text-[14px] md:text-base font-semibold mb-4">
                Today
              </h4>
              <div className="space-y-4">
                {todayNotifications.map(item => (
                  <NotificationItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {yesterdayNotifications.length > 0 && (
            <div>
              <h4 className="text-[#F67300] text-[14px] md:text-base font-semibold mb-4">
                Yesterday
              </h4>
              <div className="space-y-4">
                {yesterdayNotifications.map(item => (
                  <NotificationItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </>
  );
};

export default StudentNotificationPopup;
