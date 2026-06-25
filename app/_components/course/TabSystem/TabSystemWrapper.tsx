"use client";

import dynamic from "next/dynamic";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import { CourseDetail } from "@/app/_utils/types";

const TabSystem = dynamic(() => import("./TabSystem"), {
  ssr: false,
  loading: () => <Spinner />,
});

interface Props {
  course: CourseDetail;
  moduleId: string | number;
}

export default function TabSystemWrapper({ course, moduleId }: Props) {
  return <TabSystem course={course} moduleId={moduleId} />;
}
