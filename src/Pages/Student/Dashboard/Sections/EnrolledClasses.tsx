import BtnCom from "../../../../Components/Student/BtnCom";
import { type Course } from "./EnrollCoursesType";
import EnrolledClassesCard from "./EnrolledClassesCard";
import EnrolledClassesCardSkeleton from "../../../../Components/Student/EnrolledClassesSkeleton";

interface Props {
  classes: Course[];
  isLoading?: boolean;
  onCardClick?: (course: Course) => void;
}

function EnrolledClasses({ classes, isLoading, onCardClick }: Props) {
  return (
    <section className="boxStyle">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-4 md:mb-3 sm:mb-3">
        <h3 className="text-xl lg:text-2xl font-semibold text-primary">
          Recent enrolled courses
        </h3>
        <BtnCom label="View all" />
      </div>

      {/* ===== Cards ===== */}
      <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 max-md:grid-flow-col max-md:auto-cols-[80vw] max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory scrollbar-hide p-2">
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="">
              <EnrolledClassesCardSkeleton />
            </div>
          ))}

        {/* Empty */}
        {!isLoading && classes.length === 0 && (
          <p className="text-gray-500">No enrolled courses found</p>
        )}

        {/* Success */}
        {!isLoading &&
          classes.map((course) => (
            <div
              key={course.course_id}   // ✅ CORRECT KEY
              className=""
            >
              <EnrolledClassesCard
                course={course}
                onClick={() => onCardClick?.(course)}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default EnrolledClasses;
