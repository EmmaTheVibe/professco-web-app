"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVideoDuration } from "@/app/_components/course/ContentTab/hooks/useVideoDuration";
import usePanelStore from "./panel-store";
import styles from "./CourseContentPanel.module.css";

// Simulated per-section progress until real progress tracking exists
const SIMULATED_PROGRESS = [10, 50, 75, 10, 100, 10, 50, 100];

export default function CourseContentPanel({ course, moduleId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collapsed = usePanelStore((state) => state.collapsed);
  const setCollapsed = usePanelStore((state) => state.setCollapsed);

  const { loading, getModuleDuration } = useVideoDuration(course.modules);

  const sections = useMemo(() => {
    const sectionMap = new Map();

    course.modules.forEach((module) => {
      const sectionId = module.course_section_id;
      if (!sectionMap.has(sectionId)) {
        sectionMap.set(sectionId, { id: sectionId, modules: [] });
      }
      sectionMap.get(sectionId).modules.push(module);
    });

    return Array.from(sectionMap.values()).sort((a, b) => a.id - b.id);
  }, [course.modules]);

  const [openSections, setOpenSections] = useState(
    sections.length > 0 ? { [sections[0].id]: true } : {}
  );

  useEffect(() => {
    if (moduleId) {
      const activeSection = sections.find((section) =>
        section.modules.some((module) => module.id === Number(moduleId))
      );
      if (activeSection) {
        setOpenSections((prev) => ({ ...prev, [activeSection.id]: true }));
      }
    }
  }, [moduleId, sections]);

  function toggleSection(sectionId) {
    setOpenSections((curr) => ({ ...curr, [sectionId]: !curr[sectionId] }));
  }

  function handleModuleClick(clickedModuleId) {
    const params = new URLSearchParams(searchParams);
    params.set("moduleId", clickedModuleId);
    router.push(`?${params.toString()}`);
  }

  function getSectionDuration(sectionModules) {
    if (loading) return "Loading...";

    const totalSeconds = sectionModules.reduce((total, module) => {
      const moduleDuration = getModuleDuration(module.id);
      return total + (moduleDuration.seconds || 0);
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}mins`;
  }

  if (collapsed) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <p className="boldFont">Course content</p>
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(true)}
          aria-label="Hide course content"
        >
          <img src="/images/collapse-panel-icon.svg" alt="" />
        </button>
      </div>

      <div className={styles.sectionList}>
        {sections.map((section, sectionIndex) => {
          const progress =
            SIMULATED_PROGRESS[sectionIndex % SIMULATED_PROGRESS.length];
          const isOpen = openSections[section.id];

          return (
            <div key={section.id} className={styles.section}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.id)}
              >
                <div className={styles.sectionTop}>
                  <p className="semiboldFont">
                    Section {sectionIndex + 1}: Introduction
                  </p>
                  <img
                    src="/images/content-tab-arrow.svg"
                    alt=""
                    className={`${styles.chevron} ${
                      isOpen ? styles.chevronOpen : ""
                    }`}
                  />
                </div>
                <div className={styles.sectionMeta}>
                  <p>{getSectionDuration(section.modules)}</p>
                  <p>{progress}%</p>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {isOpen && (
                <div className={styles.moduleList}>
                  {section.modules.map((module, moduleIndex) => {
                    const moduleDuration = getModuleDuration(module.id);
                    return (
                      <div
                        key={module.id}
                        className={`${styles.moduleItem} ${
                          Number(moduleId) === module.id ? styles.active : ""
                        }`}
                        onClick={() => handleModuleClick(module.id)}
                      >
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={false}
                          readOnly
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={styles.moduleInfo}>
                          <p>
                            {moduleIndex + 1}. {module.title}
                          </p>
                          <p className={styles.moduleDuration}>
                            {loading
                              ? "Loading..."
                              : moduleDuration.formatted || "N/A"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
