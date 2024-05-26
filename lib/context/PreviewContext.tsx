"use client";

import { createContext, useContext } from "react";
import { QuestionnaireCreator } from "../types";

export type PreviewContextValue = {
  questionnaire: QuestionnaireCreator;
  setQuestionnaire: React.Dispatch<React.SetStateAction<QuestionnaireCreator>>;
};

export const PreviewContext = createContext({} as PreviewContextValue);

export function usePreviewContext() {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error(
      "usePreviewContext must be used within a ResponsesProvider"
    );
  }

  return context;
}
