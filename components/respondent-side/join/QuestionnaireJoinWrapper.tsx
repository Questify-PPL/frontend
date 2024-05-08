"use client";

import React, { useEffect, useState } from "react";
import {
  FormUpperMenu,
  SavedAsDraftModal,
} from "@/components/creator-side/create/form";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import { Section, DefaultQuestion, Question, Answer } from "@/lib/context";
import { LuCheck, LuCheckCheck, LuChevronRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useQuestionnaireContext } from "@/lib/hooks";
import { QuestionnaireItem } from "@/lib/context";
import { Card } from "@/components/ui/card";
import Terminus from "../Terminus";
import QuestionUI from "@/components/respondent-side/Question";
import FinalizationCard from "./FinalizationCard";
import { getQuestionnaireRespondent, patchAnswer } from "@/lib/action/form";

export default function QuestionnaireJoinWrapper({ id }: { id: string }) {
  const { questionnaire, answers, setAnswers, setQuestionnaire } =
    useQuestionnaireContext();
  const [QRETitle, setQRETitle] = useState("");
  const router = useRouter();
  const [activeQuestionId, setActiveQuestionId] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [prize, setPrize] = useState(0);
  const [maxWinner, setMaxWinner] = useState(0);
  const [prizeType, setPrizeType] = useState("EVEN");
  const [finalizationCard, setFinalizationCard] = useState("hidden");

  const handleAnswerChange = (questionId: number, newAnswer: string) => {
    setAnswers((prevAnswers) => {
      const answerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      if (answerIndex >= 0) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[answerIndex].answer = newAnswer;
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { questionId, answer: newAnswer }];
      }
    });
  };

  const openFinalizationCard = () => {
    const newClass = finalizationCard === "hidden" ? "flex" : "hidden";
    setFinalizationCard(newClass);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestionnaire();
    };

    fetchData().catch(console.error);
  });
  // How to make this persist?
  // Choices are not persistent, sometimes it's empty

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
      await patchAnswer(id, answers);
      OpenSavedAsDraft();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await patchAnswer(id, answers, true);
      openFinalizationCard();
      // await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  // Find Question by ID
  function findQuestionById(
    questionnaire: QuestionnaireItem[],
    questionId: number
  ): Question | undefined {
    console.log("Questionnaire from Find: ", questionnaire);
    for (const item of questionnaire) {
      console.log("Item: ", item);
      if (item.type === "SECTION") {
        const foundQuestion = item.questions.find(
          (question) => question.questionId === questionId
        );
        if (foundQuestion) {
          console.log("Found Question: ", foundQuestion);
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
    let existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === questionId
    );

    console.log("Rendering Question Type: ", questionType);
    console.log("Rendering Choice: ", choice);
    const answer = answers[existingAnswerIndex]?.answer ?? "";

    return (
      <div className="flex flex-col w-full" key={questionId}>
        {questionType === "TEXT" ? (
          <Text
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId as number}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            answer={answer as string}
            onAnswerChange={(questionId, newAnswer) =>
              handleAnswerChange(questionId, newAnswer)
            }
          />
        ) : questionType === "CHECKBOX" ? (
          (console.log("Rendering Checkbox"),
          console.log("Answer: ", answer),
          console.log("Choice: ", choice),
          (
            <Checkboxes
              role="RESPONDENT"
              numbering={index + 1}
              questionId={questionId as number}
              questionTypeName={questionTypeName}
              isRequired={isRequired}
              question={question}
              description={description ?? ""}
              choice={choice ?? []}
              // answer={answer as string[]}
              answer={answer as string[]}
            />
          ))
        ) : (
          <RadioButton
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId as number}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            // answer={answer as string[]}
            answer={answer as string[]}
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
    choice: string[];
  }

  interface SectionGet {
    sectionId: number;
    name: string;
    description: string;
    questions: QuestionGet[];
  }

  type QuestionnaireGetItem = SectionGet | QuestionGet;

  async function transformData(
    data: QuestionnaireGetItem[]
  ): Promise<QuestionnaireItem[]> {
    return data.map((item) => {
      if (
        (item as SectionGet).sectionId !== null &&
        (item as SectionGet).questions
      ) {
        const section = item as SectionGet;
        const questions = section.questions.map((question) => {
          handleAnswerChange(question.questionId, question.answer);
          const existingQuestion = findQuestionById(
            questionnaire,
            question.questionId
          );
          if (existingQuestion) {
            const choice = existingQuestion.choice ?? question.choice;
            return {
              questionId: question.questionId,
              questionType: question.questionType,
              questionTypeName: question.questionTypeName,
              isRequired: question.isRequired,
              question: question.question,
              description: question.description,
              choice: choice,
            };
          } else {
            return {
              questionId: question.questionId,
              questionType: question.questionType,
              questionTypeName: question.questionTypeName,
              isRequired: question.isRequired,
              question: question.question,
              description: question.description,
              choice: question.choice,
            };
          }
        }) as Question[];

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
            choice: question.choice,
          },
        } as DefaultQuestion;
      }
    });
  }

  // Questionnaire Fetching
  const fetchQuestionnaire = async () => {
    try {
      const response = await getQuestionnaireRespondent(id);
      const transformed = await transformData(response.data.questions);
      setQRETitle(response.data.title);
      setPrizeType(response.data.prizeType);
      setPrize(response.data.prize);
      setMaxWinner(response.data.maxWinner);

      console.log(
        "Transformed: ",
        transformed.map((item) => item)
      );

      setQuestionnaire(transformed);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  };

  const next = async () => {
    if (activeSectionId === 0) {
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId + 1 <= questionnaire.length - 1) {
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId + 1 === questionnaire.length) {
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
        prizeType={prizeType}
        prize={prize}
        maxWinner={maxWinner}
        QRETitle={QRETitle}
        onCancel={openFinalizationCard}
      ></FinalizationCard>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <div className="flex flex-col w-full min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle={QRETitle}
          />

          {activeSectionId === 0
            ? (() => {
                const item = questionnaire[0];
                if (item !== undefined) {
                  const section = item as Section;
                  return (
                    <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                      <Terminus
                        QRETitle=""
                        isParticipate={true}
                        terminusSectionTitle={section.sectionName}
                        terminusText={section.sectionDescription}
                        buttonClickHandler={next}
                        buttonText="Start"
                        buttonIcon={<LuChevronRight className="w-5 h-5" />}
                        buttonType="submit"
                      />
                    </Card>
                  );
                }
              })()
            : (() => {
                console.log("Rendering section: " + activeSectionId);
                console.log("Questionnaire UI: ", questionnaire);
                const item = questionnaire[activeSectionId];
                if (
                  item !== undefined &&
                  activeSectionId + 1 <= questionnaire.length - 1
                ) {
                  const section = item as Section;
                  console.log("choice: ", section.questions);
                  return (
                    <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                      <QuestionUI
                        questionSectionTitle={"Section " + activeSectionId}
                        questionSectionText={section.sectionName}
                        required={true}
                        isParticipate={true}
                        questions={
                          <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                            {section.questions?.length >= 1
                              ? section.questions.map((question, index) => {
                                  console.log("Question UI: ", question);
                                  const renderedQuestion = findQuestionById(
                                    questionnaire,
                                    question.questionId as number
                                  ) as Question;

                                  console.log(
                                    "Rendered Question: ",
                                    renderedQuestion
                                  );

                                  return renderQuestion(
                                    renderedQuestion,
                                    index
                                  );
                                })
                              : ""}
                          </div>
                        }
                        prevButton={prev}
                        nextButton={next}
                        buttonText="Next"
                        buttonIcon={<LuCheck className="w-5 h-5" />}
                      />
                    </Card>
                  );
                } else {
                  const item = questionnaire[activeSectionId];
                  if (
                    item !== undefined &&
                    activeSectionId + 1 == questionnaire.length
                  ) {
                    const section = item as Section;
                    return (
                      <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                        <Terminus
                          QRETitle=""
                          isParticipate={true}
                          terminusSectionTitle={section.sectionName}
                          terminusText={section.sectionDescription}
                          buttonClickHandler={next}
                          buttonText="Submit"
                          buttonIcon={<LuCheckCheck className="w-5 h-5" />}
                          buttonType="submit"
                        />
                      </Card>
                    );
                  }
                }
              })()}
        </div>
      </div>
    </div>
  );
}
