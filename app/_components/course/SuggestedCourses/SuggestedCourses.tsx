"use client";

import ReusableNav from "@/app/_components/navigation/ReusableNav/ReusableNav";
import CourseList from "@/app/_components/course/CourseList/CourseList";
import SuggestedRows from "./SuggestedRows";
import useCourses from "@/app/_hooks/useCourses";
import useFilterStore from "@/app/_utils/filter-store";
import styles from "./SuggestedCourses.module.css";

const suggestedCourseTabs = [
  "Suggested",
  "ICAN",
  "ACCA",
  "CFA",
  "CIMA",
  "CITN",
  "CIS",
  "ATS",
  "CIPM",
];

function RegularCourseGrid() {
  const { courses, isLoading, count, isFetching } = useCourses();

  return (
    <CourseList
      showAll
      courses={courses}
      loading={isLoading}
      count={count}
      isFetching={isFetching}
    />
  );
}

export default function SuggestedCourses() {
  const activeTab = useFilterStore((state) => state.activeTab);
  const setActiveTab = useFilterStore((state) => state.setActiveTab);
  const isSuggested = activeTab?.toLowerCase() === "suggested";

  return (
    <section className={styles.suggestedCourses}>
      <div className="container">
        <ReusableNav
          tabs={suggestedCourseTabs}
          paramName="exam"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hideBorder
          resetPage={true}
        />

        {isSuggested ? <SuggestedRows /> : <RegularCourseGrid />}
      </div>
    </section>
  );
}
