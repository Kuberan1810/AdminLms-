import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import Dropdown from "../component/common/Dropdown";

interface Props {
  onChange: (value: "name" | "mark") => void;
}

const SortDropdown = ({ onChange }: Props) => {
  const [selected, setSelected] = useState("Sort");

  return (
    <Dropdown
      label={
        <div className="flex items-center gap-1 sm:gap-2 text-gray-700 text-xs sm:text-sm md:text-base">
          <ArrowUpDown
            size={14}
            className="text-gray-500 sm:w-4 sm:h-4"
          />
          <span className="whitespace-nowrap">{selected}</span>
        </div>
      }
      options={["Student Name", "Mark"]}
      onSelect={(val) => {
        setSelected(val);

        if (val === "Mark") onChange("mark");
        else onChange("name");
      }}
    />
  );
};

export default SortDropdown;
