import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, User, Camera, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();

  // Initial user state
  const [profile, setProfile] = useState({
    name: "Name of the admin",
    email: "indhu@gmail.com",
    phone: "9876543210",
    phoneCode: "+91",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=9"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countryCodes = [
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Australia", code: "+61" },
    { name: "Canada", code: "+1" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
    setChangingPassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEditClick = () => {
    setEditForm(profile);
    setIsEditing(true);
    setChangingPassword(false);
  };

  return (
    <div className="">
      <div className="space-y-6">
        
        {/* Back Button & Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-transparent rounded-full hover:bg-gray-100 dark:hover:bg-[#333] transition-all cursor-pointer border border-transparent dark:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[20px] font-semibold text-[#111827] dark:text-white">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl p-4 md:p-6 transition-colors border border-[#F1F5F9] dark:border-[#363636] flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden flex justify-center items-center">
                <img src={profile.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="h-6 w-6 bg-[#F6810C] flex justify-center items-center rounded-full absolute bottom-0 right-0 border-2 border-white dark:border-[#2A2A2A] text-white">
                <Camera size={12} />
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-[18px] text-[#222222] dark:text-white leading-tight mb-1">{profile.name}</h2>
              <p className="text-[14px] text-[#64748B] dark:text-[#A3A3A3] font-medium leading-normal lowercase">{profile.role}</p>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl p-4 md:p-6 transition-colors border border-[#F1F5F9] dark:border-[#363636]">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Top Row in Edit Mode */}
              <div className="flex items-center justify-between mb-6 bg-[#FFF5EB] dark:bg-[#3d271d] p-3 rounded-xl">
                <div className="flex items-center gap-2 text-[#F6810C] font-semibold">
                  <User size={20} />
                  <span className="text-[16px]">Personal Details</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#F6810C] hover:bg-[#E06F04] text-white font-bold rounded-xl text-[14px] cursor-pointer transition-all"
                >
                  Save
                </button>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F6810C] font-medium">
                  <Mail size={16} />
                  <span className="text-[14px]">Email:</span>
                </div>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 bg-transparent dark:text-white font-['Urbanist'] text-[15px]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F6810C] font-medium">
                  <Phone size={16} />
                  <span className="text-[14px]">Phone:</span>
                </div>
                <div className="flex gap-2">
                  <select
                    value={editForm.phoneCode}
                    onChange={(e) => setEditForm({ ...editForm, phoneCode: e.target.value })}
                    className="border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 bg-transparent dark:text-white font-['Urbanist'] text-[15px] max-w-[90px] focus:outline-none"
                  >
                    {countryCodes.map((c, i) => (
                      <option key={i} value={c.code} className="dark:bg-[#2A2A2A]">
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="flex-1 border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 bg-transparent dark:text-white font-['Urbanist'] text-[15px]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                {!changingPassword ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#F6810C] font-medium">
                      <Lock size={16} />
                      <span className="text-[14px]">Password:</span>
                    </div>
                    <div className="flex items-center justify-between border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 bg-transparent select-none">
                      <span className="text-[#64748B] tracking-wider">*********</span>
                      <button
                        type="button"
                        onClick={() => setChangingPassword(true)}
                        className="px-4 py-1.5 bg-[#F6810C] hover:bg-[#E06F04] text-white font-bold rounded-lg text-[12px] transition-all cursor-pointer select-none"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* New Password */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#F6810C] font-medium">
                        <Lock size={16} />
                        <span className="text-[14px]">New Password:</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 pr-10 bg-transparent dark:text-white font-['Urbanist'] text-[15px]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#475569] cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {/* Password requirements list */}
                      <div className="text-[12px] text-[#64748B] dark:text-[#A3A3A3] space-y-1 pl-2 select-none leading-normal">
                        <p className="font-semibold text-[#4B5563] dark:text-gray-400 mb-1">Password must contain:</p>
                        <p className="flex items-center gap-2 before:content-['•'] before:text-[#F6810C]">At least 1 Upper case letter</p>
                        <p className="flex items-center gap-2 before:content-['•'] before:text-[#F6810C]">At least 1 Number</p>
                        <p className="flex items-center gap-2 before:content-['•'] before:text-[#F6810C]">At least 1 Characters</p>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#F6810C] font-medium">
                        <Lock size={16} />
                        <span className="text-[14px]">Confirm New Password:</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-3 pr-10 bg-transparent dark:text-white font-['Urbanist'] text-[15px]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#475569] cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6 bg-[#FFF5EB] dark:bg-[#3d271d] p-3 rounded-xl">
                <div className="flex items-center gap-2 text-[#F6810C] font-semibold">
                  <User size={20} />
                  <span className="text-[16px]">Personal Details</span>
                </div>
                <button
                  onClick={handleEditClick}
                  className="px-6 py-2 bg-[#F6810C] hover:bg-[#E06F04] text-white font-bold rounded-xl text-[14px] cursor-pointer transition-all"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-6 pl-2">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#F6810C]" />
                    <span className="text-[#F6810C] text-[14px] font-medium">Email:</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-[#222222] dark:text-gray-200 font-medium text-[15px]">{profile.email}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#F6810C]" />
                    <span className="text-[#F6810C] text-[14px] font-medium">Phone:</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-[#222222] dark:text-gray-200 font-medium text-[15px]">{profile.phoneCode} {profile.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
