"use client";
import { useContext } from "react";
import { ContextCreator } from "./Contexts";

function useContexts() {
  const context = useContext(ContextCreator);

  if (!context) {
    return {
      activeTab: "ALL",
      setActiveTab: () => {},
      activeCourseTab: "About",
      setActiveCourseTab: () => {},
      examTypeList: [],
      setExamTypeList: () => {},
      addExamType: () => {},
      formatTabForUrl: (tab) =>
        tab.toLowerCase().replace(/\s+/g, "-").replace("& ", ""),
    };
  }

  return context;
}

export default useContexts;
