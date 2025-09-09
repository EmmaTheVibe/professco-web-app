"use client";

import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";

const TabSystem = dynamic(() => import("./TabSystem"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function TabSystemWrapper({ course, moduleId }) {
  return <TabSystem course={course} moduleId={moduleId} />;
}
