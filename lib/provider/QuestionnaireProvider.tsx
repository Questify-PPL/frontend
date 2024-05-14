"use client";

import React, { useState, ReactNode, useMemo } from "react";
import {
  QuestionnaireContext,
  QuestionnaireItem,
  Answer,
} from "@/lib/context/QuestionnaireContext";
import { QUESTIONNAIRE, ANSWERS } from "@/lib/constant";

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Get questionnaire and answer from the backend, set as default value (replace QUESTIONNAIRE and ANSWERS)
  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireItem[]>(QUESTIONNAIRE);
  const [answers, setAnswers] = useState<Answer[]>(ANSWERS);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<number | undefined>(
    undefined,
  );

  // Memoize the context value to prevent unnecessary re-renders
  const providerValue = useMemo(
    () => ({
      questionnaire,
      answers,
      errorStatus,
      activeQuestion,
      setQuestionnaire,
      setAnswers,
      setErrorStatus,
      setActiveQuestion,
    }),
    [questionnaire, answers, errorStatus, activeQuestion],
  );

  return (
    <QuestionnaireContext.Provider value={providerValue}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
