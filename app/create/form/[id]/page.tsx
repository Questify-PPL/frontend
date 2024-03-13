"use client";

import React, { useState } from "react";
import FormLeftMenu from "@/components/creator-side/create/form/FormLeftMenu";
import FormRightMenu from "@/components/creator-side/create/form/FormRightMenu";
import FormUpperMenu from "@/components/creator-side/create/form/FormUpperMenu";
import FormLowerMenu from "@/components/creator-side/create/form/FormLowerMenu";
import QuestionToggle from "@/components/creator-side/create/form/QuestionToggle";
import SectionToggle from "@/components/creator-side/create/form/SectionToggle";
import { LuPlusSquare } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QUESTIONNAIRE } from "@/lib/constant";
import { useRouter } from "next/navigation";
import AddQuestionModal from "@/components/creator-side/create/form/AddQuestionModal";

interface Props {
  readonly params: {
    readonly id: string;
  };
}

const Form = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const [leftMenuState, setLeftMenuState] = useState("opening");
  const [rightMenuState, setRightMenuState] = useState("question");
  const [isMobile, setIsMobile] = useState(true);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(-1);
  // const [selectedQuestionJSON, setSelectedQuestionJSON] = useState("");

  // useEffect(() => {
  //   const fetchQuestionnaire = async () => {
  //     try {
  //       const response = await getQuestionnaire(id);
  //       setQuestionnaire(response.data.questions);
  //     } catch (error) {
  //       console.error("Failed to get questionnaire", error);
  //     }
  //   };

  //   fetchQuestionnaire();
  // }, [id]);

  const handleQuestionToggleSelect = (questionId: number) => {
    setActiveQuestionNumber(questionId);
  };

  const [addQuestionState, setAddQuestionState] = useState("hidden");
  const OpenAddQuestion = () => {
    const newClass = addQuestionState === "hidden" ? "flex" : "hidden";
    setAddQuestionState(newClass);
  };

  const handleLeftMenuChange = (menuState: React.SetStateAction<string>) => {
    setLeftMenuState(menuState);
  };
  const handleRightMenuChange = (menuState: React.SetStateAction<string>) => {
    setRightMenuState(menuState);
  };

  const handleBack = () => {
    router.push("../");
  };
  const handleSave = () => {
    console.log("Save");
  };

  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <main className="flex flex-col h-screen w-full">
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
                {QUESTIONNAIRE.map((item) => (
                  <React.Fragment
                    key={
                      item.type === "SECTION" ? item.sectionId : item.type ?? 0
                    }
                  >
                    {item.type === "SECTION" && (
                      <SectionToggle numbering={item.sectionId}>
                        {item.questions?.map((question) => (
                          <QuestionToggle
                            key={question.questionId}
                            isActive={
                              activeQuestionNumber === question.questionId
                            }
                            numbering={question.questionId}
                            questionType={question.questionType}
                            question={question.question}
                            onSelect={() =>
                              handleQuestionToggleSelect(question.questionId)
                            }
                          />
                        ))}
                      </SectionToggle>
                    )}
                    {item.type === "DEFAULT" && item.question && (
                      <QuestionToggle
                        key={item.question.questionId} // Change this line
                        isActive={
                          activeQuestionNumber === item.question.questionId
                        }
                        numbering={item.question.questionId}
                        questionType={item.question.questionType}
                        question={
                          item.question.question === ""
                            ? "Your question here"
                            : item.question.question
                        }
                        onSelect={() =>
                          handleQuestionToggleSelect(item.question.questionId)
                        }
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          }
          endingChildren={<div>Ending Children</div>}
        />

        <div className="flex flex-col w-3/5 min-w-[58%] h-full gap-4">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle="Oreo Satisfaction: User Feedback in Indonesia"
          />
          <span className="flex bg-accent w-full h-full rounded-md">
            {/* {selectedQuestionJSON} */}
          </span>
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
    </main>
  );
};

export default Form;
