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

  // Helper to convert URL param format (e.g., "course-content") to display format (e.g., "Course Content")
  const formatTabForDisplay = (urlParam) => {
    if (!urlParam) return defaultCourseTab; // Default if param is missing
    return urlParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Materials", "& Materials"); // Specific replacement
  };

  // Helper to convert display format (e.g., "Course Content") to URL param format (e.g., "course-content")
  const formatTabForUrl = (displayTab) => {
    return displayTab.toLowerCase().replace("& ", "").replace(/\s+/g, "-");
  };

  // State for exam tabs (remains unchanged)
  const [activeTab, setActiveTab] = useState(examValue.toUpperCase());

  // State for course detail tabs
  // Initialize from 't' param, or default
  const rawCourseTabFromUrl = searchParams?.get("t")?.toLowerCase();
  const initialCourseTab = validCourseTabs.includes(rawCourseTabFromUrl)
    ? formatTabForDisplay(rawCourseTabFromUrl)
    : formatTabForDisplay(defaultCourseTab);

  const [activeCourseTab, setActiveCourseTab] = useState(initialCourseTab);

  // NEW: useEffect to synchronize activeCourseTab with 't' param changes
  // CORRECTED: Removed activeCourseTab and validCourseTabs from dependencies
  useEffect(() => {
    const currentUrlTab = searchParams.get("t")?.toLowerCase();
    let newActiveCourseTab = null;

    if (currentUrlTab && validCourseTabs.includes(currentUrlTab)) {
      newActiveCourseTab = formatTabForDisplay(currentUrlTab);
    } else {
      newActiveCourseTab = formatTabForDisplay(defaultCourseTab);
    }

    // Only update context if the newActiveCourseTab is different from current activeCourseTab
    // This check is crucial to prevent unnecessary re-renders
    if (newActiveCourseTab !== activeCourseTab) {
      setActiveCourseTab(newActiveCourseTab);
    }
  }, [searchParams]); // Dependencies for useEffect: only searchParams

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
        formatTabForUrl: formatTabForUrl, // Keep this if used elsewhere, though not by ReusableNav now
      }}
    >
      {children}
    </ContextCreator.Provider>
  );
}

export { ContextCreator, ContextProvider };
