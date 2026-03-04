import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BasicInfo from "../sections/BasicInfo";
import AcademicInfo from "../sections/AcademicInfo";
import { useAuth } from "../../../../context/AuthContext";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState("BasicInfo");
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="mx-5 mb-10">
      <div className="mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <ArrowLeft className="w-5 h-5 cursor-pointer  transition-colors" onClick={() => navigate(-1)} />
          </div>
          <h1 className="text-lg font-semibold text-[#333333]">My Profile</h1>
        </div>

        {/* Top Profile Card */}
        <div className="boxStyle mb-5 flex flex-col md:flex-row items-center md:items-center md:gap-5 gap-3 relative">
          {/* Image */}
          <div className="relative">
            {/* <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-6 w-6 bg-[#F67300] flex justify-center items-center rounded-full absolute bottom-0 right-0 border-2 border-white cursor-pointer">
              <Camera size={14} color="white" />
            </div> */}
            <div className="
             w-12 h-12
              rounded-full bg-[#EF7A02] flex items-center justify-center
              text-white text-lg font-semibold
            ">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-[#333333]">{user?.name} </h2>

              <span className="px-2 py-0.5 rounded-md bg-[#2A9A461A] text-[#2A9A46] text-xs font-medium">
                Active
              </span>
            </div>
            <p className="text-sm font-medium text-[#333] mt-1 capitalize ">{user?.role} </p>
            <p className="text-sm text-[#626262]">{user?.email} </p>
          </div>

          {/* Tab Switcher (Floating/Centered at bottom of card or separate?) 
                Based on design, it looks like it attaches to the card or is just below. 
                Let's put it at the bottom center of this card container effectively.
            */}
          {/* Tab Switcher */}
          <div className="mt-6 md:mt-0 md:absolute md:-bottom-5 md:left-1/2 md:transform md:-translate-x-1/2 bg-[#F6F6F6] p-1.5 rounded-xl flex gap-1 shadow-sm w-full md:w-auto justify-center ">
            <button
              onClick={() => setCurrentInfo("BasicInfo")}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ease-in-out cursor-pointer ${currentInfo === "BasicInfo"
                ? "bg-white shadow-sm text-[#333333]"
                : "text-[#626262] hover:text-black hover:bg-gray-200/50"
                }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setCurrentInfo("AcademicInfo")}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ease-in-out cursor-pointer ${currentInfo === "AcademicInfo"
                ? "bg-white shadow-sm text-[#333333]"
                : "text-[#626262] hover:text-black hover:bg-gray-200/50"
                }`}
            >
              Academic Details
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-12">
          {currentInfo === "BasicInfo" ? <BasicInfo /> : <AcademicInfo />}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
