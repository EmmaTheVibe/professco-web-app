"use client";

import styles from "./ReusableNav.module.css";
import { useEffect, useRef } from "react";
import useContexts from "@/app/_utils/useContexts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ReusableNav({
  tabs,
  type = "param",
  paramName = "exam",
  activeTabKey = "activeTab",
  setActiveTabKey = "setActiveTab",
  resetPage = true,
}) {
  const contexts = useContexts();
  const activeTab = contexts[activeTabKey];
  const setActiveTab = contexts[setActiveTabKey];

  const sliderRef = useRef(null);
  const navRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateSliderPosition = () => {
      const activeIndex = tabs.findIndex(
        (tab) => tab.toLowerCase() === activeTab?.toLowerCase()
      );
      const activeNavItem = navRefs.current[activeIndex];

      if (activeNavItem && sliderRef.current) {
        sliderRef.current.style.width = `${activeNavItem.offsetWidth}px`;
        sliderRef.current.style.left = `${activeNavItem.offsetLeft}px`;
      }
    };

    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);

    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [activeTab, tabs]);

  // Initialize active tab from URL on mount
  useEffect(() => {
    if (type === "param" && searchParams.has(paramName)) {
      const urlTab = searchParams.get(paramName);
      const matchingTab = tabs.find(
        (tab) => tab.toLowerCase() === urlTab.toLowerCase()
      );
      if (matchingTab && matchingTab !== activeTab) {
        setActiveTab(matchingTab);
      }
    } else if (type === "hash" && typeof window !== "undefined") {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash) {
        const displayFormat = hash
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
          .replace("Materials", "& Materials");

        const matchingTab = tabs.find(
          (tab) => tab.toLowerCase() === displayFormat.toLowerCase()
        );
        if (matchingTab && matchingTab !== activeTab) {
          setActiveTab(matchingTab);
        }
      }
    }
  }, [type, paramName, searchParams, tabs, activeTab, setActiveTab]);

  function handleTab(tab) {
    if (type === "param") {
      const urlTab = tab.toLowerCase();
      const params = new URLSearchParams(searchParams);
      params.set(paramName, urlTab);

      if (resetPage) {
        params.set("page", 1);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (type === "hash") {
      const hash = contexts.formatTabForUrl
        ? contexts.formatTabForUrl(tab)
        : tab.toLowerCase().replace(/\s+/g, "-");
      router.replace(`${pathname}#${hash}`, { scroll: false });
    }

    setActiveTab(tab);
  }

  return (
    <div className={styles.nav}>
      <div className="container">
        <div className={styles.courseNav}>
          <ul className={styles.tabs}>
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`semiboldFont ${styles.tabItem} ${
                  tab.toLowerCase() === activeTab?.toLowerCase()
                    ? styles.activeTabItem
                    : ""
                } ${index === 0 ? styles.firstTabItem : ""}`}
                onClick={() => handleTab(tab)}
                ref={(el) => (navRefs.current[index] = el)}
              >
                <p>{tab}</p>
              </li>
            ))}
          </ul>
          <div className={styles.slider} ref={sliderRef}></div>
        </div>
      </div>
    </div>
  );
}
