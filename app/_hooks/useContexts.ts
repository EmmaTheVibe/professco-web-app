"use client";
import { useContext } from "react";
import { ContextCreator } from "@/app/_utils/Contexts";

interface ContextValue {
  activeCourseTab: string;
  setActiveCourseTab: (tab: string) => void;
  formatTabForUrl: (tab: string) => string;
}

function useContexts(): ContextValue {
  const context = useContext(ContextCreator);

  if (!context) {
    return {
      activeCourseTab: "About",
      setActiveCourseTab: () => {},
      formatTabForUrl: (tab) =>
        tab.toLowerCase().replace(/\s+/g, "-").replace("& ", ""),
    };
  }

  return context;
}

export default useContexts;
