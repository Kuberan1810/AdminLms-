import EnrolledClasses from "./EnrolledClasses";
import { useMyCourses } from "../../../../hooks/useMyCourses";

export default function DashboardData() {
    const { data: classes = [], isLoading } = useMyCourses();

    return (
        <EnrolledClasses
            classes={classes}
            isLoading={isLoading}
        />
    );
}
