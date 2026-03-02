import { useAuth } from "../../context/AuthContext";

interface ProfileInfoProps {
    image: string;
    name: string;
    role: string;
    onClick: () => void;
}

const ProfileInfo = ({ role, onClick }: ProfileInfoProps) => {
    const { user } = useAuth();

    return (
        <div
            className="
        flex items-center cursor-pointer
        gap-2 sm:gap-3
      "
            onClick={onClick}
        >
            {/* Avatar Initial */}
            <div className="
              w-9 h-9 sm:w-10 sm:h-10
              rounded-full bg-[#EF7A02] flex items-center justify-center
              text-white text-lg font-semibold
            ">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>

            {/* Name + Role (hide on mobile) */}
            <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#333333] leading-tight">
                    {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                    {role}
                </p>
            </div>
        </div>
    );
};

export default ProfileInfo;
