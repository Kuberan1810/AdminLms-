import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  label: React.ReactNode;
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between gap-2
          w-full sm:min-w-[140px]
          bg-[#FAFAFA] border border-[#E5E5E5]
          rounded-xl
          px-3 sm:px-6
          py-2
          text-xs sm:text-sm
        "
      >
        <span className="text-[#333] truncate">
          {selected}
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="
            absolute right-0 mt-2
            w-full sm:w-auto
            min-w-full sm:min-w-[140px]
            bg-white border border-[#E5E5E5]
            rounded-xl shadow-lg z-50
          "
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                onSelect(opt);
                setOpen(false);
              }}
              className="
                px-4 py-2
                text-xs sm:text-sm
                cursor-pointer
                hover:bg-[#F5F7FF]
                whitespace-nowrap
              "
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
