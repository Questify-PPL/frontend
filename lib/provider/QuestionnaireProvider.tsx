"use client";

import React, { useState, ReactNode, useMemo } from "react";
import {
  QuestionnaireContext,
  QuestionnaireItem,
  Answer,
} from "@/lib/context/QuestionnaireContext";
import { QUESTIONNAIRE, ANSWERS } from "@/lib/constant";
import { Metadata } from "../types";

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

  const [metadata, setMetadata] = useState<Metadata>({
    createdAt: "",
    creatorId: "",
    endedAt: "",
    id: "",
    isDraft: false,
    isPublished: false,
    isWinnerProcessed: false,
    link: "",
    maxParticipant: null,
    maxWinner: null,
    prize: 0,
    prizeType: "EVEN",
    questionAmount: 0,
    updatedAt: "",
  });

  // Memoize the context value to prevent unnecessary re-renders
  const providerValue = useMemo(
    () => ({
      questionnaire,
      answers,
      errorStatus,
      activeQuestion,
      metadata,
      setQuestionnaire,
      setAnswers,
      setErrorStatus,
      setActiveQuestion,
      setMetadata,
    }),
    [questionnaire, answers, errorStatus, activeQuestion, metadata],
  );

  return (
    <QuestionnaireContext.Provider value={providerValue}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
