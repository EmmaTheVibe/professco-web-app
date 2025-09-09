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

  const [activeTab, setActiveTab] = useState("ALL");
  const [activeCourseTab, setActiveCourseTab] = useState(
    formatTabForDisplay(defaultCourseTab)
  );
  const [examTypeList, setExamTypeList] = useState([]);

  useEffect(() => {
    const rawExam = searchParams?.get("exam")?.toLowerCase();
    const examValue = validExams.includes(rawExam || "") ? rawExam : "all";
    setActiveTab(examValue.toUpperCase());

    const rawCourseTabFromUrl = searchParams?.get("t")?.toLowerCase();
    const newCourseTab = validCourseTabs.includes(rawCourseTabFromUrl)
      ? formatTabForDisplay(rawCourseTabFromUrl)
      : formatTabForDisplay(defaultCourseTab);

    setActiveCourseTab(newCourseTab);
  }, [searchParams]);

  const addExamType = (name, selectable) => {
    if (!selectable) return;
    setExamTypeList((prevList) =>
      prevList.includes(name)
        ? prevList.filter((item) => item !== name)
        : [...prevList, name]
    );
  };

  return (
    <ContextCreator.Provider
      value={{
        activeTab,
        setActiveTab,
        examTypeList,
        setExamTypeList,
        addExamType,
        activeCourseTab,
        setActiveCourseTab,
        formatTabForUrl,
      }}
    >
      {children}
    </ContextCreator.Provider>
  );
}

export { ContextCreator, ContextProvider };
