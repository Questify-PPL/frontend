"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FormLeftMenu,
  FormRightMenu,
  FormUpperMenu,
  FormLowerMenu,
  QuestionToggle,
  SectionToggle,
  SavedAsDraftModal,
  AddQuestionModal,
} from "@/components/creator-side/create/form";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import {
  Section,
  DefaultQuestion,
  Question,
  QuestionnaireItem,
} from "@/lib/context";
import { useQuestionnaireContext } from "@/lib/hooks";
import { patchQuestionnaire, getQuestionnaire } from "@/lib/action";
import { LuPlusSquare } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function FormWrapper({ id }: { id: string }) {
  const { questionnaire, answers, setQuestionnaire } =
    useQuestionnaireContext();
  const [QRETitle, setQRETitle] = useState("");
  const router = useRouter();
  const [leftMenuState, setLeftMenuState] = useState("opening");
  const [rightMenuState, setRightMenuState] = useState("question");
  const [isMobile, setIsMobile] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState(-1);

  // Get Specific Question to be displayed
  const handleQuestionToggleSelect = async (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  // Open Add Question Modal
  const [addQuestionState, setAddQuestionState] = useState("hidden");
  const OpenAddQuestion = () => {
    const newClass = addQuestionState === "hidden" ? "flex" : "hidden";
    setAddQuestionState(newClass);
  };

  // Open Saved As Draft Modal
  const [savedAsDraftState, setSavedAsDraftState] = useState("hidden");
  const OpenSavedAsDraft = () => {
    const newClass = savedAsDraftState === "hidden" ? "flex" : "hidden";
    setSavedAsDraftState(newClass);
  };

  // Change Left and Right Menu
  const handleLeftMenuChange = (menuState: React.SetStateAction<string>) => {
    setLeftMenuState(menuState);
  };
  const handleRightMenuChange = (menuState: React.SetStateAction<string>) => {
    setRightMenuState(menuState);
  };

  // Back and Save Handler
  const handleBack = () => {
    router.push("../../create");
  };

  const handleSave = async () => {
    try {
      await patchQuestionnaire(id, questionnaire);
      OpenSavedAsDraft();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  // Mobile Toggle Handler
  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
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
    const answer =
      answers.find((answer) => answer.questionId === questionId)?.answer ?? "";

    return (
      <div className="flex flex-col w-full" key={questionId}>
        {questionType === "TEXT" ? (
          <Text
            role="CREATOR"
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
            role="CREATOR"
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
            role="CREATOR"
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

  const questionToRender = findQuestionById(questionnaire, activeQuestionId);

  const addQuestionHandler = async (newQuestion: any) => {
    try {
      await patchQuestionnaire(id, questionnaire);
      await patchQuestionnaire(id, newQuestion);
      setAddQuestionState("hidden");
      await fetchQuestionnaire();
      setActiveQuestionId(questionnaire.length - 1);
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const handleShortTextClick = () => {
    const shortTextQuestion = [
      {
        type: "DEFAULT",
        question: {
          questionType: "TEXT",
          questionTypeName: "Short Text",
          isRequired: false,
          question: "",
        },
      },
    ];
    addQuestionHandler(shortTextQuestion);
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
          choice: [], // No choice provided in JSON A for now
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
          },
        } as DefaultQuestion;
      }
    });
  }

  const fetchQuestionnaire = async () => {
    try {
      const response = await getQuestionnaire(id);
      const transformed = transformData(response.data.questions);
      setQuestionnaire(transformed);
      setQRETitle(response.data.title);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  };

  // Questionnaire Fetching
  useEffect(() => {
    fetchQuestionnaire();
  }, [id]);

  const CreatorInfo = [
    "First Name",
    "Last Name",
    "Gender",
    "Email",
    "Phone Number",
    "Company",
  ] as const;

  const RespondentInfo = [
    "First Name",
    "Last Name",
    "Gender",
    "Email",
    "Phone Number",
    "Company",
  ] as const;

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <AddQuestionModal
        className={`${addQuestionState}`}
        onCancel={OpenAddQuestion}
        onShortTextClick={handleShortTextClick}
      ></AddQuestionModal>
      <SavedAsDraftModal
        className={`${savedAsDraftState}`}
        QRETitle={QRETitle}
        onCancel={OpenSavedAsDraft}
      ></SavedAsDraftModal>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <FormLeftMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={leftMenuState}
          onClickOpening={() => {
            handleLeftMenuChange("opening");
            patchQuestionnaire(id, questionnaire);
          }}
          onClickContents={() => {
            handleLeftMenuChange("contents");
            patchQuestionnaire(id, questionnaire);
          }}
          onClickEnding={() => {
            handleLeftMenuChange("ending");
            patchQuestionnaire(id, questionnaire);
          }}
          openingChildren={
            <form className="flex flex-col w-full h-full gap-2">
              <span className="flex flex-col font-bold text-xs text-wrap">
                Specify your personal details disclosure
              </span>
              <div className="flex flex-col gap-1">
                {CreatorInfo.map((item, index) => (
                  <div key={index} className="flex flex-row gap-1.5 w-full">
                    <Checkbox id={item} className="text-xs" />
                    <Label htmlFor={item} className="font-medium text-xs">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
              <Separator className="bg-[#E5EEF0]"></Separator>
              <div className="flex flex-col gap-0">
                <span className="flex flex-col font-bold text-xs text-wrap">
                  Specify the required respondent data
                </span>
                <span className="flex flex-col font-normal text-[#95B0B4] text-[10px] leading-3 text-wrap">
                  If you add another, the question will expect a short answer.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {RespondentInfo.map((item, index) => (
                  <div key={index} className="flex flex-row gap-1.5 w-full">
                    <Checkbox id={item} className="text-xs" />
                    <Label htmlFor={item} className="font-medium text-xs">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </form>
          }
          contentsChildren={
            <div className="flex flex-col w-full h-full gap-4">
              <Button
                variant="outline"
                className="text-primary hover:text-primary gap-2"
                onClick={OpenAddQuestion}
              >
                <LuPlusSquare className="w-5 h-5" />
                <span>Add Question</span>
              </Button>
              <Separator className="bg-[#E5EEF0]"></Separator>
              <div className="flex flex-col overflow-y-auto gap-1.5">
                {questionnaire.map((questionnaireItem, index) => {
                  const item = questionnaireItem;
                  let questionNum = index + 1;

                  if (item.type === "SECTION") {
                    const section = item as Section;
                    let sectionNum = 0;
                    return (
                      <SectionToggle
                        numbering={questionNum}
                        key={section.sectionId}
                      >
                        {section.questions?.map((question, innerIndex) => {
                          sectionNum = innerIndex + 1;
                          return (
                            <QuestionToggle
                              key={question.questionId}
                              isActive={
                                activeQuestionId === question.questionId
                              }
                              numbering={sectionNum}
                              questionType={question?.questionTypeName}
                              question={question.question}
                              onSelect={() =>
                                handleQuestionToggleSelect(question.questionId)
                              }
                            />
                          );
                        })}
                      </SectionToggle>
                    );
                  } else {
                    const defaultQuestion = item as DefaultQuestion;
                    const question = defaultQuestion.question;
                    return (
                      <QuestionToggle
                        key={question.questionId}
                        isActive={activeQuestionId === question.questionId}
                        numbering={questionNum}
                        questionType={question.questionTypeName}
                        question={
                          question.question === ""
                            ? "Your question here"
                            : question.question
                        }
                        onSelect={() =>
                          handleQuestionToggleSelect(question.questionId)
                        }
                      />
                    );
                  }
                })}
              </div>
            </div>
          }
          endingChildren={<div>Ending Children</div>}
        />

        <div className="flex flex-col w-3/5 min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle={QRETitle}
          />
          <Card className="flex w-[50%] h-full rounded-md p-5">
            {activeQuestionId !== -1 && questionToRender
              ? renderQuestion(questionToRender, 0) // Only called if questionToRender is not undefined
              : "Select a question to edit"}
          </Card>
          <FormLowerMenu onChange={handleMobileToggle} isMobile={isMobile} />
        </div>

        <FormRightMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={rightMenuState}
          onClickQuestion={() => handleRightMenuChange("question")}
          onClickDesign={() => handleRightMenuChange("design")}
          onClickLogic={() => handleRightMenuChange("logic")}
          onClickPreview={() => handleRightMenuChange("preview")}
          onClickPublish={() => handleRightMenuChange("publish")}
          questionChildren={<div>Question Children</div>}
          designChildren={<div>Design Children</div>}
          logicChildren={<div>Logic Children</div>}
          previewChildren={<div>Preview Children</div>}
          publishChildren={<div>Publish Children</div>}
        />
      </div>
    </div>
  );
}
