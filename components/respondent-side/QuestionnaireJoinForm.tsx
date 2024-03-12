"use client";

import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Terminus from "@/components/respondent-side/Terminus";
import Question from "@/components/respondent-side/Question";
import QuestionLayout from "@/components/respondent-side/QuestionLayout";
import { LuCheck, LuChevronRight, LuCheckCheck } from "react-icons/lu";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  QuestionnaireJoin,
  FieldName,
} from "@/lib/schema/questionnaire-join.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FinalizationCard from "./FinalizationCard";

const steps = [
  {
    fields: [],
  },
  {
    fields: ["section1No1", "section1No2"],
  },
  {
    fields: ["oreoEditions"],
  },
  {
    fields: [],
  },
];

const QuestionaireJoinForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [createCardState, setCreateCardState] = useState("hidden");

  const OpenCreateCard = () => {
    const newClass = createCardState === "hidden" ? "flex" : "hidden";
    setCreateCardState(newClass);
  };

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm<QuestionnaireJoin>({
    resolver: zodResolver(QuestionnaireJoin),
    defaultValues: {
      section1No1: undefined,
      section1No2: "",
      oreoEditions: [],
    },
  });

  // const handleSave = () => {};

  const handleCheckboxChange = (edition: string) => {
    const currentSelection = getValues("oreoEditions");
    if (currentSelection.includes(edition)) {
      setValue(
        "oreoEditions",
        currentSelection.filter((item) => item !== edition)
      );
    } else {
      setValue("oreoEditions", [...currentSelection, edition]);
    }
  };

  console.log(watch());
  const processForm: SubmitHandler<QuestionnaireJoin> = (data) => {
    console.log(data);
    OpenCreateCard();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // await handleSubmit(processForm)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <form
        className="flex flex-row w-full h-full justify-center items-center"
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 0 && (
          <Terminus
            terminusQRETitle="Oreo Satisfaction: User Feedback in Indonesia"
            terminusSectionTitle="Opening"
            terminusText="Hello! I'm Ruben. I'm a Scientist at Oreo. Through this questionnaire I'd like to know consumer's preferences for Oreo flavors and packaging."
            buttonClickHandler={next}
            buttonText="Start"
            buttonIcon={<LuChevronRight className="w-5 h-5" />}
            buttonType="submit"
          />
        )}

        {currentStep === 1 && (
          <Question
            questionQRETitle="Oreo Satisfaction: User Feedback in Indonesia"
            questionSectionTitle="Question 1"
            questionSectionText="Have you ever bought Oreo Special Edition?"
            required={true}
            questions={
              <div className="flex flex-col gap-8 text-base text-primary w-full justify-start ">
                <div className="flex flex-col gap-4 w-full">
                  <QuestionLayout
                    numbering={1}
                    required={true}
                    question="Have you ever bought Oreo Special Edition?"
                    answer={
                      <div>
                        <RadioGroup
                          className="flex flex-col gap-2"
                          {...register("section1No1")}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="Yes"
                              id="option-one"
                              className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                            />
                            <Label
                              className="text-base font-medium"
                              htmlFor="option-one"
                            >
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="No"
                              id="option-two"
                              className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                            />
                            <Label
                              className="text-base font-medium"
                              htmlFor="option-two"
                            >
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.section1No1 && (
                          <div className="text-red-500 font-normal text-xs mt-0.5">
                            {errors.section1No1.message}
                          </div>
                        )}
                      </div>
                    }
                  ></QuestionLayout>
                  <div className="flex flex-row gap-3 w-full">
                    <div className="flex flex-row gap-1 w-6.5 h-fit pt-1">
                      <span className="w-1.5 h-6 bg-transparent rounded-md"></span>

                      <div className="flex w-6 h-6 bg-secondary rounded-md text-primary justify-center items-center text-[10px] leading-[12px]">
                        2
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 w-full justify-start">
                      <div className="flex flex-col gap-1 w-full justify-start">
                        <div className="font-semibold text-lg text-black">
                          Have you ever bought Oreo Special Edition?
                        </div>
                        <div className="font-normal text-xs text-primary/70">
                          Have you ever bought Oreo Special Edition?
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col gap-0 w-full h-fit">
                          <Input
                            type="text"
                            placeholder="Your answer here"
                            {...register("section1No2")}
                            className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background h-fit"
                          />
                          {errors.section1No2 && (
                            <div className="text-red-500 font-normal text-xs mt-0.5">
                              {errors.section1No2.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            prevButton={prev}
            nextButton={next}
            buttonText="Next"
            buttonIcon={<LuCheck className="w-5 h-5" />}
          />
        )}

        {currentStep === 2 && (
          <Question
            questionQRETitle="Oreo Satisfaction: User Feedback in Indonesia"
            questionSectionTitle="Question 2"
            questionSectionText="From the list below, which Oreo Special Edition have you ever seen in supermarkets?"
            required={true}
            questions={
              <div className="flex flex-col gap-8 text-base text-primary w-full justify-start ">
                <div className="flex flex-col gap-4 w-full">
                  <QuestionLayout
                    answer={
                      <Controller
                        name="oreoEditions"
                        control={control}
                        render={({ field }) => (
                          <>
                            {[
                              "Oreo Chinese New Year Edition",
                              "Oreo Eid Edition",
                              "Oreo President Election Edition",
                              "Oreo Valentine's Day Edition",
                            ].map((edition) => (
                              <label key={edition} className="block">
                                <input
                                  type="checkbox"
                                  value={edition}
                                  checked={field.value.includes(edition)}
                                  onChange={() => handleCheckboxChange(edition)}
                                  className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-2">{edition}</span>
                              </label>
                            ))}
                          </>
                        )}
                      />
                    }
                  ></QuestionLayout>
                </div>
              </div>
            }
            prevButton={prev}
            nextButton={next}
            buttonText="Next"
            buttonIcon={<LuCheck className="w-5 h-5" />}
          />
        )}

        {currentStep === 3 && (
          <Terminus
            terminusQRETitle="Oreo Satisfaction: User Feedback in Indonesia"
            terminusSectionTitle="Ending"
            terminusText="Thank you for participating! Your insights are valuable. I hope you don't mind joining future questionnaires."
            buttonClickHandler={next}
            buttonText="Submit"
            buttonIcon={<LuCheckCheck className="w-5 h-5" />}
            buttonType="submit"
          />
        )}
      </form>

      <FinalizationCard
        className={`${createCardState}`}
        onCancel={OpenCreateCard}
      ></FinalizationCard>
    </main>
  );
};

QuestionaireJoinForm.displayName = "QuestionaireJoinForm";

export default QuestionaireJoinForm;
