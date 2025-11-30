"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ContentTab.module.css";
import { useVideoDuration } from "./hooks/useVideoDuration";

export default function ContentTab({ course, moduleId }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { durations, loading, error, getTotalDuration, getModuleDuration } =
    useVideoDuration(course.modules);

  // Group modules by section
  const sections = useMemo(() => {
    const sectionMap = new Map();

    course.modules.forEach((module) => {
      const sectionId = module.course_section_id;
      if (!sectionMap.has(sectionId)) {
        sectionMap.set(sectionId, {
          id: sectionId,
          modules: [],
        });
      }
      sectionMap.get(sectionId).modules.push(module);
    });

    // Convert Map to array and sort by section ID
    return Array.from(sectionMap.values()).sort((a, b) => a.id - b.id);
  }, [course.modules]);

  const [openSections, setOpenSections] = useState(
    sections.length > 0 ? { [sections[0].id]: true } : {}
  );

  // Open section when a video under it is playing
  useEffect(() => {
    if (moduleId) {
      // Find which section contains the current module
      const activeSection = sections.find((section) =>
        section.modules.some((module) => module.id === moduleId)
      );

      if (activeSection) {
        setOpenSections((prev) => ({
          ...prev,
          [activeSection.id]: true, // Open the section containing the active module
        }));
      }
    }
  }, [moduleId, sections]);

  function handleToggleSection(sectionId) {
    setOpenSections((curr) => ({
      ...curr,
      [sectionId]: !curr[sectionId],
    }));
  }

  function handleModuleClick(moduleId) {
    const params = new URLSearchParams(searchParams);
    params.set("moduleId", moduleId);
    router.push(`?${params.toString()}`);
  }

  // Calculate duration for a specific section
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
    return `${minutes} mins`;
  }

  const totalDuration = getTotalDuration();

  return (
    <div className={styles.contentTab}>
      <p className={`${styles.heading} boldFont`}>Course Content</p>

      <div className={styles.accordion}>
        {sections.map((section, sectionIndex) => {
          // Calculate the starting index for this section
          const sectionStartIndex = sections
            .slice(0, sectionIndex)
            .reduce((total, sec) => total + sec.modules.length, 0);

          return (
            <div
              className={`${styles.accordionItem} ${
                openSections[section.id] ? styles.open : ""
              }`}
              key={section.id}
            >
              <div
                className={styles.topWrap}
                onClick={() => handleToggleSection(section.id)}
              >
                <div className={styles.top}>
                  <p className={`semiboldFont ${styles.mainTitle}`}>
                    Section {sectionIndex + 1}: Introduction
                  </p>

                  <img
                    src="/images/content-tab-arrow.svg"
                    alt="arrow"
                    style={{
                      transition: "0.3s ease",
                    }}
                    className={styles.arrow}
                  />
                </div>

                <p className={styles.fullDuration}>
                  {getSectionDuration(section.modules)}
                </p>
              </div>

              <div className={styles.bottomWrap}>
                {section.modules.map((module, moduleIndex) => {
                  const moduleDuration = getModuleDuration(module.id);
                  const globalIndex = sectionStartIndex + moduleIndex + 1;

                  return (
                    <div
                      className={`${styles.clip} ${
                        moduleId === module.id ? styles.active : ""
                      }`}
                      key={module.id}
                      onClick={() => handleModuleClick(module.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <p className={styles.title}>
                        {globalIndex}. {module.title}
                      </p>
                      <div className={styles.line}>
                        <img src="/images/play-btn.svg" alt="play" />
                        <p className={styles.duration}>
                          {loading
                            ? "Loading..."
                            : moduleDuration.formatted || "N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
          Error loading video durations: {error}
        </div>
      )}
    </div>
  );
}
