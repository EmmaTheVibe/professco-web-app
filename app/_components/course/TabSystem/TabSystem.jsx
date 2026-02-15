"use client";
import { courseDetailTabs } from "@/app/_utils/data";
import ReusableNav from "@/app/_components/navigation/ReusableNav/ReusableNav";
import styles from "./TabSystem.module.css";
import AboutTab from "@/app/_components/course/AboutTab/AboutTab";
import InstructorsTab from "@/app/_components/course/InstructorsTab/InstructorsTab";
import ContentTab from "@/app/_components/course/ContentTab/ContentTab";
import ResourcesTab from "@/app/_components/course/ResourcesTab/ResourcesTab";
import ReviewsTab from "@/app/_components/course/ReviewsTab/ReviewsTab";
import useContexts from "@/app/_utils/useContexts";

export default function TabSystem({ course, moduleId }) {
  const { activeCourseTab, setActiveCourseTab } = useContexts();

  const renderTabContent = () => {
    switch (activeCourseTab?.toLowerCase()) {
      case "about":
        return <AboutTab course={course} />;
      case "instructors":
        return <InstructorsTab course={course} />;
      case "course content":
        return <ContentTab course={course} moduleId={moduleId} />;
      case "resources & materials":
        return <ResourcesTab course={course} />;
      case "reviews":
        return <ReviewsTab course={course} />;
      default:
        return <AboutTab course={course} />;
    }
  };

  return (
    <section className={styles.tabSystem}>
      <section className={styles.navbox}>
        <ReusableNav
          tabs={courseDetailTabs}
          paramName="t"
          activeTab={activeCourseTab}
          setActiveTab={setActiveCourseTab}
          resetPage={false}
        />
      </section>

      <div className={`container ${styles.content}`}>{renderTabContent()}</div>
    </section>
  );
}
