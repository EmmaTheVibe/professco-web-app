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

export default function TabSystem() {
  const contexts = useContexts();
  const activeTab = contexts.activeCourseTab; // This will now be derived from 't' param

  const renderTabContent = () => {
    switch (activeTab?.toLowerCase()) {
      case "about":
        return <AboutTab />;
      case "instructors":
        return <InstructorsTab />;
      case "course content":
        return <ContentTab />;
      case "resources & materials":
        return <ResourcesTab />;
      case "reviews":
        return <ReviewsTab />;
      default:
        // Default to "about" if activeCourseTab is not set or invalid
        return <AboutTab />;
    }
  };

  return (
    <section className={styles.tabSystem}>
      <section className={styles.navbox}>
        <ReusableNav
          tabs={courseDetailTabs}
          // Removed type="hash" as ReusableNav is now param-only
          paramName="t" // NEW: Explicitly set paramName to "t"
          activeTabKey="activeCourseTab"
          setActiveTabKey="setActiveCourseTab"
          resetPage={false}
        />
      </section>

      <div className={`container ${styles.content}`}>{renderTabContent()}</div>
    </section>
  );
}
