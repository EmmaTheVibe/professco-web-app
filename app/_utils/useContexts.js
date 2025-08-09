// app/_utils/useContexts.js
"use client";
import { useContext } from "react";
import { ContextCreator } from "./Contexts";

function useContexts() {
  // CORRECTED: Call useContext unconditionally at the top level.
  // If this component is rendered on the server, useContext will return null.
  // If this component is rendered on the client but *not* inside ContextProvider, it will also return null.
  const context = useContext(ContextCreator);

  // Now, check the *result* of useContext.
  // If context is null, it means either:
  // 1. We are on the server (typeof window === 'undefined').
  // 2. We are on the client, but this component is not a child of ContextProvider.
  if (!context) {
    // For debugging, you might want a more specific message depending on env
    // console.warn("useContexts: Context is null. This is expected on server or if ContextProvider is missing.");

    // Return default/mock values when context is not available.
    // This provides a safe fallback for server-side pre-rendering
    // and for client-side components not wrapped by the provider.
    return {
      activeTab: "ALL",
      setActiveTab: () => {
        /* no-op */
      },
      activeCourseTab: "About",
      setActiveCourseTab: () => {
        /* no-op */
      },
      examTypeList: [],
      setExamTypeList: () => {
        /* no-op */
      },
      addExamType: () => {
        /* no-op */
      },
      formatTabForUrl: (tab) =>
        tab.toLowerCase().replace(/\s+/g, "-").replace("& ", ""),
    };
  }

  // If context is available, return it.
  return context;
}

export default useContexts;
