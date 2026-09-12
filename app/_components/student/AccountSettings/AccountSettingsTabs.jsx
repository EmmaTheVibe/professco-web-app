"use client";

import { useEffect, useRef } from "react";
import styles from "./AccountSettingsTabs.module.css";

export default function AccountSettingsTabs({ tabs, activeTab, setActiveTab }) {
  const sliderRef = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    const updateSliderPosition = () => {
      const activeIndex = tabs.findIndex((tab) => tab === activeTab);
      const activeItem = tabRefs.current[activeIndex];

      if (activeItem && sliderRef.current) {
        sliderRef.current.style.width = `${activeItem.offsetWidth}px`;
        sliderRef.current.style.left = `${activeItem.offsetLeft}px`;
      }
    };

    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);

    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [activeTab, tabs]);

  return (
    <div className={styles.nav}>
      <div className={styles.tabsScroll}>
        <ul className={styles.tabs}>
          {tabs.map((tab, index) => (
            <li
              key={tab}
              className={`semiboldFont ${styles.tabItem} ${
                tab === activeTab ? styles.activeTabItem : ""
              }`}
              onClick={() => setActiveTab(tab)}
              ref={(el) => (tabRefs.current[index] = el)}
            >
              <p>{tab}</p>
            </li>
          ))}
          <div className={styles.slider} ref={sliderRef}></div>
        </ul>
      </div>
    </div>
  );
}
