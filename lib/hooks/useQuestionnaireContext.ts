"use client";

import { useContext } from "react";
import { QuestionnaireContext } from "@/lib/context/QuestionnaireContext";

export const useQuestionnaireContext = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireContext must be used within a QuestionnaireProvider",
    );
  }
  return context;
};
