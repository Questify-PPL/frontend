"use client";

import React, { useState } from "react";
import FormLeftMenu from "@/components/creator-side/create/form/FormLeftMenu";
import FormRightMenu from "@/components/creator-side/create/form/FormRightMenu";
import FormUpperMenu from "@/components/creator-side/create/form/FormUpperMenu";
import FormLowerMenu from "@/components/creator-side/create/form/FormLowerMenu";
import QuestionToggle from "@/components/creator-side/create/form/QuestionToggle";
import SectionToggle from "@/components/creator-side/create/form/SectionToggle";
import { RadioButton, Text, Checkboxes } from "@/components/questions";
import { Section, DefaultQuestion, Question } from "@/lib/context";
import { LuPlusSquare } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import AddQuestionModal from "@/components/creator-side/create/form/AddQuestionModal";
import { useQuestionnaireContext } from "@/lib/hooks";
import { QuestionnaireItem } from "@/lib/context";
import { Card } from "@/components/ui/card";

export default function FormWrapper() {
  const { questionnaire, answers } = useQuestionnaireContext();
  const router = useRouter();
  const [leftMenuState, setLeftMenuState] = useState("opening");
  const [rightMenuState, setRightMenuState] = useState("question");
  const [isMobile, setIsMobile] = useState(true);
  const [activeQuestionId, setActiveQuestionId] = useState(-1);

  // Get Specific Question to be displayed
  const handleQuestionToggleSelect = (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  // Open Add Question Modal
  const [addQuestionState, setAddQuestionState] = useState("hidden");
  const OpenAddQuestion = () => {
    const newClass = addQuestionState === "hidden" ? "flex" : "hidden";
    setAddQuestionState(newClass);
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
    router.push("../");
  };
  const handleSave = () => {
    console.log("Save");
  };

  // Mobile Toggle Handler
  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

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

  return (
    <div className="flex w-full h-full" data-testid="form-wrapper">
      <AddQuestionModal
        className={`${addQuestionState}`}
        onCancel={OpenAddQuestion}
      ></AddQuestionModal>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <FormLeftMenu
          className="hidden md:flex w-1/5 md:min-w-[20%] h-full"
          state={leftMenuState}
          onClickOpening={() => handleLeftMenuChange("opening")}
          onClickContents={() => handleLeftMenuChange("contents")}
          onClickEnding={() => handleLeftMenuChange("ending")}
          openingChildren={<div>Opening Children</div>}
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
                              questionType={question.questionTypeName}
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
            QRETitle="Oreo Satisfaction: User Feedback in Indonesia"
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
