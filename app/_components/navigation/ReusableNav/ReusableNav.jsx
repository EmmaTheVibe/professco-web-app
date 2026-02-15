"use client";

import styles from "./ReusableNav.module.css";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ReusableNav({
  tabs,
  paramName = "exam",
  activeTab,
  setActiveTab,
  resetPage = true,
}) {
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

  // This useEffect is now the SOLE updater of activeTab based on URL param
  useEffect(() => {
    let newActiveTab = null;

    const urlTab = searchParams.get(paramName);
    if (urlTab) {
      const matchingTab = tabs.find(
        (tab) => tab.toLowerCase() === urlTab.toLowerCase()
      );
      if (matchingTab) {
        newActiveTab = matchingTab;
      }
    }

    // Default to the first tab if no matching tab found in URL
    if (!newActiveTab && !activeTab && tabs.length > 0) {
      newActiveTab = tabs[0];
    }

    // Only update if the newActiveTab is different from current activeTab
    if (newActiveTab && newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
    }
  }, [paramName, searchParams, tabs, activeTab, setActiveTab, pathname, router]);

  function handleTab(tab) {
    const urlTab = tab.toLowerCase();
    const params = new URLSearchParams(searchParams);
    params.set(paramName, urlTab);

    if (resetPage && paramName === "exam") {
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
