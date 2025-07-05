"use client";
import CourseList from "@/app/_components/CourseList/CourseList";
import styles from "./CourseSegment.module.css";
import { getAllCourses } from "@/app/_lib/data-service";
import useCourses from "@/app/courses/useCourses";
import { exams } from "@/app/_utils/data";
import ReusableNav from "@/app/_components/ReusableNav/ReusableNav";

export default function CourseSegment({ showAll = false }) {
  // const {courses} = await getAllCourses();
  const { courses, isLoading, count, error, isFetching } = useCourses();
  console.log(courses);
  return (
    <div className={styles.courseSegment}>
      <ReusableNav
        tabs={exams}
        type="param"
        paramName="exam"
        activeTabKey="activeTab"
        setActiveTabKey="setActiveTab"
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
