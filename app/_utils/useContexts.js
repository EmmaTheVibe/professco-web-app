"use client";
import { useContext } from "react";
import { ContextCreator } from "./Contexts";

function useContexts() {
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
