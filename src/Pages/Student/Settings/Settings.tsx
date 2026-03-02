import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Mail,
  HelpCircle,
  FileText,
  Shield,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const navigate = useNavigate();

  const goPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full  flex items-center justify-center  ">
      
      {/* Responsive Container */}
      <div className="
        w-full 
        shadow-2xl 
        rounded-xl 
        overflow-hidden
      ">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 bg-white">
          <ArrowLeft
            size={20}
            className="cursor-pointer hover:text-orange-500 transition"
            onClick={goPreviousPage}
          />
          <h1 className="text-base md:text-lg font-semibold">
            Settings
          </h1>
        </div>

        <div className="p-6 space-y-8">

          {/* Profile Card */}
          <div className="bg-white rounded-xl p-5 flex items-center gap-4  hover:shadow-md transition">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <p className="text-base font-medium">
                Name of the Instructor
              </p>
              <p className="text-sm text-gray-500">
                Instructor Id
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="text-sm text-gray-500 mb-3 font-medium">
              Notifications
            </h2>

            <div className="bg-white rounded-xl divide-y ">

              {/* Push Notification */}
              <div className="flex items-center justify-between px-6 py-4 border border-[#E5E5E5]">
                <div className="flex items-center gap-4">
                  <Bell size={18} className="text-gray-500" />
                  <span className="text-sm md:text-base">
                    Push Notification
                  </span>
                </div>

                <button
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                    pushEnabled ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full  transform transition cursor-pointer ${
                      pushEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Email Notification */}
              <div className="flex items-center justify-between px-6 py-4 border border-[#E5E5E5]">
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-gray-500" />
                  <span className="text-sm md:text-base">
                    Email Notification
                  </span>
                </div>

                <button
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                    emailEnabled ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition cursor-pointer ${
                      emailEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h2 className="text-sm text-gray-500 mb-3 font-medium">
              Support & Legal
            </h2>

            <div className="bg-white rounded-xl divide-y ">

              <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition border border-[#E5E5E5] cursor-pointer">
                <div className="flex items-center gap-4">
                  <HelpCircle size={18} className="text-gray-500" />
                  <span className="text-sm md:text-base">
                    Help Center
                  </span>
                </div>
                <span className="text-gray-400"><ChevronDown /></span>
              </div>

              <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition border border-[#E5E5E5] cursor-pointer">
                <div className="flex items-center gap-4">
                  <FileText size={18} className="text-gray-500" />
                  <span className="text-sm md:text-base">
                    Terms of Service
                  </span>
                </div>
                <span className="text-gray-400"><ChevronDown /></span>
              </div>

              <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition border border-[#E5E5E5] cursor-pointer">
                <div className="flex items-center gap-4">
                  <Shield size={18} className="text-gray-500" />
                  <span className="text-sm md:text-base">
                    Privacy Policy
                  </span>
                </div>
                <span className="text-gray-400"><ChevronDown /></span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="flex justify-center">
<button className="w-1/2 border border-orange-500 text-orange-500 py-3 rounded-lg text-sm md:text-base hover:bg-orange-50 transition font-medium cursor-pointer">
            Log Out
          </button>
          </div>
          

        </div>
      </div>
    </div>
  );
}
