import React from "react";
import { Mail, Phone, User, Lock, Eye, EyeOff } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../store/store";
import { updateInstructorInfo } from "../../../../store/slices/InstructorSlice";

const Profile_Info = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.instructor);
    const [editMode, setEditMode] = React.useState(false);
    const [tempInfo, setTempInfo] = React.useState(profile);
    const [code, setCode] = React.useState('+91');

    // Password Change State
    const [changingPassword, setChangingPassword] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const countryCodes = [
        { name: "India", code: "+91" },
        { name: "United States", code: "+1" },
        { name: "United Kingdom", code: "+44" },
        { name: "Australia", code: "+61" },
        { name: "Canada", code: "+1" },
    ];

    const handleEdit = () => {
        setEditMode(true);
        setTempInfo(profile);
        setChangingPassword(false);
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSave = () => {
        dispatch(updateInstructorInfo(tempInfo));
        setEditMode(false);
        setChangingPassword(false);
    };

    const handleChange = (field: keyof typeof tempInfo, value: string) => {
        setTempInfo((prev: typeof tempInfo) => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <div className="rounded-lg mb-6">

                <div className="flex items-center justify-between mb-6 bg-[#FFF5EB] dark:bg-[#3d271d] p-3 rounded-lg border border-transparent dark:border-[#4d3125]">
                    <div className="flex items-center gap-2 text-[#F67300] font-medium">
                        <User size={20} className="md:w-5 md:h-5" />
                        <span className="text-base">Personal Details</span>
                    </div>
{/* 
                    {!editMode ? (
                        <button
                            onClick={handleEdit}
                            className="px-6 py-2 text-sm bg-[#F67300] text-white rounded-lg hover:bg-orange-700 w-fit font-medium"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 text-sm bg-[#F67300] text-white rounded-lg hover:bg-orange-700 w-fit font-medium"
                        >
                            Save
                        </button>
                    )} */}
                </div>

                <div className="space-y-6 pl-2">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-[#F67300]" />
                            <span className="text-[#F67300] text-sm font-medium">Email:</span>
                        </div>
                        <div className="pl-6">
                            {editMode ? (
                                <input
                                    type="email"
                                    value={tempInfo.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-4 py-2 w-full max-w-md outline-none focus:border-[#F67300] text-[#333333] dark:text-white dark:bg-[#1E1E1E]"
                                />
                            ) : (
                                <span className="text-[#333333] dark:text-gray-200 font-medium">{profile.email || "indhu@gmail.com"}</span>
                            )}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-[#F67300]" />
                            <span className="text-[#F67300] text-sm font-medium">Phone:</span>
                        </div>
                        <div className="pl-6">
                            {editMode ? (
                                <div className="flex gap-3 max-w-md">
                                    <div className="relative">
                                        <select
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            className="border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-3 py-2 outline-none focus:border-[#F67300] bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-white appearance-none pr-8 cursor-pointer h-full"
                                        >
                                            {countryCodes.map((c, i) => (
                                                <option key={i} value={c.code}>
                                                    {c.code}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                    <input
                                        type="tel"
                                        value={tempInfo.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-4 py-2 w-full outline-none focus:border-[#F67300] text-[#333333] dark:text-white dark:bg-[#1E1E1E]"
                                    />
                                </div>

                            ) : (
                                <span className="text-[#333333] dark:text-gray-200 font-medium">{profile.phone || "+91 9876543210"}</span>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    {editMode && (
                        !changingPassword ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Lock size={16} className="text-[#F67300]" />
                                    <span className="text-[#F67300] text-sm font-medium">Password:</span>
                                </div>
                                <div className="pl-6">
                                    <div className="flex items-center justify-between border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-4 py-1 w-full max-w-md bg-white dark:bg-[#1E1E1E]">
                                        <span className="text-[#333333] dark:text-white font-medium tracking-widest mt-1">*********</span>
                                        <button
                                            onClick={() => setChangingPassword(true)}
                                            className="bg-[#F67300] text-white text-xs px-3 py-1 rounded-md hover:bg-orange-600"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* New Password */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Lock size={16} className="text-[#F67300]" />
                                        <span className="text-[#F67300] text-sm font-medium">New Password:</span>
                                    </div>
                                    <div className="pl-6">
                                        <div className="relative w-full max-w-md">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-4 py-2 w-full outline-none focus:border-[#F67300] text-[#333333] dark:text-white dark:bg-[#1E1E1E] pr-10"

                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>

                                        {/* Checklist */}
                                        <div className="mt-3">
                                            <p className="text-sm text-[#333333] dark:text-gray-300 mb-2">Password must contain:</p>
                                            <ul className="space-y-1">
                                                <li className="flex items-center gap-2 text-xs text-[#333333] dark:text-gray-400">
                                                    <span className="w-2 h-2 rounded-full bg-[#F67300]"></span>
                                                    At least 1 Upper case letter
                                                </li>
                                                <li className="flex items-center gap-2 text-xs text-[#333333] dark:text-gray-400">
                                                    <span className="w-2 h-2 rounded-full bg-[#F67300]"></span>
                                                    At least 1 Number
                                                </li>
                                                <li className="flex items-center gap-2 text-xs text-[#333333] dark:text-gray-400">
                                                    <span className="w-2 h-2 rounded-full bg-[#F67300]"></span>
                                                    At least 1 Characters
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Lock size={16} className="text-[#F67300]" />
                                        <span className="text-[#F67300] text-sm font-medium">confirm New Password:</span>
                                    </div>
                                    <div className="pl-6">
                                        <div className="relative w-full max-w-md">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="border border-[#d3d3d3] dark:border-[#363636] rounded-lg px-4 py-2 w-full outline-none focus:border-[#F67300] text-[#333333] dark:text-white dark:bg-[#1E1E1E] pr-10"

                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">Password must be the same</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile_Info