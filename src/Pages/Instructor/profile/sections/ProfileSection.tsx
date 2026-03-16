import React from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import CoursesList from "./CoursesList";
import Profile_Info from "./ProfileInfo";
import { useAuth } from "../../../../context/AuthContext";


const ProfileSection: React.FC = () => {
  const navigate = useNavigate();
  const { user} = useAuth();

  const { profile } = useSelector((state: RootState) => state.instructor);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] transition-colors">
      <div className=" mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft className="w-5 h-5 cursor-pointer dark:text-white" onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold dark:text-white">My Profile</h1>
        </div>



        {/* Profile Card */}
        <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl p-4 md:p-6 transition-colors border border-transparent dark:border-[#363636]">

          {/* Top user info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#f67300]  flex justify-center items-center text-[#fff] dark:text-white text-3xl font-medium">
                {(profile.name || "Instructor").charAt(0).toUpperCase()}
              </div>
              {/* <div className="h-6 w-6 bg-[#F67300] flex justify-center items-center rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-[#2A2A2A]">
                <Camera size={14} color="white" />
              </div> */}
            </div>

            <div>
              <h2 className="font-medium text-lg text-[#333333] dark:text-white mb-1">{user?.name || "Name of the Instructor"}</h2>
              <p className="text-sm text-[#626262] dark:text-gray-400">{user?.id || "Instructor Id"}</p>
            </div>
          </div>

          <div>
            <Profile_Info />
          </div>

          {/* Highlight Section */}
          <div className=" rounded-xl ">
            <CoursesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
