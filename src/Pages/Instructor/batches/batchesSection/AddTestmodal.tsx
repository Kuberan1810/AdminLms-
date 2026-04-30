import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, X } from "lucide-react";
import { capitalizeWords } from "../../../../utils/capitalize";

export default function AddTestModal({
    isOpen,
    onClose,
    onAdd,
}: {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: {
        name: string;
        date: Date | null;
    }) => void;
}) {
    const [testName, setTestName] = useState("");
    const [testDate, setTestDate] = useState<Date | null>(new Date());

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!testName || !testDate) return;

        onAdd({
            name: testName,
            date: testDate,
        });

        setTestName("");
        setTestDate(null);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-1200 p-4 font-['Urbanist'] animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-7 w-full max-w-[380px] shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]">Add New Test</h3>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#333]">Test Title</label>
                        <input
                            value={testName}
                            onChange={(e) => setTestName(capitalizeWords(e.target.value))}
                            placeholder="Enter test title"
                            autoCapitalize="words"
                            className="w-full border border-[#F2EEF4] p-3 rounded-xl text-[#333] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 focus:border-[#F67300] transition-all bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#333]">Scheduled Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={testDate}
                                onChange={(date: Date | null) => setTestDate(date)}
                                dateFormat="dd / MM / yyyy"
                                placeholderText="Select date"
                                className="w-full border border-[#F2EEF4] p-3 pr-11 rounded-xl text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 focus:border-[#F67300] transition-all bg-white"
                            />
                            <Calendar
                                size={18}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-[#F2EEF4] text-[#808080] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!testName || !testDate}
                        className={`flex-1 py-3 rounded-xl bg-[#F67300] text-white font-bold hover:bg-[#fa943a] transition-all shadow-md shadow-orange-100 cursor-pointer ${(!testName || !testDate) && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
