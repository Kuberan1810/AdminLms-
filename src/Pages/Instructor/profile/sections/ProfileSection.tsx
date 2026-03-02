import React from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import CoursesList from "./CoursesList";
import Profile_Info from "./ProfileInfo";

const ProfileSection: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.instructor);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>



        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 md:p-6">

          {/* Top user info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="h-6 w-6 bg-[#F67300] flex justify-center items-center rounded-full absolute bottom-0 right-0 border-2 border-white">
                <Camera size={14} color="white" />
              </div>
            </div>

            <div>
              <h2 className="font-medium text-lg text-[#333333] mb-1">{profile.name || "Name of the Instructor"}</h2>
              <p className="text-sm text-[#626262]">{profile.instructorId || "Instructor Id"}</p>
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
