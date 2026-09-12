"use client";

import { useState } from "react";
import TabNav from "@/app/_components/navigation/TabNav/TabNav";
import EmptyState from "@/app/_components/common/EmptyState/EmptyState";
import MyCoursesGrid from "@/app/_components/student/MyCoursesGrid/MyCoursesGrid";

const tabs = ["My courses", "Completed", "Saved"];

const emptyStateCopy: Record<string, { heading: string; description: string }> = {
  "my courses": {
    heading: "No courses yet",
    description: "You have not bought any courses yet",
  },
  completed: {
    heading: "No completed courses yet",
    description: "You haven't completed any courses yet",
  },
  saved: {
    heading: "No saved courses yet",
    description: "You haven't saved any courses yet",
  },
};

export default function MyCoursesContent() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const copy =
    emptyStateCopy[activeTab.toLowerCase()] || emptyStateCopy["my courses"];
  const isMyCourses = activeTab.toLowerCase() === "my courses";

  return (
    <div>
      <TabNav
        tabs={tabs}
        paramName="view"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resetPage={false}
      />
      {isMyCourses ? (
        <MyCoursesGrid />
      ) : (
        <EmptyState
          illustration="/images/empty-student-courses.png"
          heading={copy.heading}
          description={copy.description}
          cta={{ label: "Explore Professco", href: "/student" }}
        />
      )}
    </div>
  );
}
