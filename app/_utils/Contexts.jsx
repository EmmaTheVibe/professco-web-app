"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

const ContextCreator = createContext();

function ContextProvider({ children }) {
  const searchParams = useSearchParams();

  const validExams = [
    "all",
    "ican",
    "acca",
    "cfa",
    "cima",
    "citn",
    "cis",
    "ats",
    "cipm",
  ];

  const rawExam = searchParams?.get("exam")?.toLowerCase();
  const examValue = validExams.includes(rawExam || "") ? rawExam : "all";

  const validCourseTabs = [
    "about",
    "instructors",
    "course content",
    "resources & materials",
    "reviews",
  ];

  const defaultCourseTab = "about";

  const formatTabForDisplay = (tab) => {
    return tab
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Materials", "& Materials");
  };

  const [activeTab, setActiveTab] = useState(examValue.toUpperCase());

  const [activeCourseTab, setActiveCourseTab] = useState(
    formatTabForDisplay(defaultCourseTab)
  );

  const [examTypeList, setExamTypeList] = useState([]);

  const formatTabForUrl = (displayTab) => {
    return displayTab.toLowerCase().replace("& ", "").replace(/\s+/g, "-");
  };

  function addExamType(name, selectable) {
    if (!selectable) return;
    setExamTypeList((prevList) =>
      prevList.includes(name)
        ? prevList.filter((item) => item !== name)
        : [...prevList, name]
    );
  }

  return (
    <ContextCreator.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        examTypeList: examTypeList,
        setExamTypeList: setExamTypeList,
        addExamType: addExamType,
        activeCourseTab: activeCourseTab,
        setActiveCourseTab: setActiveCourseTab,
        formatTabForUrl: formatTabForUrl,
      }}
    >
      {children}
    </ContextCreator.Provider>
  );
}

export { ContextCreator, ContextProvider };
