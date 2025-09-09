"use client";
import { courseDetailTabs } from "@/app/_utils/data";
import ReusableNav from "../ReusableNav/ReusableNav";
import styles from "./TabSystem.module.css";
import AboutTab from "../AboutTab/AboutTab";
import InstructorsTab from "../InstructorsTab/InstructorsTab";
import ContentTab from "../ContentTab/ContentTab";
import ResourcesTab from "../ResourcesTab/ResourcesTab";
import ReviewsTab from "../ReviewsTab/ReviewsTab";
import useContexts from "@/app/_utils/useContexts";

export default function TabSystem({ course, moduleId }) {
  const contexts = useContexts();
  const activeTab = contexts.activeCourseTab;

  const renderTabContent = () => {
    switch (activeTab?.toLowerCase()) {
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
          activeTabKey="activeCourseTab"
          setActiveTabKey="setActiveCourseTab"
          resetPage={false}
        />
      </section>

      <div className={`container ${styles.content}`}>{renderTabContent()}</div>
    </section>
  );
}
