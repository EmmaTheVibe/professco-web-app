"use client";
import CourseList from "@/app/_components/course/CourseList/CourseList";
import styles from "./CourseSegment.module.css";
import useCourses from "@/app/courses/useCourses";
import { exams } from "@/app/_utils/data";
import ReusableNav from "@/app/_components/navigation/ReusableNav/ReusableNav";
import useFilterStore from "@/app/_utils/filter-store";

export default function CourseSegment({ showAll = false }) {
  const { courses, isLoading, count, error, isFetching } = useCourses();
  const activeTab = useFilterStore((state) => state.activeTab);
  const setActiveTab = useFilterStore((state) => state.setActiveTab);

  return (
    <div className={styles.courseSegment}>
      <ReusableNav
        tabs={exams}
        paramName="exam"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resetPage={true}
      />
      <CourseList
        showAll={showAll}
        courses={courses}
        loading={isLoading}
        count={count}
        isFetching={isFetching}
      />
    </div>
  );
}
