import { IndividualQuestion } from "@/components/common/IndividualQuestion";
import QuestionUI from "@/components/respondent-side/Question";
import Terminus from "@/components/respondent-side/Terminus";
import FinalizationCard from "@/components/respondent-side/join/FinalizationCard";
import { Button } from "@/components/ui/button";
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
import {
  LuCheck,
  LuCheckCheck,
  LuChevronDown,
  LuChevronRight,
  LuChevronUp,
} from "react-icons/lu";

export function PreviewLogic() {
  const { questionnaire } = usePreviewContext();

  // eslint-disable-next-line no-unused-vars
  const [finalizationCard, setFinalizationCard] = useState("hidden");
  const [currentStep, setCurrentStep] = useState(0);

  console.log(currentStep);

  function next() {
    if (currentStep === 0) {
      setCurrentStep((step) => step + 1);
    } else if (currentStep + 1 <= questionnaire.questions.length - 1) {
      setCurrentStep((step) => step + 1);
    } else if (currentStep + 1 === questionnaire.questions.length) {
      return;
    }
  }

  function prev() {
    if (currentStep <= questionnaire.questions.length) {
      setCurrentStep((step) => step - 1);
    }
  }

  function findQuestionById(
    questionnaire: QuestionnaireGetItem[],
    questionId: number,
  ): Question | undefined {
    for (let item of questionnaire) {
      if (
        item.sectionId !== null &&
        (item as SectionGet).questions !== undefined
      ) {
        const foundQuestion = (item as SectionGet).questions.find(
          (question) => question.questionId === questionId,
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
      question: Question,
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
          {currentStep === 0 &&
            (() => {
              const item = questionnaire.questions[currentStep];

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
            })()}
          {currentStep != 0 &&
            (() => {
              const item = questionnaire.questions[currentStep];
              if (
                item !== undefined &&
                currentStep + 1 <= questionnaire.questions.length - 1
              ) {
                return (
                  <Card className="flex flex-row md:w-[70%] w-full h-full justify-center items-center">
                    {item.sectionId !== null ? (
                      <QuestionUI
                        questionSectionTitle={(item as SectionGet).name}
                        questionSectionText={(item as SectionGet).description}
                        required={true}
                        isParticipate={true}
                        prevButton={prev}
                        nextButton={next}
                        questions={
                          <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                            {(item as SectionGet).questions?.length >= 1
                              ? (item as SectionGet).questions.map(
                                  (question, index) => {
                                    const renderedQuestion = findQuestionById(
                                      questionnaire.questions,
                                      question.questionId,
                                    ) as Question;

                                    return renderQuestion(
                                      renderedQuestion,
                                      index,
                                    );
                                  },
                                )
                              : ""}
                          </div>
                        }
                        buttonText="Next"
                        buttonIcon={<LuCheck className="w-5 h-5" />}
                      />
                    ) : (
                      <QuestionUI
                        questionSectionTitle={(item as QuestionGet).question}
                        questionSectionText={(item as QuestionGet).description}
                        required={(item as QuestionGet).isRequired}
                        isParticipate={true}
                        questions={
                          <div className="flex flex-col gap-8 text-base text-primary w-full justify-start">
                            {renderQuestion(item as Question, 0)}
                          </div>
                        }
                        prevButton={prev}
                        nextButton={next}
                        buttonText="Next"
                        buttonIcon={<LuCheck className="w-5 h-5" />}
                      />
                    )}
                  </Card>
                );
              } else {
                const item = questionnaire.questions[currentStep];
                if (
                  item !== undefined &&
                  currentStep + 1 == questionnaire.questions.length
                ) {
                  const section = item as SectionGet;
                  return (
                    <Card className="flex flex-col md:w-[70%] w-full h-full justify-center items-center">
                      <Terminus
                        QRETitle=""
                        isParticipate={true}
                        terminusSectionTitle={section.name}
                        terminusText={section.description}
                        buttonClickHandler={next}
                        buttonText="Submit"
                        buttonIcon={<LuCheckCheck className="w-5 h-5" />}
                        buttonType="submit"
                        isEnding={true}
                        buttonPrevHandler={prev}
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
