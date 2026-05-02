import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InstructorStats from "./section/InstructorStats";
import InstructorFilters from "./section/InstructorFilters";
import InstructorTable from "./section/InstructorTable";
import { instructorMockData } from "../../../../data/InstructorMockData";
import type { InstructorData } from "../../../../data/InstructorMockData";

const Instructors = () => {
  const navigate = useNavigate();
  
  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Local data state for deletions
  const [instructorsList, setInstructorsList] = useState<InstructorData[]>(instructorMockData);

  const handleDelete = (id: string) => {
    setInstructorsList((prev) => prev.filter((inst) => inst.id !== id));
  };

  // Apply filters and sorting
  const filteredInstructors = useMemo(() => {
    let result = [...instructorsList];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (inst) =>
          inst.name.toLowerCase().includes(query) ||
          inst.instructorId.toLowerCase().includes(query) ||
          inst.email.toLowerCase().includes(query)
      );
    }

    // 2. Status Filter
    if (filterStatus !== "All") {
      result = result.filter((inst) => inst.status === filterStatus);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === "Name A-Z") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "Name Z-A") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "Newest") {
        const dateA = new Date(a.joinedDate || 0).getTime();
        const dateB = new Date(b.joinedDate || 0).getTime();
        return dateB - dateA;
      }
      if (sortBy === "Oldest") {
        const dateA = new Date(a.joinedDate || 0).getTime();
        const dateB = new Date(b.joinedDate || 0).getTime();
        return dateA - dateB;
      }
      return 0;
    });

    return result;
  }, [instructorsList, searchQuery, filterStatus, sortBy]);

  return (
    <section className="pb-6 space-y-6">
      <InstructorStats />
      <InstructorFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <InstructorTable 
        instructors={filteredInstructors} 
        onSelect={(instructor) => navigate(`/admin/users/instructors/${instructor.instructorId}`)} 
        onDelete={handleDelete}
      />
    </section>
  );
};

export default Instructors;
