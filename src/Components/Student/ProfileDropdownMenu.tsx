interface ProfileDropdownMenuProps {
    onLogoutClick: () => void;
    onProfileClick: () => void;
    onSettingsClick?: () => void;   // 👈 add this
}

const ProfileDropdownMenu = ({
    onLogoutClick,
    onProfileClick,
    onSettingsClick,
}: ProfileDropdownMenuProps) => {
    return (
        <div className="absolute right-0 mt-3 w-48 sm:w-56 rounded-2xl bg-white shadow-lg border border-[#F2EEF4] p-2 sm:p-3 z-50">

            {/* <button
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#333333] hover:bg-[#F7F5F9] transition cursor-pointer"
                onClick={onProfileClick}
            >
                My Profile
            </button> */}

            {/* ✅ NEW SETTINGS OPTION */}
            {/* <button
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#333333] hover:bg-[#F7F5F9] transition cursor-pointer"
                onClick={onSettingsClick}
            >
                Settings
            </button> */}

            <button
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                onClick={onLogoutClick}
            >
                Log out
            </button>
        </div>
    );
};

export default ProfileDropdownMenu;
