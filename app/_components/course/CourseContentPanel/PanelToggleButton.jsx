"use client";

import usePanelStore from "./panel-store";
import styles from "./CourseContentPanel.module.css";

export default function PanelToggleButton() {
  const collapsed = usePanelStore((state) => state.collapsed);
  const setCollapsed = usePanelStore((state) => state.setCollapsed);

  if (!collapsed) return null;

  return (
    <button
      className={`${styles.toggleBtn} ${styles.floatingToggle}`}
      onClick={() => setCollapsed(false)}
      aria-label="Show course content"
    >
      <img src="/images/collapse-panel-icon.svg" alt="" />
      <span className={styles.floatingToggleLabel}>Course content</span>
    </button>
  );
}
