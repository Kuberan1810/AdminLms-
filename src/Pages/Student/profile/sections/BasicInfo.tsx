import React from "react";
import { Mail, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { useAuth } from "../../../../context/AuthContext";
const BasicInfo = () => {
    const studentInfo = useSelector((state: RootState) => state.student);
    const { user } = useAuth();
    // State management
    const [tempInfo, setTempInfo] = React.useState(studentInfo);

    // const countryCodes = [
    //     { name: "India", code: "+91" },
    //     { name: "United States", code: "+1" },
    //     { name: "United Kingdom", code: "+44" },
    //     { name: "Australia", code: "+61" },
    //     { name: "Canada", code: "+1" },
    // ];

    const handleChange = (field: keyof typeof tempInfo, value: string) => {
        setTempInfo((prev: typeof tempInfo) => ({ ...prev, [field]: value }));
    };

    // Helper to check password strictness for UI feedback (optional, based on design)
    // const hasUpperCase = /[A-Z]/.test(tempInfo.password);
    // const hasNumber = /[0-9]/.test(tempInfo.password);
    // const hasChars = tempInfo.password.length >= 8; // Assuming 8 as standard for "At least 1 Characters" implies length or special char? Design says "At least 1 Characters" which is vague, assuming length.

    return (
        <div className="boxStyle">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-[#F6730010] dark:bg-[#F6730020] p-4 rounded-lg sticky top-0 z-10 shadow-sm border border-orange-100 dark:border-[#3B3B3B]">
                <div className="flex items-center gap-2 text-[#F67300] font-medium">
                    <User size={20} />
                    <span className="text-base text-[#F67300] dark:text-[#F67300]">Contact Information</span>
                </div>

                {/* <button
                    onClick={handleSave}
                    className="px-6 py-2 text-sm bg-[#F67300] text-white rounded-xl hover:bg-orange-700 font-medium font-md transition-all duration-300 ease-in-out active:scale-95 shadow-md hover:shadow-lg"
                >
                    Save
                </button> */}
            </div>

            <div className="space-y-6 px-1">
                {/* Email */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#F67300]" />
                        <span className="text-[#F67300] font-medium">Email:</span>
                    </div>
                    <div>
                        <input
                            type="email"
                            value={user?.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="border border-[#d3d3d3] dark:border-[#3B3B3B] rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:border-[#F67300] focus:ring-1 focus:ring-orange-200 bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-white transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Phone */}
                {/* <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-[#F67300]" />
                        <span className="text-[#F67300] font-medium">Phone:</span>
                    </div>
                    <div className="flex flex-wrap gap-3 max-w-md">
                        <div className="relative">
                            <select
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="appearance-none border border-[#d3d3d3] rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#F67300] focus:ring-1 focus:ring-orange-200 bg-white text-[#333333] h-full transition-all duration-300 cursor-pointer"
                            >
                                {countryCodes.map((c, i) => (
                                    <option key={i} value={c.code}>{c.code}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <input
                            type="tel"
                            value={tempInfo.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="border border-[#d3d3d3] rounded-lg px-4 py-2 w-full flex-1 min-w-[150px] focus:outline-none focus:border-[#F67300] focus:ring-1 focus:ring-orange-200 text-[#333333] transition-all duration-300"
                        />
                    </div>
                </div> */}

               {/* password */}
                {/* <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2">
                        <Lock size={16} className="text-[#F67300]" />
                        <span className="text-[#F67300] font-medium">Password:</span>
                    </div>

                    {!passwordEditMode ? (
                        <div className="flex items-center gap-4 border border-[#d3d3d3] rounded-lg px-4 py-2 w-full max-w-md bg-white transition-all duration-300 hover:border-orange-300">
                            <span className="flex-1 text-[#333333] tracking-widest">***********</span>
                            <button
                                onClick={() => {
                                    setPasswordEditMode(true);
                                    setTempInfo(prev => ({ ...prev, password: '' }));
                                }}
                                className="px-4 py-1 text-sm bg-[#F67300] text-white rounded-lg hover:bg-orange-600 font-medium transition-all duration-300 active:scale-95"
                            >
                                Change
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 w-full max-w-md">
                          
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={tempInfo.password}
                                        onChange={(e) => handleChange('password', e.target.value)}

                                        className="border border-[#d3d3d3] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#F67300] focus:ring-1 focus:ring-orange-200 text-[#333333] pr-10 bg-white transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="ml-1 space-y-1">
                                <p className="text-xs text-[#333333] mb-1">Password must contain:</p>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${hasUpperCase ? "bg-[#F67300]" : "bg-gray-300"}`}></span>
                                    <span className="text-[10px] text-[#333333]">At least 1 Upper case letter</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${hasNumber ? "bg-[#F67300]" : "bg-gray-300"}`}></span>
                                    <span className="text-[10px] text-[#333333]">At least 1 Number</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${hasChars ? "bg-[#F67300]" : "bg-gray-300"}`}></span>
                                    <span className="text-[10px] text-[#333333]">At least 1 Characters</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}

                                        className="border border-[#d3d3d3] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#F67300] focus:ring-1 focus:ring-orange-200 text-[#333333] pr-10 bg-white transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <span className="text-red-500 text-xs animate-pulse">{passwordError}</span>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={handlePasswordCancel}
                                    className="px-3 py-1 text-sm text-gray-500 hover:text-black font-medium transition-colors hover:underline"
                                >
                                    Cancel
                                </button>
                                
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default BasicInfo
