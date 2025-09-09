"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useState, useEffect } from "react";

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

  const formatTabForDisplay = (urlParam) => {
    if (!urlParam) return defaultCourseTab;
    return urlParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Materials", "& Materials");
  };

  const formatTabForUrl = (displayTab) => {
    return displayTab.toLowerCase().replace("& ", "").replace(/\s+/g, "-");
  };

  const [activeTab, setActiveTab] = useState(examValue.toUpperCase());

  const rawCourseTabFromUrl = searchParams?.get("t")?.toLowerCase();
  const initialCourseTab = validCourseTabs.includes(rawCourseTabFromUrl)
    ? formatTabForDisplay(rawCourseTabFromUrl)
    : formatTabForDisplay(defaultCourseTab);

  const [activeCourseTab, setActiveCourseTab] = useState(initialCourseTab);

  useEffect(() => {
    const currentUrlTab = searchParams.get("t")?.toLowerCase();
    let newActiveCourseTab = null;

    if (currentUrlTab && validCourseTabs.includes(currentUrlTab)) {
      newActiveCourseTab = formatTabForDisplay(currentUrlTab);
    } else {
      newActiveCourseTab = formatTabForDisplay(defaultCourseTab);
    }

    if (newActiveCourseTab !== activeCourseTab) {
      setActiveCourseTab(newActiveCourseTab);
    }
  }, [searchParams]);

  const [examTypeList, setExamTypeList] = useState([]);

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
