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
import {
  deleteQuestion,
  publishQuestionnaire,
  unpublishQuestionnaire,
} from "@/lib/action/form";
import {
  Question,
  QuestionnaireItem,
  QuestionnaireItemTypes,
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
  LuSearch,
  LuTrash,
} from "react-icons/lu";
import PublishNowModal from "./PublishNowModal";
import { EmptyRenderer, QuestionRenderer, TerminusRenderer } from "./Renderer";
import dynamic from "next/dynamic";
import { EndingChildren } from "./EndingChildren";
import { QuestionChildren } from "./QuestionChildren";
import { steps } from "@/lib/constant";
import Link from "next/link";
import ConfirmationPublishModal from "./ConfirmationPublishModal";
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

const useModalState = () => {
  const [state, setState] = useState("hidden");
  const toggle = () => setState(state === "hidden" ? "flex" : "hidden");
  return [state, toggle] as const;
};

const FormWrapper: React.FC<{ id: string }> = ({ id }) => {
  const {
    questionnaire,
    setQuestionnaire,
    activeQuestion,
    setActiveQuestion,
    metadata,
    setMetadata,
    setIsOpen,
  } = useQuestionnaireContext();
  const [title, setTitle] = useState<string>("");

  // Modal States
  const [addQuestionState, toggleAddQuestion] = useModalState();
  const [savedAsDraftState, toggleSavedAsDraft] = useModalState();
  const [openPublishNowState, togglePublishNow] = useModalState();

  const router = useRouter();

  // Mobile State
  const [isMobile, setIsMobile] = useState(false);
  const toggleMobile = () => setIsMobile(!isMobile);

  const fetchQuestionnaire = useCallback(async () => {
    try {
      const response = await getQuestionnaire(id);
      console.log(response.data);

      const { title, questions, ...rest } = response.data;

      const transformed = transformData(questions);
      setQuestionnaire(transformed);
      setTitle(title);
      setMetadata(rest);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
    }
  }, [id, setMetadata, setQuestionnaire]);

  // Left and Right Menu State
  const [leftMenuState, setLeftMenuState] = useState(flms.CONTENTS);
  const [rightMenuState, setRightMenuState] = useState(frms.QUESTION);

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
    setIsOpen(true);
  };

  const handleUnpublish = async () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(id, activeQuestion as number);
      const updatedQuestionnaire = questionnaire.filter(
        (item) =>
          (item.type === QuestionnaireItemTypes.DEFAULT &&
            item.question?.questionId !== activeQuestion) ||
          (item.type === QuestionnaireItemTypes.SECTION &&
            !item.questions?.some((q) => q.questionId === activeQuestion))
      );

      // Update the numbering of the remaining questions
      updatedQuestionnaire.forEach((item, index) => {
        if (item.type === QuestionnaireItemTypes.DEFAULT) {
          item.question.number = index + 1;
        } else if (item.type === QuestionnaireItemTypes.SECTION) {
          item.questions.forEach((q, qIndex) => {
            q.number = index + qIndex + 1;
          });
        }
      });

      setQuestionnaire(updatedQuestionnaire);
      setActiveQuestion(undefined);
      await patchQuestionnaire(id, updatedQuestionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to delete the question", error);
    }
  };

  const handleAddQuestion = async (questionType: qtn) => {
    const newQuestion = templateHandler(
      questionType,
      questionnaire.length - 1
    ) as QuestionnaireItem[];
    try {
      await patchQuestionnaire(id, newQuestion);
      toggleAddQuestion();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
    }
  };

  const decideWhichToRender = () => {
    if (leftMenuState === flms.OPENING) {
      return TerminusRenderer({ sectionKey: qg.OPENING, id: "form-opening" });
    } else if (leftMenuState === flms.ENDING) {
      return TerminusRenderer({ sectionKey: qg.ENDING });
    } else if (activeQuestion !== undefined) {
      return QuestionRenderer(
        findQuestionById(activeQuestion, questionnaire).question as Question
      );
    } else {
      return EmptyRenderer();
    }
  };

  useEffect(() => {
    fetchQuestionnaire();
  }, [fetchQuestionnaire]);

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <Joyride
        run
        steps={steps}
        showProgress
        showSkipButton
        continuous
        styles={{
          options: {
            zIndex: 10000,
          },
          buttonNext: {
            backgroundColor: "#33646C",
            color: "#fff",
            borderRadius: "10px",
          },
          buttonBack: {
            color: "#33646C",
            borderRadius: "10px",
          },
          buttonSkip: {
            color: "#33646C",
            borderRadius: "10px",
          },
          buttonClose: {
            color: "#33646C",
            borderRadius: "10px",
          },
        }}
        floaterProps={{
          hideArrow: true,
        }}
      />

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

      <div className="flex flex-row w-full h-full gap-4 p-5" id="form-wrapper">
        <FormLeftMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={leftMenuState}
          onClickOpening={() => setLeftMenuState(flms.OPENING)}
          onClickContents={() => setLeftMenuState(flms.CONTENTS)}
          onClickEnding={() => setLeftMenuState(flms.ENDING)}
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
          endingChildren={<EndingChildren />}
        />

        <div className="flex flex-col w-3/5 min-w-[58%] h-full gap-4 justify-center items-center">
          <FormUpperMenu
            onBack={() => router.push("../../create")}
            onSave={handleSave}
            QRETitle={title}
          />
          <div className="flex flex-col w-full h-full items-center gap-2">
            {leftMenuState !== flms.OPENING &&
              leftMenuState !== flms.ENDING && (
                <div className="flex items-center justify-start w-1/2 gap-1">
                  <Button
                    variant="outline"
                    className="h-full text-primary hover:text-primary p-2"
                    onClick={handleDelete}
                    data-testid="delete-question"
                    id="delete-question"
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
                    id="duplicate-question"
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
                    id="move-up-question"
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
                    id="move-down-question"
                  >
                    <LuChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              )}
            <Card className="flex w-1/2 h-full rounded-md p-5">
              {decideWhichToRender()}
            </Card>
          </div>
          <FormLowerMenu onChange={toggleMobile} isMobile={isMobile} />
        </div>

        <FormRightMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={rightMenuState}
          onClickQuestion={() => setRightMenuState(frms.QUESTION)}
          onClickDesign={() => setRightMenuState(frms.DESIGN)}
          onClickLogic={() => setRightMenuState(frms.LOGIC)}
          onClickPublish={() => setRightMenuState(frms.PUBLISH)}
          questionChildren={<QuestionChildren id={id} />}
          designChildren={<div>Design Children</div>}
          logicChildren={<div>Logic Children</div>}
          publishChildren={
            <>
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-[#F3F8F9] h-10 px-4 py-2 text-primary w-full hover:text-primary gap-2"
                href={`${metadata.id}/preview`}
                data-testid="preview-button"
              >
                <LuSearch className="w-5 h-5" />
                Preview Form
              </Link>
              <Button
                variant="outline"
                className="text-primary w-full hover:text-primary gap-2"
                onClick={metadata.isPublished ? handleUnpublish : handlePublish}
                data-testid="publish-button"
              >
                <LuGlobe className="w-5 h-5" />
                <span>
                  {metadata.isPublished ? "Unpublish Now" : "Publish Now"}
                </span>
              </Button>
            </>
          }
        />
      </div>

      <ConfirmationPublishModal />
    </div>
  );
};

export default FormWrapper;
