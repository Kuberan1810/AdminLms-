import { useState } from "react";
import InstructorStats from "./section/InstructorStats";
import InstructorFilters from "./section/InstructorFilters";
import InstructorTable from "./section/InstructorTable";
import InstructorProfile from "./section/InstructorProfile";
import type { InstructorData } from "../../../../data/InstructorMockData";

const Instructors = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorData | null>(null);

  return (

    <section className=" pb-6 space-y-6">
      {!selectedInstructor ? (
        <>
          <InstructorStats />
          <InstructorFilters />
          <InstructorTable onSelect={setSelectedInstructor} />
        </>
      ) : (
        <InstructorProfile
          instructor={selectedInstructor}
          onBack={() => setSelectedInstructor(null)}
        />
      )}
    </section>

  );
};

export default Instructors;