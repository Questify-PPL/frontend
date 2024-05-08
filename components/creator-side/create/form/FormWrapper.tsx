"use client";

import {
  AddQuestionModal,
  FormLeftMenu,
  FormLeftContents,
  FormLowerMenu,
  FormRightMenu,
  FormUpperMenu,
  OpeningChildren,
  SavedAsDraftModal,
} from "@/components/creator-side/create/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getQuestionnaire, patchQuestionnaire } from "@/lib/action";
import { deleteQuestion, publishQuestionnaire } from "@/lib/action/form";
import {
  DefaultQuestion,
  Question,
  QuestionnaireItem,
  QuestionnaireItemTypes,
  Section,
} from "@/lib/context";
import { useQuestionnaireContext } from "@/lib/hooks";
import {
  FormLeftMenuState as flms,
  FormRightMenuState as frms,
  QuestionGroup as qg,
  QuestionTypeNames as qtn,
  templateHandler,
  transformData,
  handleMoveUp,
  handleMoveDown,
  handleDuplicate,
  findQuestionById,
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
  const { questionnaire, setQuestionnaire, activeQuestion, setActiveQuestion } =
    useQuestionnaireContext();
  const [title, setTitle] = useState<string>("");

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
      setTitle(response.data.title);
      console.log(transformed);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  }, [id, setQuestionnaire]);

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
      await deleteQuestion(id, activeQuestion as number);
      const index = questionnaire.findIndex(
        (item) =>
          (item.type === QuestionnaireItemTypes.DEFAULT &&
            item.question?.questionId === activeQuestion) ||
          (item.type === QuestionnaireItemTypes.SECTION &&
            item.questions?.some((q) => q.questionId === activeQuestion)),
      );

      if (index !== -1) {
        // Remove the question from the questionnaire
        questionnaire.splice(index, 1);

        // Update the numbering of the remaining questions
        for (let i = index; i < questionnaire.length; i++) {
          if (questionnaire[i].type === QuestionnaireItemTypes.DEFAULT) {
            (questionnaire[i] as DefaultQuestion).question.number -= 1;
          } else if (questionnaire[i].type === QuestionnaireItemTypes.SECTION) {
            (questionnaire[i] as Section).questions.forEach((q) => {
              q.number -= 1;
            });
          }
        }
      }

      setActiveQuestion(undefined);
      await patchQuestionnaire(id, questionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to delete the question", error);
    }
  };

  // Mobile Toggle Handler
  const [isMobile, setIsMobile] = useState(true);
  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

  const handleAddQuestion = async (questionType: qtn) => {
    const newQuestion = templateHandler(
      questionType,
      questionnaire.length - 1,
    ) as QuestionnaireItem[];
    try {
      await patchQuestionnaire(id, questionnaire);
      await patchQuestionnaire(id, newQuestion);
      toggleAddQuestion();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  function decideWhichToRender() {
    if (leftMenuState === flms.OPENING) {
      return TerminusRenderer({ sectionKey: qg.OPENING });
    } else if (leftMenuState === flms.ENDING) {
      return TerminusRenderer({ sectionKey: qg.ENDING });
    } else if (activeQuestion) {
      return QuestionRenderer(
        findQuestionById(activeQuestion, questionnaire).question as Question,
      );
    } else {
      return EmptyRenderer();
    }
  }

  useEffect(() => {
    fetchQuestionnaire();
  }, [fetchQuestionnaire]);

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <AddQuestionModal
        className={`${addQuestionState}`}
        onCancel={toggleAddQuestion}
        onShortTextClick={() => handleAddQuestion(qtn.SHORT_TEXT)}
        onLongTextClick={() => handleAddQuestion(qtn.LONG_TEXT)}
        onCheckboxClick={() => handleAddQuestion(qtn.CHECKBOX)}
        onMultipleChoiceClick={() => handleAddQuestion(qtn.MULTIPLE_CHOICE)}
        onYesNoClick={() => handleAddQuestion(qtn.YES_NO)}
      />

      <SavedAsDraftModal
        className={`${savedAsDraftState}`}
        title={title}
        onCancel={toggleSavedAsDraft}
      />

      <PublishNowModal
        className={`${openPublishNowState}`}
        title={title}
        onCancel={togglePublishNow}
      />

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
              <Separator className="bg-[#E5EEF0]" />
              <FormLeftContents />
            </div>
          }
          endingChildren={<div>Ending Children</div>}
        />

        <div className="flex flex-col w-3/5 min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle={title}
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
                    onClick={() => {
                      handleDuplicate(questionnaire, activeQuestion as number);
                      patchQuestionnaire(id, questionnaire);
                      fetchQuestionnaire();
                    }}
                    data-testid="duplicate-question"
                  >
                    <LuCopy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={() => {
                      handleMoveUp(questionnaire, activeQuestion as number);
                      patchQuestionnaire(id, questionnaire);
                      fetchQuestionnaire();
                    }}
                    data-testid="move-up-question"
                  >
                    <LuChevronUp className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={() => {
                      handleMoveDown(questionnaire, activeQuestion as number);
                      patchQuestionnaire(id, questionnaire);
                      fetchQuestionnaire();
                    }}
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
