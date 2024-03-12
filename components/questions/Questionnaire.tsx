"use client";

import { useQuestionnaireContext } from "@/lib/hooks";
import { Question, Section, DefaultQuestion } from "@/lib/context";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import { UserRoleEnum } from "@/lib/types/auth";
import { getCurrentSession } from "@/lib/action/user";
import { useState, useEffect } from "react";

export function Questionnaire() {
  const { questionnaire, answers } = useQuestionnaireContext();
  const [currentRole, setCurrentRole] = useState<"CREATOR" | "RESPONDENT">(
    "RESPONDENT",
  );

  useEffect(() => {
    async function fetchRole() {
      const session = await getCurrentSession();
      setCurrentRole(
        session && session.user.activeRole === UserRoleEnum.Creator
          ? "CREATOR"
          : "RESPONDENT",
      );
    }
    fetchRole();
  }, []);

  const renderQuestion = (q: Question, index: number) => {
    const {
      questionId,
      questionType,
      questionTypeName,
      isRequired,
      question,
      description,
      choice,
    } = q;
    const answer =
      answers.find((answer) => answer.questionId === questionId)?.answer ?? "";

    return (
      <div className="flex flex-col" key={questionId}>
        {questionType === "TEXT" ? (
          <Text
            role={currentRole}
            numbering={index + 1}
            questionId={questionId}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            answer={answer as string}
          />
        ) : questionType === "CHECKBOX" ? (
          <Checkboxes
            role={currentRole}
            numbering={index + 1}
            questionId={questionId}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            answer={answer as string[]}
          />
        ) : (
          <RadioButton
            role={currentRole}
            numbering={index + 1}
            questionId={questionId}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            answer={answer as string[]}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col" data-testid="questionnaire-component">
      {questionnaire.map((questionnaireItem, index) => {
        const item = questionnaireItem;

        if (item.type === "SECTION") {
          const section = item as Section;
          return section.questions.map(
            (question: Question, innerIndex: number) => {
              return renderQuestion(question, innerIndex);
            },
          );
        } else {
          const defaultQuestion = item as DefaultQuestion;
          return renderQuestion(defaultQuestion.question, index);
        }
      })}
    </div>
  );
}
