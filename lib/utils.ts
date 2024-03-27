import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  Section,
  DefaultQuestion,
  Question,
  QuestionnaireItem,
  Answer,
} from "@/lib/context/QuestionnaireContext";
import { BareForm } from "./types/form.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleCase(text: string | undefined | null) {
  if (text === undefined || text === null) return;

  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const handleTextAreaHeight = (
  event: ChangeEvent<HTMLTextAreaElement>,
) => {
  event.target.style.height = "auto";
  event.target.style.height = `${event.target.scrollHeight}px`;
};

// Quedes = Question Description
export const handleQuedesChange = (
  event: ChangeEvent<HTMLTextAreaElement>,
  setState: Dispatch<SetStateAction<string>>,
) => {
  handleTextAreaHeight(event);
  setState(event.target.value);
};

export const updateQuestionnaire = (
  latestQuestionnaire: QuestionnaireItem[],
  questionId: number,
  requiredValue: boolean,
  questionValue: string,
  descriptionValue: string,
  choiceValue?: string[],
) => {
  const updatedQuestionnaire = latestQuestionnaire.map((item) => {
    if (item.type === "SECTION") {
      const section = { ...item } as Section;
      const updatedQuestions = section.questions.map((question: Question) => {
        if (question.questionId === questionId) {
          return {
            ...question,
            isRequired: requiredValue,
            question: questionValue,
            description: descriptionValue,
            ...(choiceValue !== undefined && { choice: choiceValue }),
          };
        }
        return question;
      });
      return {
        ...section,
        questions: updatedQuestions,
      };
    } else if (item.type === "DEFAULT") {
      const defaultQuestion = { ...item } as DefaultQuestion;
      if (defaultQuestion.question.questionId === questionId) {
        return {
          ...defaultQuestion,
          question: {
            ...defaultQuestion.question,
            question: questionValue,
            isRequired: requiredValue,
            description: descriptionValue,
            ...(choiceValue !== undefined && { choice: choiceValue }),
          },
        };
      }
    }
    return item;
  });
  return updatedQuestionnaire;
};

export const updateAnswers = (
  latestAnswers: Answer[],
  questionId: number,
  answerValue: string | string[],
) => {
  const answerIndex = latestAnswers.findIndex(
    (answer) => answer.questionId === questionId,
  );
  const updatedAnswers = [...latestAnswers];

  if (answerIndex !== -1) {
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      answer: answerValue,
    };
  } else {
    updatedAnswers.push({ questionId: questionId, answer: answerValue });
  }
  return updatedAnswers;
};

export function decidePhoto(form: BareForm) {
  const title = form.title.split(" ");

  if (title.length === 1) {
    return title[0].slice(0, 2).toUpperCase();
  }

  return (
    title[0].slice(0, 1).toUpperCase() + title[1].slice(0, 1).toUpperCase()
  );
}

export function isEnded(endedAt: string): boolean {
  return new Date() > new Date(endedAt);
}
