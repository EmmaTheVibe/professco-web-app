"use client";

import { useEffect, useRef, useState } from "react";
import useRelatedCourses from "@/app/_hooks/useRelatedCourses";
import { useOwnedCourseIds } from "@/app/_hooks/useOwnedCourseIds";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";
import useMediaQuery from "@/app/_hooks/useMediaQuery";
import MobileLayout from "./components/MobileLayout";
import PCLayout from "./components/PCLayout";

const COURSE_PREVIEW_COUNT = 5;

interface Props {
  courseId: string | number;
  courseType: string;
}

export default function RelatedCourses({ courseId, courseType }: Props) {
  const gridWrapperRefMobile = useRef<HTMLDivElement>(null);
  const gridWrapperRefDesktop = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const lg = useMediaQuery("(min-width: 400px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSlideMode = mounted && lg;
  const isVerticalMode = mounted && !lg;
  const scrollAxis: "horizontal" | "vertical" = isVerticalMode
    ? "vertical"
    : "horizontal";
  const isAtEndMobile = useScrollEnd(gridWrapperRefMobile, scrollAxis);
  const isAtEndDesktop = useScrollEnd(gridWrapperRefDesktop, scrollAxis);

  const { relatedCourses, isLoading } = useRelatedCourses(courseType);
  const ownedCourseIds = useOwnedCourseIds();

  const courses = relatedCourses
    ? relatedCourses.filter((course) => course.id !== Number(courseId))
    : [];

  return (
    <>
      <MobileLayout
        courses={courses}
        isLoading={isLoading}
        previewCount={COURSE_PREVIEW_COUNT}
        isSlideMode={isSlideMode}
        isVerticalMode={isVerticalMode}
        isAtEnd={isAtEndMobile}
        scrollAxis={scrollAxis}
        gridWrapperRef={gridWrapperRefMobile}
        ownedCourseIds={ownedCourseIds}
      />
      <PCLayout
        courses={courses}
        isLoading={isLoading}
        previewCount={COURSE_PREVIEW_COUNT}
        isSlideMode={isSlideMode}
        isVerticalMode={isVerticalMode}
        isAtEnd={isAtEndDesktop}
        scrollAxis={scrollAxis}
        gridWrapperRef={gridWrapperRefDesktop}
        ownedCourseIds={ownedCourseIds}
      />
    </>
  );
}
