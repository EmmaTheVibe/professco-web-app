"use client";

import styles from "./CoursesNav.module.css";
import { useEffect, useRef } from "react";
import { exams } from "@/app/_utils/data";
import useContexts from "@/app/_utils/useContexts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CoursesNav() {
  const { activeTab, setActiveTab } = useContexts();

  const sliderRef = useRef(null);
  const navRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updateSliderPosition = () => {
      const activeNavItem = navRefs.current[exams.indexOf(activeTab)];
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
  }, [activeTab]);

  function handleTab(tab) {
    const urlTab = tab.toLowerCase();
    const params = new URLSearchParams(searchParams);
    params.set("exam", urlTab);
    params.set("page", 1);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setActiveTab(tab);
  }
  return (
    <div className={styles.nav}>
      <div className="container">
        <div className={styles.courseNav}>
          <ul className={styles.tabs}>
            {exams.map((exam, index) => (
              <li
                key={index}
                className={` semiboldFont ${styles.tabItem} ${
                  exam.toLowerCase() === activeTab.toLowerCase()
                    ? styles.activeTabItem
                    : ""
                } ${index === 0 ? styles.firstTabItem : ""}`}
                onClick={() => handleTab(exam)}
                ref={(el) => (navRefs.current[index] = el)}
              >
                {exam}
              </li>
            ))}
          </ul>
          <div className={styles.slider} ref={sliderRef}></div>
        </div>
      </div>
    </div>
  );
}
