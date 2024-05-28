import { IndividualQuestion } from "@/components/common/IndividualQuestion";
import QuestionUI from "@/components/respondent-side/Question";
import Terminus from "@/components/respondent-side/Terminus";
import FinalizationCard from "@/components/respondent-side/join/FinalizationCard";
import { Card } from "@/components/ui/card";
import { Question } from "@/lib/context";
import { usePreviewContext } from "@/lib/context/PreviewContext";
import {
  QuestionGet,
  QuestionGroupedWithAnswerAndChoice,
  QuestionnaireGetItem,
  SectionGet,
} from "@/lib/types";
import { useState } from "react";
import { LuCheck, LuCheckCheck, LuChevronRight } from "react-icons/lu";

export function PreviewLogic() {
  const { questionnaire } = usePreviewContext();

  // eslint-disable-next-line no-unused-vars
  const [finalizationCard, setFinalizationCard] = useState("hidden");
  const [activeQuestionId, setActiveQuestionId] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSectionChanges = async (sectionId: number) => {
    setActiveSectionId(sectionId);
  };

  const handleQuestionToggleSelect = async (questionId: number) => {
    setActiveQuestionId(questionId);
  };

  const next = async () => {
    if (activeSectionId === 0) {
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId + 1 <= questionnaire.questions.length - 1) {
      await handleSectionChanges(activeSectionId + 1);
    } else if (activeSectionId + 1 === questionnaire.questions.length) {
      return;
    }
  };

  const prev = async () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setActiveSectionId(activeSectionId - 1);
      handleQuestionToggleSelect(activeQuestionId - 1);
    }
    if (activeSectionId === 0) {
    } else if (activeSectionId <= questionnaire.questions.length) {
      await handleSectionChanges(activeSectionId - 1);
    }
  };

  function findQuestionById(
    questionnaire: QuestionnaireGetItem[],
    questionId: number
  ): Question | undefined {
    for (let item of questionnaire) {
      if (
        item.sectionId !== null &&
        (item as SectionGet).questions !== undefined
      ) {
        const foundQuestion = (item as SectionGet).questions.find(
          (question) => question.questionId === questionId
        );
        if (foundQuestion) {
          return foundQuestion;
        }
      } else if (
        item.sectionId === null &&
        (item as QuestionGet).questionId === questionId
      ) {
        return item as QuestionGet;
      }
    }
    return undefined;
  }

  const renderQuestion = (question: Question, index: number) => {
    function mapToQuestionGrouped(
      question: Question
    ): QuestionGroupedWithAnswerAndChoice {
      return {
        questionId: question.questionId ?? 0,
        questionType: question.questionType as "TEXT" | "RADIO" | "CHECKBOX",
        questionTypeName: question.questionTypeName,
        isRequired: question.isRequired,
        question: question.question,
        description: question.description ?? "",
        choice: question.choice,
        sectionId: null,
        answer: "",
      };
    }

    return (
      <div className="flex flex-col w-full" key={question.questionId}>
        <IndividualQuestion
          val={mapToQuestionGrouped(question)}
          index={index + 1}
        />
      </div>
    );
  };

  return (
    <>
      <FinalizationCard
        className={`${finalizationCard}`}
        prizeType={questionnaire.prizeType}
        prize={questionnaire.prize}
        maxWinner={questionnaire.maxWinner ?? 0}
        QRETitle={questionnaire.title}
        // onCancel={openFinalizationCard}
      ></FinalizationCard>
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <div className="flex flex-col w-full min-w-[58%] h-full gap-4 justify-center items-center">
          {activeSectionId === 0
            ? (() => {
                const item = questionnaire.questions[0];
                if (item !== undefined) {
                  const section = item as SectionGet;
                  return (
                    <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                      <Terminus
                        QRETitle=""
                        isParticipate={true}
                        terminusSectionTitle={section.name}
                        terminusText={section.description}
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
                const item = questionnaire.questions[activeSectionId];
                if (
                  item !== undefined &&
                  activeSectionId + 1 <= questionnaire.questions.length - 1
                ) {
                  const section = item as SectionGet;
                  console.log("choice: ", section.questions);
                  return (
                    <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                      <QuestionUI
                        questionSectionTitle={"Section " + activeSectionId}
                        questionSectionText={section.name}
                        required={true}
                        isParticipate={true}
                        questions={
                          <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                            {section.questions?.length >= 1
                              ? section.questions.map((question, index) => {
                                  console.log("Question UI: ", question);
                                  const renderedQuestion = findQuestionById(
                                    questionnaire.questions,
                                    question.questionId
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
                  const item = questionnaire.questions[activeSectionId];
                  if (
                    item !== undefined &&
                    activeSectionId + 1 == questionnaire.questions.length
                  ) {
                    const section = item as SectionGet;
                    return (
                      <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                        <Terminus
                          QRETitle=""
                          isParticipate={true}
                          terminusSectionTitle={section.name}
                          terminusText={section.description}
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
    </>
  );
}
