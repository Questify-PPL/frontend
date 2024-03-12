"use client";

import React, { useState, ReactNode } from "react";
import {
  QuestionnaireContext,
  QuestionnaireItem,
  Answer,
} from "@/lib/context/QuestionnaireContext";
import { QUESTIONNAIRE, ANSWERS } from "@/lib/constant";

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // get questionnaire n answer dr BE, set jd default value (replace QUESTIONNAIRE n ANSWERS)
  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireItem[]>(QUESTIONNAIRE);
  const [answers, setAnswers] = useState<Answer[]>(ANSWERS);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  return (
    <QuestionnaireContext.Provider
      value={{
        questionnaire,
        answers,
        errorStatus,
        setQuestionnaire,
        setAnswers,
        setErrorStatus,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
