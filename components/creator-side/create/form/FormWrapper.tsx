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
import { LuGlobe, LuPlusSquare } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { transformData } from "@/lib/services/form";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { publishQuestionnaire } from "@/lib/action/form";
import PublishNowModal from "./PublishNowModal";

export default function FormWrapper({ id }: { id: string }) {
  const { questionnaire, answers, setQuestionnaire } =
    useQuestionnaireContext();
  const [QRETitle, setQRETitle] = useState("");
  const router = useRouter();

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

  // Get Specific Question to be displayed
  const [activeQuestionId, setActiveQuestionId] = useState(-1);
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

  // Open Publish Now Modal
  const [openPublishNowState, setOpenPublishNowState] = useState("hidden");
  const OpenPublishNow = () => {
    const newClass = openPublishNowState === "hidden" ? "flex" : "hidden";
    setOpenPublishNowState(newClass);
  };

  // Change Left and Right Menu
  const [leftMenuState, setLeftMenuState] = useState("opening");
  const handleLeftMenuChange = (menuState: React.SetStateAction<string>) => {
    setLeftMenuState(menuState);
  };

  const [rightMenuState, setRightMenuState] = useState("question");
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

  const handlePublish = async () => {
    try {
      await publishQuestionnaire(id);
      OpenPublishNow();
    } catch (error) {
      console.error("Failed to publish questionnaire", error);
    }
  };

  // Mobile Toggle Handler
  const [isMobile, setIsMobile] = useState(true);
  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

  // Find Question by ID
  function findQuestionById(
    questionnaire: QuestionnaireItem[],
    questionId: number
  ): Question | undefined {
    for (const item of questionnaire) {
      if (item.type === "SECTION") {
        const foundQuestion = item.questions.find(
          (question) => question.questionId === questionId
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

  function renderOpening(questionnaire: QuestionnaireItem[]) {
    const openingSection = questionnaire.find(
      (section) =>
        section.type === "SECTION" && section.sectionName === "OPENING"
    );

    if (openingSection) {
      const section = openingSection as Section;

      const handleSectionDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        const updatedQuestionnaire = questionnaire.map((item) => {
          if (item.type === "SECTION" && item.sectionName === "OPENING") {
            return {
              ...item,
              sectionDescription: event.target.value,
            };
          }
          return item;
        });

        setQuestionnaire(updatedQuestionnaire);
      };

      return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-3">
          <span className="text-xs text-primary font-medium">Opening</span>
          <Textarea
            className="text-sm w-full font-normal text-[#64748B] placeholder:text-primary/30 focus-visible:outline-none focus-visible:ring-0"
            placeholder={section.sectionDescription}
            onChange={handleSectionDescriptionChange}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  function renderEnding(questionnaire: QuestionnaireItem[]) {
    const openingSection = questionnaire.find(
      (section) =>
        section.type === "SECTION" && section.sectionName === "ENDING"
    );

    if (openingSection) {
      const section = openingSection as Section;

      const handleSectionDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        const updatedQuestionnaire = questionnaire.map((item) => {
          if (item.type === "SECTION" && item.sectionName === "ENDING") {
            return {
              ...item,
              sectionDescription: event.target.value,
            };
          }
          return item;
        });

        setQuestionnaire(updatedQuestionnaire);
      };

      return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-3">
          <span className="text-xs text-primary font-medium">Ending</span>
          <Textarea
            className="text-sm w-full font-normal text-[#64748B] placeholder:text-primary/30 focus-visible:outline-none focus-visible:ring-0"
            placeholder={section.sectionDescription}
            onChange={handleSectionDescriptionChange}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  function renderQuestion(q: Question, index: number) {
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
  }

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
      <PublishNowModal
        className={`${openPublishNowState}`}
        QRETitle={QRETitle}
        onCancel={handleBack}
      ></PublishNowModal>
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
                    <Checkbox id={`cre${item}`} className="text-xs" />
                    <Label
                      htmlFor={`cre${item}`}
                      className="font-medium text-xs"
                    >
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
                    <Checkbox id={`res${item}`} className="text-xs" />
                    <Label
                      htmlFor={`res${item}`}
                      className="font-medium text-xs"
                    >
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
                    if (
                      section.sectionName === "OPENING" ||
                      section.sectionName === "ENDING"
                    ) {
                      return null;
                    }
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
            {leftMenuState === "opening" ? (
              renderOpening(questionnaire)
            ) : leftMenuState === "ending" ? (
              renderEnding(questionnaire)
            ) : activeQuestionId !== -1 && questionToRender ? (
              renderQuestion(questionToRender, 0)
            ) : (
              <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                <Image
                  src="/assets/choose-question.svg"
                  alt="Questify"
                  width={70}
                  height={16}
                />
                <div className="flex flex-col justify-center items-center">
                  <span className="text-primary text-sm font-semibold">
                    Select a question to start editing
                  </span>
                  <span className="text-[#95B0B4] text-xs">
                    Watch the left pane :D
                  </span>
                </div>
              </div>
            )}
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
          publishChildren={
            <Button
              variant="outline"
              className="text-primary w-full hover:text-primary gap-2"
              onClick={handlePublish}
              data-testid="publish-button"
            >
              <LuGlobe className="w-5 h-5" />
              <span>Publish Now</span>
            </Button>
          }
        />
      </div>
    </div>
  );
}
