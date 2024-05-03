"use client";

import {
  AddQuestionModal,
  FormLeftMenu,
  FormLowerMenu,
  FormRightMenu,
  FormUpperMenu,
  OpeningChildren,
  QuestionToggle,
  SavedAsDraftModal,
  SectionToggle,
} from "@/components/creator-side/create/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getQuestionnaire, patchQuestionnaire } from "@/lib/action";
import { deleteQuestion, publishQuestionnaire } from "@/lib/action/form";
import { Question, QuestionnaireItem } from "@/lib/context";
import { useQuestionnaireContext } from "@/lib/hooks";
import {
  FormLeftMenuState as flms,
  FormRightMenuState as frms,
  QuestionGroup as qg,
  QuestionTypeNames as qtn,
  questionTypeHandler,
  transformData,
} from "@/lib/services/form";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuCopy,
  LuGlobe,
  LuPlusSquare,
  LuTrash,
} from "react-icons/lu";
import PublishNowModal from "./PublishNowModal";
import { EmptyRenderer, QuestionRenderer, TerminusRenderer } from "./Renderer";

export default function FormWrapper({ id }: Readonly<{ id: string }>) {
  const { questionnaire, setQuestionnaire } = useQuestionnaireContext();
  const [QRETitle, setQRETitle] = useState<string>("");

  // Open Add Question Modal
  const [addQuestionState, setAddQuestionState] = useState("hidden");
  const toggleAddQuestion = () => {
    setAddQuestionState(addQuestionState === "hidden" ? "flex" : "hidden");
  };

  // Open Saved As Draft Modal
  const [savedAsDraftState, setSavedAsDraftState] = useState("hidden");
  const toggleSavedAsDraft = () => {
    setSavedAsDraftState(savedAsDraftState === "hidden" ? "flex" : "hidden");
  };

  // Open Publish Now Modal
  const [openPublishNowState, setOpenPublishNowState] = useState("hidden");
  const togglePublishNow = () => {
    const newClass = openPublishNowState === "hidden" ? "flex" : "hidden";
    setOpenPublishNowState(newClass);
  };

  const router = useRouter();

  const fetchQuestionnaire = useCallback(async () => {
    try {
      const response = await getQuestionnaire(id);
      const transformed = transformData(response.data.questions);
      setQuestionnaire(transformed);
      setQRETitle(response.data.title);
      console.log(transformed);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  }, [id, setQuestionnaire]);

  // Get Specific Question to be displayed
  const [activeQuestionId, setActiveQuestionId] = useState(-1);
  const handleQuestionToggleSelect = async (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  // Change Left and Right Menu
  const [leftMenuState, setLeftMenuState] = useState(flms.OPENING);
  const handleLeftMenuChange = (menuState: React.SetStateAction<flms>) => {
    setLeftMenuState(menuState);
  };

  const [rightMenuState, setRightMenuState] = useState(frms.QUESTION);
  const handleRightMenuChange = (menuState: React.SetStateAction<frms>) => {
    setRightMenuState(menuState);
  };

  // Back and Save Handler
  const handleBack = () => {
    router.push("../../create");
  };

  const handleSave = async () => {
    try {
      await patchQuestionnaire(id, questionnaire);
      toggleSavedAsDraft();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const handlePublish = async () => {
    try {
      await publishQuestionnaire(id);
      togglePublishNow();
    } catch (error) {
      console.error("Failed to publish questionnaire", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(id, activeQuestionId);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to delete the question", error);
    }
  };

  const handleMoveUp = async () => {
    try {
      const activeQuestionnaireIndex = questionnaire.findIndex(
        (item) =>
          item.type === "DEFAULT" &&
          item.question.questionId === activeQuestionId,
      );
      const newQuestionnaire = questionnaire.slice();
      if (activeQuestionnaireIndex > 1) {
        const temp = newQuestionnaire[activeQuestionnaireIndex];
        newQuestionnaire[activeQuestionnaireIndex] =
          newQuestionnaire[activeQuestionnaireIndex - 1];
        newQuestionnaire[activeQuestionnaireIndex - 1] = temp;
      } else {
        return;
      }
      await patchQuestionnaire(id, newQuestionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to move the question up", error);
    }
  };

  const handleMoveDown = async () => {
    try {
      const activeQuestionnaireIndex = questionnaire.findIndex(
        (item) =>
          item.type === "DEFAULT" &&
          item.question.questionId === activeQuestionId,
      );
      const newQuestionnaire = questionnaire.slice();
      if (activeQuestionnaireIndex < newQuestionnaire.length - 2) {
        const temp = newQuestionnaire[activeQuestionnaireIndex];
        newQuestionnaire[activeQuestionnaireIndex] =
          newQuestionnaire[activeQuestionnaireIndex + 1];
        newQuestionnaire[activeQuestionnaireIndex + 1] = temp;
      } else {
        return;
      }
      await patchQuestionnaire(id, newQuestionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to move the question down", error);
    }
  };

  const handleDuplicate = async () => {
    try {
      const questionToDuplicate = findQuestionById(
        questionnaire,
        activeQuestionId,
      );
      const duplicatedQuestion = {
        questionId: null,
        questionType: questionToDuplicate?.questionType,
        questionTypeName: questionToDuplicate?.questionTypeName,
        question: questionToDuplicate?.question,
        description: questionToDuplicate?.description,
        isRequired: questionToDuplicate?.isRequired,
      };
      const activeQuestionnaireIndex = questionnaire.findIndex(
        (item) =>
          item.type === "DEFAULT" &&
          item.question.questionId === activeQuestionId,
      );
      const newQuestionnaire = questionnaire.slice();
      newQuestionnaire.splice(activeQuestionnaireIndex + 1, 0, {
        type: "DEFAULT",
        question: duplicatedQuestion as Question,
      });
      await patchQuestionnaire(id, newQuestionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to duplicate the question", error);
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

  const questionToRender = findQuestionById(questionnaire, activeQuestionId);

  const addQuestionHandler = async (questionType: qtn) => {
    const newQuestion = questionTypeHandler(
      questionType,
    ) as QuestionnaireItem[];
    try {
      await patchQuestionnaire(id, questionnaire);
      await patchQuestionnaire(id, newQuestion);
      toggleAddQuestion();
      await fetchQuestionnaire();
      const lastQuestionnaireItem: QuestionnaireItem =
        questionnaire[questionnaire.length - 1];
      if (lastQuestionnaireItem.type === "DEFAULT") {
        setActiveQuestionId(lastQuestionnaireItem.question.questionId ?? 0);
      } else if (lastQuestionnaireItem.type === "SECTION") {
        const lastQuestion =
          lastQuestionnaireItem.questions[
            lastQuestionnaireItem.questions.length - 1
          ];
        setActiveQuestionId(lastQuestion?.questionId ?? 0);
      }
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  function decideWhichToRender() {
    if (leftMenuState === flms.OPENING) {
      return TerminusRenderer({ sectionKey: qg.OPENING });
    }
    if (leftMenuState === flms.ENDING) {
      return TerminusRenderer({ sectionKey: qg.ENDING });
    }

    if (activeQuestionId !== -1 && questionToRender) {
      return QuestionRenderer(questionToRender, -1);
    }
    return EmptyRenderer();
  }

  useEffect(() => {
    fetchQuestionnaire();
  }, [fetchQuestionnaire]);

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <AddQuestionModal
        className={`${addQuestionState}`}
        onCancel={toggleAddQuestion}
        onShortTextClick={() => addQuestionHandler(qtn.SHORT_TEXT)}
        onLongTextClick={() => addQuestionHandler(qtn.LONG_TEXT)}
        onCheckboxClick={() => addQuestionHandler(qtn.CHECKBOX)}
        onMultipleChoiceClick={() => addQuestionHandler(qtn.MULTIPLE_CHOICE)}
        onYesNoClick={() => addQuestionHandler(qtn.YES_NO)}
      ></AddQuestionModal>

      <SavedAsDraftModal
        className={`${savedAsDraftState}`}
        QRETitle={QRETitle}
        onCancel={toggleSavedAsDraft}
      ></SavedAsDraftModal>

      <PublishNowModal
        className={`${openPublishNowState}`}
        QRETitle={QRETitle}
        onCancel={togglePublishNow}
      ></PublishNowModal>

      <div className="flex flex-row w-full h-full gap-4 p-5">
        <FormLeftMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={leftMenuState}
          onClickOpening={() => {
            handleLeftMenuChange(flms.OPENING);
            patchQuestionnaire(id, questionnaire);
          }}
          onClickContents={() => {
            handleLeftMenuChange(flms.CONTENTS);
            patchQuestionnaire(id, questionnaire);
          }}
          onClickEnding={() => {
            handleLeftMenuChange(flms.ENDING);
            patchQuestionnaire(id, questionnaire);
          }}
          openingChildren={<OpeningChildren />}
          contentsChildren={
            <div className="flex flex-col w-full h-full gap-4">
              <Button
                variant="outline"
                className="text-primary hover:text-primary gap-2"
                onClick={toggleAddQuestion}
              >
                <LuPlusSquare className="w-5 h-5" />
                <span>Add Question</span>
              </Button>
              <Separator className="bg-[#E5EEF0]"></Separator>
              <div className="flex flex-col overflow-y-auto gap-1.5">
                {questionnaire.map((questionnaireItem, index) => {
                  const item = questionnaireItem;
                  let questionNum = index;

                  if (item.type === "SECTION") {
                    const section = item;
                    if (
                      section.sectionName === qg.OPENING ||
                      section.sectionName === qg.ENDING
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
                                handleQuestionToggleSelect(
                                  question.questionId ?? 0,
                                )
                              }
                            />
                          );
                        })}
                      </SectionToggle>
                    );
                  } else {
                    const defaultQuestion = item;
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
                          handleQuestionToggleSelect(question.questionId ?? 0)
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
          <div className="flex flex-col w-full h-full items-center gap-2">
            {leftMenuState !== flms.OPENING &&
              leftMenuState !== flms.ENDING && (
                <div className="flex items-center justify-start w-1/2">
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={handleDelete}
                    data-testid="delete-question"
                  >
                    <LuTrash className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={handleDuplicate}
                    data-testid="duplicate-question"
                  >
                    <LuCopy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={handleMoveUp}
                    data-testid="move-up-question"
                  >
                    <LuChevronUp className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={handleMoveDown}
                    data-testid="move-down-question"
                  >
                    <LuChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              )}
            <Card className="flex w-1/2 h-full rounded-md p-5">
              {decideWhichToRender()}
            </Card>
          </div>
          <FormLowerMenu onChange={handleMobileToggle} isMobile={isMobile} />
        </div>

        <FormRightMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={rightMenuState}
          onClickQuestion={() => handleRightMenuChange(frms.QUESTION)}
          onClickDesign={() => handleRightMenuChange(frms.DESIGN)}
          onClickLogic={() => handleRightMenuChange(frms.LOGIC)}
          onClickPublish={() => handleRightMenuChange(frms.PUBLISH)}
          questionChildren={<div>Question Children</div>}
          designChildren={<div>Design Children</div>}
          logicChildren={<div>Logic Children</div>}
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
