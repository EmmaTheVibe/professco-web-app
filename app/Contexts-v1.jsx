"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

const ContextCreator = createContext();

function ContextProvider({ children }) {
  const searchParams = useSearchParams();

  const validExams = [
    "all",
    "ican",
    "acca",
    "cfa",
    "cima",
    "citn",
    "cis",
    "ats",
    "cipm",
  ];

  const rawExam = searchParams?.get("exam")?.toLowerCase();
  const examValue = validExams.includes(rawExam || "") ? rawExam : "all";

  const [activeTab, setActiveTab] = useState(examValue.toUpperCase());
  const [examTypeList, setExamTypeList] = useState([]);

  function addExamType(name, selectable) {
    if (!selectable) return;
    setExamTypeList((prevList) =>
      prevList.includes(name)
        ? prevList.filter((item) => item !== name)
        : [...prevList, name]
    );
  }

  return (
    <ContextCreator.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        examTypeList: examTypeList,
        setExamTypeList: setExamTypeList,
        addExamType: addExamType,
      }}
    >
      {children}
    </ContextCreator.Provider>
  );
}

export { ContextCreator, ContextProvider };
