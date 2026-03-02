
import ChatCommunitySection from "./ChatCommunitySection";
import MyClassesSection from "./MyClassesSection";
import InstructorUpcomingSchedule from "./InstructorUpcomingSchedule";
import PendingReview from "./PendingReview";
import RecentActivity from "./RecentActivity";

/* ================= DASHBOARD ================= */

export default function DashboardSection() {


  return (

    
      <div className="">
        <div className="space-y-6">

          {/* ================= MY CLASSES ================= */}
          <div className="boxStyle">
            <MyClassesSection />
          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* LEFT SIDE */}
            <div className="space-y-6">

              {/* Schedule */}
              <InstructorUpcomingSchedule />

              {/* Pending Review */}
              <PendingReview />
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <ChatCommunitySection />

              {/* Recent Activity */}
              <RecentActivity />
            </div>

          </div>
        </div>
      </div>

    
  );
}
