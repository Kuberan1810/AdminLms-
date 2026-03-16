
import { Mail, Phone, User/*, Lock, Eye, EyeOff*/ } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

const Profile_Info = () => {
    const { profile } = useSelector((state: RootState) => state.instructor);

    /*
    const [code, setCode] = useState('+91');

    // Password Change State
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
    */

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
                        <div className="pl-6">
                            <span className="text-[#333333] dark:text-gray-200 font-medium">{profile.email || "indhu@gmail.com"}</span>
                        </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-[#F67300]" />
                            <span className="text-[#F67300] text-sm font-medium">Phone:</span>
                        </div>
                        <div className="pl-6">
                        <div className="pl-6">
                            <span className="text-[#333333] dark:text-gray-200 font-medium">{profile.phone || "+91 9876543210"}</span>
                        </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Profile_Info