"use client";

import React, { useState } from "react";
import {
  FormUpperMenu,
  SavedAsDraftModal,
} from "@/components/creator-side/create/form";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import { Section, DefaultQuestion, Question } from "@/lib/context";
import { LuCheck, LuCheckCheck, LuChevronRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useQuestionnaireContext } from "@/lib/hooks";
import { QuestionnaireItem } from "@/lib/context";
import { Card } from "@/components/ui/card";
import Terminus from "../Terminus";
import QuestionUI from "@/components/respondent-side/Question";
import FinalizationCard from "./FinalizationCard";
import { getQuestionnaireRespondent } from "@/lib/action/form";

export default function QuestionnaireJoinWrapper({ id }: { id: string }) {
  const { questionnaire, answers, setQuestionnaire, setAnswers } =
    useQuestionnaireContext();
  const [QRETitle, setQRETitle] = useState("");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [finalizationCard, setFinalizationCard] = useState("hidden");

  const openFinalizationCard = () => {
    const newClass = finalizationCard === "hidden" ? "flex" : "hidden";
    setFinalizationCard(newClass);
  };

  // Get Specific Question to be displayed
  const handleQuestionToggleSelect = async (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  const handleSectionChanges = async (sectionId: number) => {
    setActiveSectionId(sectionId);
  };

  // Open Saved As Draft Modal
  const [savedAsDraftState, setSavedAsDraftState] = useState("hidden");
  const OpenSavedAsDraft = () => {
    const newClass = savedAsDraftState === "hidden" ? "flex" : "hidden";
    setSavedAsDraftState(newClass);
  };

  // Back and Save Handler
  const handleBack = () => {
    router.push("../");
  };

  const handleSave = async () => {
    try {
      // await patchAnswerAsDraft(id, questionnaire);
      OpenSavedAsDraft();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // await patchQuestionnaire(id, questionnaire);
      openFinalizationCard();
      // await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  // Find Question by ID
  function findQuestionById(
    questionnaire: QuestionnaireItem[],
    questionId: number,
  ): Question | undefined {
    for (const item of questionnaire) {
      if (item.type === "SECTION") {
        const foundQuestion = item.questions.find(
          (question) => question.questionId === questionId,
        );
        if (foundQuestion) {
          return foundQuestion;
        }
      } else if (
        item.type === "DEFAULT" &&
        item.question.questionId === questionId
      ) {
        return item.question;
      }
    }
    return undefined;
  }

  // Render Question
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
    const answer = choice?.[0] ?? "";

    return (
      <div className="flex flex-col w-full" key={questionId}>
        {questionType === "TEXT" ? (
          <Text
            role="RESPONDENT"
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
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            // answer={answer as string[]}
            answer={[answer]}
          />
        ) : (
          <RadioButton
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            // answer={answer as string[]}
            answer={[answer]}
          />
        )}
      </div>
    );
  };

  // Data Types for Fetching
  interface QuestionGet {
    sectionId: number | null;
    questionId: number;
    questionType: string;
    questionTypeName: string;
    isRequired: boolean;
    question: string;
    description: string;
    answer: string;
  }

  interface SectionGet {
    sectionId: number;
    name: string;
    description: string;
    questions: QuestionGet[];
  }

  type QuestionnaireGetItem = SectionGet | QuestionGet;

  // Transform Data before Fetching
  function transformData(data: QuestionnaireGetItem[]): QuestionnaireItem[] {
    return data.map((item) => {
      if (
        (item as SectionGet).sectionId !== null &&
        (item as SectionGet).questions
      ) {
        const section = item as SectionGet;
        const questions = section.questions.map((question) => ({
          questionId: question.questionId,
          questionType: question.questionType,
          questionTypeName: question.questionTypeName,
          isRequired: question.isRequired,
          question: question.question,
          description: question.description,
          choice: [question.answer], // Needs refactoring
        }));
        return {
          type: "SECTION",
          sectionId: section.sectionId,
          sectionName: section.name,
          sectionDescription: section.description,
          questions: questions,
        } as Section;
      } else {
        const question = item as QuestionGet;
        return {
          type: "DEFAULT",
          question: {
            questionId: question.questionId,
            questionType: question.questionType,
            questionTypeName: question.questionTypeName,
            isRequired: question.isRequired,
            question: question.question,
            description: question.description,
            choice: [question.answer], // Needs refactoring
          },
        } as DefaultQuestion;
      }
    });
  }

  // Questionnaire Fetching
  const fetchQuestionnaire = async () => {
    try {
      const response = await getQuestionnaireRespondent(id);
      const transformed = transformData(response.data.questions);
      setQuestionnaire(transformed);
      setQRETitle(response.data.title);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  };

  const next = async () => {
    if (activeSectionId === 0) {
      await handleSectionChanges(activeSectionId + 1);
      await fetchQuestionnaire();
    } else if (activeSectionId < questionnaire.length) {
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId === questionnaire.length) {
      console.log("Masuk finalization");
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId > questionnaire.length) {
      console.log("Masuk else");
      await handleSubmit();
    }
  };

  const prev = async () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setActiveSectionId(activeSectionId - 1);
      handleQuestionToggleSelect(activeQuestionId - 1);
    }
    if (activeSectionId === 0) {
    } else if (activeSectionId <= questionnaire.length) {
      await handleSectionChanges(activeSectionId - 1);
    }
  };

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <SavedAsDraftModal
        className={`${savedAsDraftState}`}
        QRETitle={QRETitle}
        onCancel={OpenSavedAsDraft}
      ></SavedAsDraftModal>
      <FinalizationCard
        className={`${finalizationCard}`}
        onCancel={openFinalizationCard}
      ></FinalizationCard>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <div className="flex flex-col w-full min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle={QRETitle}
          />

          {activeSectionId !== 0 ? (
            (() => {
              console.log("Masuk render section: " + activeSectionId);
              const item = questionnaire[activeSectionId - 1];
              console.log("item: " + item);
              if (item !== undefined) {
                const section = item as Section;
                return (
                  <QuestionUI
                    questionSectionTitle={"Section " + section.sectionId}
                    questionSectionText={section.sectionName}
                    required={true}
                    questions={
                      <div className="flex flex-col gap-8 text-base text-primary w-full justify-start ">
                        {section.questions?.length >= 1
                          ? section.questions?.map((question, index) => {
                              const renderedQuestion = findQuestionById(
                                questionnaire,
                                question.questionId,
                              ) as Question;
                              const renderFragment = renderQuestion(
                                renderedQuestion,
                                question.questionId,
                              );
                              return renderFragment;
                            })
                          : ""}
                      </div>
                    }
                    prevButton={prev}
                    nextButton={next}
                    buttonText="Next"
                    buttonIcon={<LuCheck className="w-5 h-5" />}
                  />
                );
              } else {
                return (
                  <Card className="flex flex-row w-full h-full justify-center items-center">
                    <Terminus
                      QRETitle="Oreo Satisfaction: User Feedback in Indonesia"
                      terminusSectionTitle="Ending"
                      terminusText="Thank you for participating! Your insights are valuable. I hope you don't mind joining future questionnaires."
                      buttonClickHandler={next}
                      buttonText="Submit"
                      buttonIcon={<LuCheckCheck className="w-5 h-5" />}
                      buttonType="submit"
                    />
                  </Card>
                );
              }
            })()
          ) : (
            <Card className="flex flex-row w-full h-full justify-center items-center">
              {activeSectionId === 0 && (
                <Terminus
                  QRETitle="Oreo Satisfaction: User Feedback in Indonesia"
                  terminusSectionTitle="Opening"
                  terminusText="Hello! I'm Ruben. I'm a Scientist at Oreo. Through this questionnaire I'd like to know consumer's preferences for Oreo flavors and packaging."
                  buttonClickHandler={next}
                  buttonText="Start"
                  buttonIcon={<LuChevronRight className="w-5 h-5" />}
                  buttonType="submit"
                />
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
