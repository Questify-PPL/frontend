"use client";

import {
  AddQuestionModal,
  FormLeftContents,
  FormLeftMenu,
  FormRightMenu,
  FormUpperMenu,
  OpeningChildren,
  SavedAsDraftModal,
  DesignChildren,
  LogicChildren,
} from "@/components/creator-side/create/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getQuestionnaire, patchQuestionnaire } from "@/lib/action";
import { deleteQuestion } from "@/lib/action/form";
import { steps } from "@/lib/constant";
import {
  Question,
  QuestionnaireItem,
  QuestionnaireItemTypes,
} from "@/lib/context";
import { useMediaQuery, useQuestionnaireContext } from "@/lib/hooks";
import {
  findQuestionById,
  FormLeftMenuState as flms,
  FormRightMenuState as frms,
  handleDuplicate,
  handleMoveDown,
  handleMoveUp,
  QuestionGroup as qg,
  QuestionTypeNames as qtn,
  templateHandler,
  transformData,
} from "@/lib/services/form";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  LuCalendar,
  LuChevronDown,
  LuChevronUp,
  LuCopy,
  LuGlobe,
  LuPlusSquare,
  LuSearch,
  LuTrash,
} from "react-icons/lu";
import { CallBackProps, LIFECYCLE, STATUS } from "react-joyride";
import ConfirmationPublishModal from "./ConfirmationPublishModal";
import { EndingChildren } from "./EndingChildren";
import PublishNowModal from "./PublishNowModal";
import { QuestionChildren } from "./QuestionChildren";
import { EmptyRenderer, QuestionRenderer, TerminusRenderer } from "./Renderer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    publishDate,
    setPublishDate,
    metadata,
    setMetadata,
    setIsOpen,
  } = useQuestionnaireContext();
  const [title, setTitle] = useState<string>("");

  // Modal States
  const [addQuestionState, toggleAddQuestion] = useModalState();
  const [savedAsDraftState, toggleSavedAsDraft] = useModalState();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const fetchQuestionnaire = useCallback(async () => {
    try {
      const response = await getQuestionnaire(id);

      const { title, questions, ...rest } = response.data;

      const transformed = transformData(questions);
      setQuestionnaire(transformed);
      setTitle(title);
      setMetadata(rest);
    } catch (error) {
      console.error("Failed to get questionnaire", error);
      toast({
        title: "Failed to get questionnaire",
        description: (error as Error).message,
      });
    }
  }, [id, setMetadata, setQuestionnaire, toast]);

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
      toast({
        title: "Failed to update questionnaire",
        description: (error as Error).message,
      });
    }
  };

  const handlePublish = async () => {
    if (!publishDate) {
      toast({
        title: "Error Publishing",
        description: "Please set the end date first.",
        variant: "destructive",
      });
      return;
    }

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
            !item.questions?.some((q) => q.questionId === activeQuestion)),
      );

      let questionNumber = 1;

      updatedQuestionnaire.forEach((item) => {
        if (item.type === QuestionnaireItemTypes.DEFAULT) {
          item.question.number = questionNumber++;
        } else if (item.type === QuestionnaireItemTypes.SECTION) {
          item.questions.forEach((q) => {
            q.number = questionNumber++;
          });
        }
      });

      setQuestionnaire(updatedQuestionnaire);
      setActiveQuestion(undefined);
      await patchQuestionnaire(id, updatedQuestionnaire);
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to delete the question", error);
      toast({
        title: "Failed to delete the question",
        description: (error as Error).message,
      });
    }
  };

  const handleAddQuestion = async (questionType: qtn) => {
    const newQuestion = templateHandler(
      questionType,
      questionnaire.length - 1,
    ) as QuestionnaireItem[];
    try {
      await patchQuestionnaire(id, newQuestion);
      toggleAddQuestion();
      await fetchQuestionnaire();
    } catch (error) {
      console.error("Failed to update questionnaire", error);
      toast({
        title: "Failed to add question",
        description: (error as Error).message,
      });
    }
  };

  const decideWhichToRender = () => {
    if (leftMenuState === flms.OPENING) {
      return TerminusRenderer({ sectionKey: qg.OPENING, id: "form-opening" });
    } else if (leftMenuState === flms.ENDING) {
      return TerminusRenderer({ sectionKey: qg.ENDING });
    } else if (activeQuestion !== undefined) {
      const { question } = findQuestionById(activeQuestion, questionnaire);
      return (
        <QuestionRenderer
          q={question as Question}
          isRequired={question?.isRequired as boolean}
        />
      );
    } else {
      return EmptyRenderer();
    }
  };

  useEffect(() => {
    fetchQuestionnaire();
  }, [fetchQuestionnaire]);

  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const hasRun = localStorage.getItem("hasRunJoyride");
    if (!hasRun) {
      setRunJoyride(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, lifecycle } = data;

    if (
      (status === STATUS.FINISHED || status === STATUS.SKIPPED) &&
      lifecycle === LIFECYCLE.COMPLETE
    ) {
      localStorage.setItem("hasRunJoyride", "true");
      setRunJoyride(false);
    }
  };

  const isMobile = useMediaQuery(768);

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <Joyride
        run={runJoyride}
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
        callback={handleJoyrideCallback}
      />

      <AddQuestionModal
        className={`${addQuestionState}`}
        onCancel={toggleAddQuestion}
        onShortTextClick={() => handleAddQuestion(qtn.SHORT_TEXT)}
        onLongTextClick={() => handleAddQuestion(qtn.LONG_TEXT)}
        onDateClick={() => handleAddQuestion(qtn.DATE)}
        onCheckboxClick={() => handleAddQuestion(qtn.CHECKBOX)}
        onMultipleChoiceClick={() => handleAddQuestion(qtn.MULTIPLE_CHOICE)}
        onYesNoClick={() => handleAddQuestion(qtn.YES_NO)}
        onLinkClick={() => handleAddQuestion(qtn.LINK)}
      />

      <SavedAsDraftModal
        className={`${savedAsDraftState}`}
        title={title}
        onCancel={toggleSavedAsDraft}
      />

      {isMobile ? (
        <div className="flex flex-col w-full h-full p-4 gap-2.5">
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="text-primary hover:text-primary gap-2"
                onClick={() => router.push("../../create")}
              >
                Back
              </Button>
              <Button
                variant="outline"
                className="text-primary hover:text-primary gap-2"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
            <Button onClick={toggleAddQuestion}>Add Question</Button>
          </div>

          <Separator className="bg-[#E5EEF0]" />

          <div className="flex flex-col w-full h-full overflow-auto gap-2.5">
            {questionnaire.map((item, index) => {
              if (item.type === QuestionnaireItemTypes.DEFAULT) {
                const isActive = item.question.questionId === activeQuestion;
                const cardClass = isActive
                  ? "flex flex-col bg-accent p-2 gap-1.5"
                  : "border-none shadow-none";
                return (
                  <Card key={index} className={`${cardClass}`}>
                    {isActive && (
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="outline"
                          className="p-2 h-fit"
                          onClick={() => {
                            handleDuplicate(questionnaire, activeQuestion);
                            patchQuestionnaire(id, questionnaire);
                            fetchQuestionnaire();
                          }}
                        >
                          <LuCopy className="text-primary" />
                        </Button>
                        <Button
                          variant="outline"
                          className="p-2 h-fit"
                          onClick={() => {
                            handleMoveUp(questionnaire, activeQuestion);
                            patchQuestionnaire(id, questionnaire);
                            fetchQuestionnaire();
                          }}
                        >
                          <LuChevronUp className="text-primary" />
                        </Button>
                        <Button
                          variant="outline"
                          className="p-2 h-fit"
                          onClick={() => {
                            handleMoveDown(questionnaire, activeQuestion);
                            patchQuestionnaire(id, questionnaire);
                            fetchQuestionnaire();
                          }}
                        >
                          <LuChevronDown className="text-primary" />
                        </Button>
                        <Button
                          variant="outline"
                          className="p-2 h-fit"
                          onClick={() => {
                            handleDelete();
                            patchQuestionnaire(id, questionnaire);
                            fetchQuestionnaire();
                          }}
                        >
                          <LuTrash className="text-primary" />
                        </Button>
                      </div>
                    )}
                    <Card
                      className="p-4"
                      onClick={() =>
                        setActiveQuestion(item.question?.questionId as number)
                      }
                    >
                      {item.question && (
                        <QuestionRenderer
                          q={item.question as Question}
                          isRequired={false}
                        />
                      )}
                    </Card>
                  </Card>
                );
              } else {
                return (
                  <Card key={index} className="p-4">
                    {item.sectionName &&
                      TerminusRenderer({ sectionKey: item.sectionName })}
                  </Card>
                );
              }
            })}
          </div>
          {!metadata.endedAt ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full",
                    !publishDate && "text-muted-foreground",
                  )}
                >
                  <LuCalendar className="mr-2 h-4 w-4" />
                  {publishDate ? (
                    format(publishDate, "PPP")
                  ) : (
                    <span>Questionnaire End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={(date) => setPublishDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : null}
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
        </div>
      ) : (
        <div
          className="flex flex-row w-full h-full gap-4 p-5"
          id="form-wrapper"
        >
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
                        setLoading(true);
                        handleDuplicate(
                          questionnaire,
                          activeQuestion as number,
                        );
                        patchQuestionnaire(id, questionnaire);
                        fetchQuestionnaire();
                        setLoading(false);
                      }}
                      data-testid="duplicate-question"
                      id="duplicate-question"
                      disabled={loading}
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
          </div>

          <FormRightMenu
            className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
            state={rightMenuState}
            onClickQuestion={() => setRightMenuState(frms.QUESTION)}
            onClickDesign={() => setRightMenuState(frms.DESIGN)}
            onClickLogic={() => setRightMenuState(frms.LOGIC)}
            onClickPublish={() => setRightMenuState(frms.PUBLISH)}
            questionChildren={<QuestionChildren id={id} />}
            designChildren={<DesignChildren />}
            logicChildren={<LogicChildren />}
            publishChildren={
              <div className="flex flex-col w-full gap-4">
                <Link
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-[#F3F8F9] h-10 px-4 py-2 text-primary w-full hover:text-primary gap-2"
                  href={`${metadata.id}/preview`}
                  data-testid="preview-button"
                >
                  <LuSearch className="w-5 h-5" />
                  Preview Form
                </Link>
                <Separator className="bg-[#E5EEF0]" />
                {!metadata.endedAt ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full",
                          !publishDate && "text-muted-foreground",
                        )}
                      >
                        <LuCalendar className="mr-2 h-4 w-4" />
                        {publishDate ? (
                          format(publishDate, "PPP")
                        ) : (
                          <span>Questionnaire End Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={(date) => setPublishDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : null}
                <Button
                  variant="outline"
                  className="text-primary w-full hover:text-primary gap-2"
                  onClick={
                    metadata.isPublished ? handleUnpublish : handlePublish
                  }
                  data-testid="publish-button"
                >
                  <LuGlobe className="w-5 h-5" />
                  <span>
                    {metadata.isPublished ? "Unpublish Now" : "Publish Now"}
                  </span>
                </Button>
              </div>
            }
          />
        </div>
      )}

      <ConfirmationPublishModal />
      <PublishNowModal title={title} />
    </div>
  );
};

export default FormWrapper;
