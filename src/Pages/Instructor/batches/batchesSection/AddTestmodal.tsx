import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export default function AddTestModal({
    setShowTestModal,
    handleAddTestFromParent,
}: {
    setShowTestModal: (value: boolean) => void;
    handleAddTestFromParent: (data: {
        name: string;
        date: Date | null;
    }) => void;
}) {
    const [testName, setTestName] = useState("");
    const [testDate, setTestDate] = useState<Date | null>(null);

    const handleSubmit = () => {
        if (!testName || !testDate) return;

        handleAddTestFromParent({
            name: testName,
            date: testDate,
        });

        setTestName("");
        setTestDate(null);
        setShowTestModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[350px] shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Add Test</h3>

                {/* Test Name */}
                <input
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Test name"
                    className="border border-[#F2EEF4] p-2 rounded-lg w-full mb-4 text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#F67300]"
                />

                {/* Professional Date Picker */}
                <div className="relative mb-5">
                    <DatePicker
                        selected={testDate}
                        onChange={(date: Date | null) => setTestDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select date"
                        className="border border-[#F2EEF4] p-2 pr-10 rounded-lg w-full text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#F67300]"
                    />

                    <Calendar
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626262]"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-5">
                    <button
                        onClick={() => setShowTestModal(false)}
                        className="cursor-pointer hover:bg-gray-100 px-4 py-1.5 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#F67300] hover:bg-[#fa943a] text-white px-5 py-1.5 rounded-lg cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
