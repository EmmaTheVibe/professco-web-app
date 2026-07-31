"use client";
import { courseDetailTabs } from "@/app/_utils/data";
import TabNav from "@/app/_components/navigation/TabNav/TabNav";
import styles from "./TabSystem.module.css";
import AboutTab from "@/app/_components/course/AboutTab/AboutTab";
import InstructorsTab from "@/app/_components/course/InstructorsTab/InstructorsTab";
import ContentTab from "@/app/_components/course/ContentTab/ContentTab";
import ResourcesTab from "@/app/_components/course/ResourcesTab/ResourcesTab";
import ReviewsTab from "@/app/_components/course/ReviewsTab/ReviewsTab";
import useContexts from "@/app/_hooks/useContexts";
import { CourseDetail } from "@/app/_utils/types";

interface Props {
  course: CourseDetail;
  moduleId: string | number;
}

export default function TabSystem({ course, moduleId }: Props) {
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
        <TabNav
          tabs={courseDetailTabs}
          paramName="t"
          activeTab={activeCourseTab}
          setActiveTab={setActiveCourseTab}
          resetPage={false}
          actions={
            <div className={styles.actions}>
              <button className={`outlined ${styles.actionBtn}`}>
                <p>Add to Calendar</p>
                <img src="/images/calendar-icon.svg" alt="" />
              </button>
              <button className={`outlined ${styles.actionBtn}`}>
                <p>Share</p>
                <img src="/images/share-icon.svg" alt="" />
              </button>
            </div>
          }
        />
      </section>

      <div className={`container ${styles.content}`}>{renderTabContent()}</div>
    </section>
  );
}
