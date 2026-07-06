"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import useFilterStore from "./filter-store";
import useCartStore from "./cart-store";

const ContextCreator = createContext();

const validExams = [
  "all",
  "suggested",
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

function ContextProvider({ children }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setActiveTab = useFilterStore((state) => state.setActiveTab);
  const initCart = useCartStore((state) => state.initCart);

  const [activeCourseTab, setActiveCourseTab] = useState(
    formatTabForDisplay(defaultCourseTab)
  );

  // Initialize cart from localStorage
  useEffect(() => {
    initCart();
  }, [initCart]);

  // Sync URL params to stores/state
  useEffect(() => {
    const defaultExam = pathname?.startsWith("/student") ? "suggested" : "all";
    const rawExam = searchParams?.get("exam")?.toLowerCase();
    const examValue = validExams.includes(rawExam || "") ? rawExam : defaultExam;
    setActiveTab(examValue.toUpperCase());

    const rawCourseTabFromUrl = searchParams?.get("t")?.toLowerCase();
    const displayFormatTab = formatTabForDisplay(rawCourseTabFromUrl);

    const newCourseTab = validCourseTabs.includes(
      displayFormatTab.toLowerCase()
    )
      ? displayFormatTab
      : formatTabForDisplay(defaultCourseTab);

    setActiveCourseTab(newCourseTab);
  }, [searchParams, pathname, setActiveTab]);

  return (
    <ContextCreator.Provider
      value={{
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
