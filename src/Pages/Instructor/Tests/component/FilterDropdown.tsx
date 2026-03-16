import { useState } from "react";
import { Filter } from "lucide-react";
import Dropdown from "../component/common/Dropdown";

interface Props {
   onChange: (value: "all" | "submitted" | "not_attended") => void;
}

const FilterDropdown = ({ onChange }: Props) => {
  const [selected, setSelected] = useState("Filter");

  return (
    <Dropdown
      label={
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-700">
          <Filter
            size={14}
            className="text-gray-500 sm:w-6 sm:h-4"
          />
          <span className="whitespace-nowrap">{selected}</span>
        </div>
      }
      options={["All", "Submitted", "Not attended"]}
      onSelect={(val) => {
        setSelected(val);

        if (val === "Submitted") onChange("submitted");
        else if (val === "Not attended") onChange("not_attended");
        else onChange("all");
      }}
    />
  );
};

export default FilterDropdown;
