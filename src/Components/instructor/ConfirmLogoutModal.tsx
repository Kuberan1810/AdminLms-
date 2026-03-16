interface ConfirmLogoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmLogoutModal = ({ onConfirm, onCancel }: ConfirmLogoutModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-999">
            <div className=" w-100 p-6 shadow-xl boxStyle">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Are you sure?
                </h3>

                <p className="text-sm text-[#626262] mb-6">
                    Do you really want to log out?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-[#F7F5F9] text-[#333333] hover:bg-[#EFEAF3] cursor-pointer dark:bg-[#3a3a3a] dark:text-white dark:hover:bg-[#2a2a2a]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLogoutModal;
