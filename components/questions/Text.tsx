"use client";

import { ReactNode, useState, ChangeEvent, useEffect } from "react";
import QuestionLayout from "./QuestionLayout";
import {
  handleTextAreaHeight,
  handleQuedesChange,
  updateQuestionnaire,
  updateAnswers,
} from "@/lib/utils";
import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";

interface TextProps {
  role: "CREATOR" | "RESPONDENT";
  numbering: number;
  questionId: number;
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description?: string;
  choice?: string[];
  answer: string;
  status?: boolean; // false means it can't be modified (submitted || questionnaire has ended)
  onAnswerChange?: (questionId: number, answer: string) => void;
}

export function Text(textProps: TextProps) {
  const {
    questionnaire,
    answers,
    setQuestionnaire,
    setAnswers,
    setErrorStatus,
  } = useQuestionnaireContext();
  const { role, numbering, questionId, questionTypeName } = textProps;
  const {
    isRequired,
    question,
    description,
    answer,
    status = true,
  } = textProps;

  const [questionValue, setQuestionValue] = useState<string>(question || "");
  const [descriptionValue, setDescriptionValue] = useState<string>(
    description || "",
  );
  const [answerValue, setAnswerValue] = useState(answer || "");
  const [requiredValue, setRequiredValue] = useState(isRequired || false);
  const [answerError, setAnswerError] = useState<string | null>();

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleQuedesChange(event, setQuestionValue);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleQuedesChange(event, setDescriptionValue);
  };

  const handleAnswerChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target instanceof HTMLTextAreaElement) {
      handleTextAreaHeight(event as ChangeEvent<HTMLTextAreaElement>);
    }
    setAnswerValue(event.target.value);
    console.log("Answer Value: ", answerValue);

    if (textProps.onAnswerChange) {
      textProps.onAnswerChange(questionId, event.target.value);
    }
    handleAnswerValidation();
  };

  const handleSwitchChange = () => {
    setRequiredValue(!requiredValue);
  };

  const urlPattern =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const handleAnswerValidation = () => {
    const isEmpty = answerValue.trim() === "";
    const isValidUrl = urlPattern.test(answerValue);

    if (requiredValue && isEmpty) {
      setAnswerError("Answer can't be empty.");
    } else if (questionTypeName === "Link" && !isValidUrl) {
      setAnswerError("Please enter a valid URL.");
    } else {
      setAnswerError(null);
    }

    setErrorStatus(answerError !== null);
  };

  const handleAnswer = (): ReactNode => {
    if (role === "CREATOR") {
      return null;
    } else {
      if (!status) {
        return (
          <label
            className="flex break-all font-normal text-xs md:text-sm text-[#64748B]"
            data-testid="answerLabel"
          >
            {answerValue}
          </label>
        );
      } else {
        return (
          <div>
            {questionTypeName === "Date" ? (
              <input
                type="date"
                data-testid="dateInput"
                onChange={handleAnswerChange}
                onBlur={handleAnswerValidation}
                value={answerValue}
                className="text-xs md:text-sm resize-none font-normal text-[#64748B] whitespace-pre-wrap placeholder:text-primary/30 border-none rounded-none p-0 focus-visible:outline-none overflow-y-hidden"
              />
            ) : (
              <textarea
                data-testid="textInput"
                placeholder="Type your answer here"
                onChange={handleAnswerChange}
                onBlur={handleAnswerValidation}
                value={answerValue}
                className="text-xs md:text-sm w-full resize-none font-normal text-[#64748B] whitespace-pre-wrap placeholder:text-primary/30 border-none rounded-none p-0 focus-visible:outline-none overflow-y-hidden"
                maxLength={questionTypeName === "Short Text" ? 70 : undefined}
                rows={1}
              />
            )}
            {answerError !== null && (
              <div>
                <p className="text-red-500 font-normal text-xs">
                  {answerError}
                </p>
              </div>
            )}
          </div>
        );
      }
    }
  };

  useEffect(() => {
    const updatedQuestionnaire = updateQuestionnaire(
      questionnaire,
      questionId,
      requiredValue,
      questionValue,
      descriptionValue,
    );

    setQuestionnaire(updatedQuestionnaire);
  }, [requiredValue, questionValue, descriptionValue]);

  useEffect(() => {
    const updatedAnswers = updateAnswers(answers, questionId, answerValue);

    setAnswers(updatedAnswers);
  }, [answerValue, questionId]);

  return (
    <div className="w-[84%] flex flex-col gap-4">
      <QuestionLayout
        role={role}
        required={requiredValue}
        numbering={numbering}
        questionType={questionTypeName}
        question={questionValue}
        description={descriptionValue}
        answer={handleAnswer()}
        handleQuestionChange={handleQuestionChange}
        handleDescriptionChange={handleDescriptionChange}
        handleSwitchChange={handleSwitchChange}
      ></QuestionLayout>
    </div>
  );
}
