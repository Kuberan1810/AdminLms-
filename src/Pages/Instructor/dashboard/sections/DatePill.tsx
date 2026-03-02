interface DatePillProps {
    date: Date;
    attendance?: "present" | "absent";
    isSelected?: boolean;
    onClick?: () => void;
}

const DatePill = ({
    date,
    attendance,
    isSelected = false,
    onClick,
}: DatePillProps) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const dayIndex = d.getDay();
    const isToday = d.getTime() === today.getTime();

    let className = "bg-white border border-[#E5E7EB] text-gray-600";

    if (isToday) {
        className = "text-[#F67300] bg-[#FFEAD8] border";
    } else if (dayIndex === 0) {
        className = "bg-[#FFFD3720] text-primary";
    } else if (d < today) {
        className =
            attendance === "present"
                ? "text-[#3EA465] bg-[#3EA46510]"
                : "text-[#CE1919] bg-[#CE191910]";
    }

    if (isSelected) {
        className += " ring-2 ring-[#F67300]";
    }

    return (
        <button
            onClick={onClick}
            className={`min-w-16 px-3 py-2 rounded-xl text-center cursor-pointer ${className}`}
        >
            <p className="font-semibold text-xs">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <p className="font-semibold">{d.getDate()}</p>
        </button>
    );
};

export default DatePill;
