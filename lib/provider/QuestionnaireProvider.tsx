"use client";

import React, { useState, ReactNode, useMemo, useCallback } from "react";
import {
  QuestionnaireContext,
  QuestionnaireItem,
  Answer,
} from "@/lib/context/QuestionnaireContext";
import { QUESTIONNAIRE, ANSWERS } from "@/lib/constant";
import { Metadata } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { publishQuestionnaire, unpublishQuestionnaire } from "../action/form";

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Get questionnaire and answer from the backend, set as default value (replace QUESTIONNAIRE and ANSWERS)
  const { toast } = useToast();
  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireItem[]>(QUESTIONNAIRE);
  const [answers, setAnswers] = useState<Answer[]>(ANSWERS);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<number | undefined>(
    undefined,
  );
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);

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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(true);
  const [isPublishNow, setIsPublishNow] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  const publishHandler = useCallback(async () => {
    if (!isOpen || !metadata.id) return;
    if (publishDate === undefined) {
      toast({
        title: "Error",
        description: "Please select a publish date",
        variant: "destructive",
      });
      return;
    }

    setIsFinished(false);

    try {
      const result = metadata.isPublished
        ? await unpublishQuestionnaire(metadata.id)
        : await publishQuestionnaire(metadata.id, publishDate);

      setLink(result.link);

      setMetadata((prev) => ({
        ...prev,
        isPublished: !prev.isPublished,
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }

    setIsOpen(false);
    setIsFinished(true);
  }, [toast, isOpen, metadata.id, metadata.isPublished, publishDate]);

  // Memoize the context value to prevent unnecessary re-renders
  const providerValue = useMemo(
    () => ({
      questionnaire,
      answers,
      errorStatus,
      activeQuestion,
      metadata,
      publishDate,
      setQuestionnaire,
      setAnswers,
      setErrorStatus,
      setActiveQuestion,
      setMetadata,
      setPublishDate,
      isOpen,
      setIsOpen,
      publishHandler,
      isFinished,
      isPublishNow,
      setIsPublishNow,
      link,
    }),
    [
      questionnaire,
      answers,
      errorStatus,
      activeQuestion,
      metadata,
      isFinished,
      isOpen,
      publishDate,
      publishHandler,
      isPublishNow,
      link,
    ],
  );

  return (
    <QuestionnaireContext.Provider value={providerValue}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
