"use client";

import {
  FormUpperMenu,
  SavedAsDraftModal,
} from "@/components/creator-side/create/form";
import { Checkboxes, RadioButton, Text } from "@/components/questions";
import QuestionUI from "@/components/respondent-side/Question";
import { Card } from "@/components/ui/card";
import { getQuestionnaireRespondent, patchAnswer } from "@/lib/action/form";
import {
  DefaultQuestion,
  Question,
  QuestionnaireItem,
  QuestionnaireItemTypes,
  Section,
} from "@/lib/context";
import { useQuestionnaireContext } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCheck, LuCheckCheck, LuChevronRight } from "react-icons/lu";
import Terminus from "../Terminus";
import FinalizationCard from "./FinalizationCard";
import { toast } from "@/components/ui/use-toast";

export default function QuestionnaireJoinWrapper({
  id,
}: Readonly<{ id: string }>) {
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
  const [winningChance, setWinningChance] = useState(0);

  const handleAnswerChange = (
    questionId: number,
    newAnswer: string | string[],
  ) => {
    setAnswers((prevAnswers) => {
      const answerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId,
      );

      if (answerIndex >= 0) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[answerIndex].answer = newAnswer;
        return updatedAnswers;
      } else {
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
      try {
        const response = await getQuestionnaireRespondent(id);
        const transformed = transformData(response.data.questions);
        setQRETitle(response.data.title);
        setPrizeType(response.data.prizeType);
        setPrize(response.data.prize);
        setMaxWinner(response.data.maxWinner);
        setWinningChance(response.data.winningChance);
        setQuestionnaire(transformed);
      } catch (error) {
        console.error("Failed to get questionnaire", error);
      }
    };

    fetchData();
  }, [id, setQuestionnaire]);

  const handleQuestionToggleSelect = (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  const handleSectionChanges = (sectionId: number) => {
    setActiveSectionId(sectionId);
  };

  const [savedAsDraftState, setSavedAsDraftState] = useState("hidden");
  const OpenSavedAsDraft = () => {
    const newClass = savedAsDraftState === "hidden" ? "flex" : "hidden";
    setSavedAsDraftState(newClass);
  };

  const handleBack = () => {
    router.push("../");
  };

  const handleSave = async () => {
    try {
      await patchAnswer(id, answers);
      OpenSavedAsDraft();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const validateAnswers = () => {
    for (const item of questionnaire) {
      if (item.type === QuestionnaireItemTypes.SECTION) {
        for (const question of item.questions) {
          if (question.isRequired) {
            const answer = answers.find(
              (ans) => ans.questionId === question.questionId,
            );
            if (!answer || !isAnswerValid(answer.answer)) {
              return false;
            }
          }
        }
      } else if (item.type === QuestionnaireItemTypes.DEFAULT) {
        if (item.question.isRequired) {
          const answer = answers.find(
            (ans) => ans.questionId === item.question.questionId,
          );
          if (!answer || !isAnswerValid(answer.answer)) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const isAnswerValid = (answer: string | string[] | undefined): boolean => {
    if (typeof answer === "undefined") {
      return false;
    }
    if (typeof answer === "string") {
      return answer.trim() !== "";
    }
    if (Array.isArray(answer)) {
      return answer.length > 0 && answer.every((ans) => ans.trim() !== "");
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      toast({
        title: "Required fields missing",
        description: "Please fill out all required fields before submitting.",
      });
      return;
    }

    try {
      await patchAnswer(id, answers, true);
      console.log("Submitted answers", answers);
      console.log(questionnaire);
      openFinalizationCard();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  function findQuestionById(
    questionnaire: QuestionnaireItem[],
    questionId: number,
  ): Question | undefined {
    for (const item of questionnaire) {
      if (item.type === QuestionnaireItemTypes.SECTION) {
        const foundQuestion = item.questions.find(
          (question) => question.questionId === questionId,
        );
        if (foundQuestion) {
          return foundQuestion;
        }
      } else if (
        item.type === QuestionnaireItemTypes.DEFAULT &&
        item.question.questionId === questionId
      ) {
        return item.question;
      }
    }
    return undefined;
  }

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
      (answer) => answer.questionId === questionId,
    );

    console.log("is required", isRequired);

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
          <Checkboxes
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId as number}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={choice ?? []}
            answer={answer as string[]}
          />
        ) : (
          <RadioButton
            role="RESPONDENT"
            numbering={index + 1}
            questionId={questionId as number}
            questionTypeName={questionTypeName}
            isRequired={isRequired}
            question={question}
            description={description ?? ""}
            choice={Array.isArray(choice) ? choice : []}
            answer={Array.isArray(answer) ? answer : []}
          />
        )}
      </div>
    );
  };

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

  function transformData(data: QuestionnaireGetItem[]): QuestionnaireItem[] {
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
            question.questionId,
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
          type: QuestionnaireItemTypes.SECTION,
          sectionId: section.sectionId,
          sectionName: section.name,
          sectionDescription: section.description,
          questions: questions,
        } as Section;
      } else {
        const question = item as QuestionGet;

        handleAnswerChange(question.questionId, question.answer);
        const existingQuestion = findQuestionById(
          questionnaire,
          question.questionId,
        );

        if (existingQuestion) {
          const choice = existingQuestion.choice ?? question.choice;
          return {
            type: QuestionnaireItemTypes.DEFAULT,
            question: {
              questionId: question.questionId,
              questionType: question.questionType,
              questionTypeName: question.questionTypeName,
              isRequired: question.isRequired,
              question: question.question,
              description: question.description,
              choice: choice,
            },
          } as DefaultQuestion;
        } else {
          return {
            type: QuestionnaireItemTypes.DEFAULT,
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
      }
    });
  }

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
        title={QRETitle}
        onCancel={OpenSavedAsDraft}
      ></SavedAsDraftModal>
      <FinalizationCard
        className={`${finalizationCard}`}
        prizeType={prizeType}
        prize={prize}
        maxWinner={maxWinner}
        QRETitle={QRETitle}
        winningChance={winningChance}
        onCancel={openFinalizationCard}
      ></FinalizationCard>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <div className="flex flex-col w-full min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle={QRETitle}
            isParticipate={true}
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
                const item = questionnaire[activeSectionId];
                if (
                  item !== undefined &&
                  activeSectionId + 1 <= questionnaire.length - 1
                ) {
                  if (item.type === QuestionnaireItemTypes.DEFAULT) {
                    const defaultQuestion = item as DefaultQuestion;
                    return (
                      <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                        <QuestionUI
                          questionSectionTitle={""}
                          questionSectionText={""}
                          required={false}
                          isParticipate={true}
                          questions={
                            <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                              {defaultQuestion.question.question !== null &&
                                (() => {
                                  const renderedQuestion = findQuestionById(
                                    questionnaire,
                                    defaultQuestion.question
                                      .questionId as number,
                                  ) as Question;

                                  return renderQuestion(
                                    renderedQuestion,
                                    activeSectionId - 1,
                                  );
                                })()}
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
                    const section = item as Section;

                    return (
                      <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                        <QuestionUI
                          questionSectionTitle={section.sectionName}
                          questionSectionText={section.sectionDescription}
                          required={section.questions[0].isRequired}
                          isParticipate={true}
                          questions={
                            <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                              {section.questions?.length >= 1
                                ? section.questions.map((question, index) => {
                                    const renderedQuestion = findQuestionById(
                                      questionnaire,
                                      question.questionId as number,
                                    ) as Question;

                                    return renderQuestion(
                                      renderedQuestion,
                                      index,
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
                  }
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
                          buttonPrevHandler={prev}
                          isEnding={true}
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
