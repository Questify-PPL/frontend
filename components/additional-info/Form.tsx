"use client";

import Image from "next/image";
import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Terminus from "@/components/respondent-side/Terminus";
import Question from "@/components/respondent-side/Question";
import QuestionLayout from "@/components/respondent-side/QuestionLayout";
import { LuCheck, LuChevronRight, LuCheckCheck } from "react-icons/lu";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdditionalInfo, FieldName } from "@/lib/schema/additional-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = [
  {
    fields: [],
  },
  {
    fields: ["name"],
  },
  {
    fields: ["gender", "birthdate", "phoneNumber"],
  },
  {
    fields: [],
  },
];

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<AdditionalInfo>({
    resolver: zodResolver(AdditionalInfo),
    defaultValues: {
      name: "",
      birthDate: undefined,
      gender: undefined,
      phoneNumber: "",
    },
  });

  console.log(watch());
  const processForm: SubmitHandler<AdditionalInfo> = (data) => {
    console.log(data);
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
    <form
      className="flex flex-row w-full h-full justify-center items-center"
      onSubmit={handleSubmit(processForm)}
    >
      {currentStep == 0 && (
        <Terminus
          terminusQRETitle="User Additional Information"
          terminusImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
            />
          }
          terminusSectionTitle="Opening"
          terminusText="Greetings! Welcome to Questify. Let's get you set up swiftly; it'll only take a few seconds to ensure you're ready to go."
          buttonType="button"
          buttonClickHandler={next}
          buttonText="Start"
          buttonIcon={<LuChevronRight className="w-5 h-5" />}
        />
      )}

      {currentStep === 1 && (
        <Question
          questionQRETitle="User Additional Information"
          questionImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
            />
          }
          questionSectionTitle="Question 1"
          required={true}
          questions={
            <div className="flex flex-col gap-8 text-base text-primary w-full justify-start ">
              <div className="flex flex-col gap-1 w-full justify-start">
                <div className="font-semibold text-lg text-black">
                  What&apos;s your name?
                </div>
                <div className="font-normal text-xs text-primary/70">
                  Fill with your full name.
                </div>
              </div>
              <div className="flex flex-col gap-0.5 w-full h-fit">
                <Input
                  type="text"
                  placeholder="Your answer here"
                  {...register("name")}
                  className="text-2xl placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                />
                <span className="w-full h-0.5 bg-primary/40"></span>
                {errors.name && (
                  <div className="text-red-500 font-normal text-xs mt-0.5">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>
          }
          prevButton={prev}
          nextButton={next}
          buttonText="Next"
          buttonIcon={<LuCheck className="w-5 h-5" />}
        />
      )}

      {currentStep == 2 && (
        <Question
          questionQRETitle="User Additional Information"
          questionImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
            />
          }
          questionSectionTitle="Question 2"
          questionSectionText="This section is made to add a personal touch to your account."
          questions={
            <div className="flex flex-col gap-4 w-full">
              <QuestionLayout
                numbering={1}
                required={true}
                question="What's your gender?"
                answer={
                  <div>
                    <RadioGroup
                      className="flex flex-col gap-2"
                      {...register("gender")}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Male"
                          id="option-one"
                          className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                        />
                        <Label
                          className="text-base font-medium"
                          htmlFor="option-one"
                        >
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="Female"
                          id="option-two"
                          className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                        />
                        <Label className="text-base" htmlFor="option-two">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.gender.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
              <QuestionLayout
                numbering={2}
                question="When were you born?"
                answer={
                  <div>
                    <Input
                      type="date"
                      placeholder="DD/MM/YYYY"
                      {...register("birthDate")}
                      className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                    />
                    {errors.birthDate && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.birthDate.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
              <QuestionLayout
                numbering={3}
                question="Phone Number"
                answer={
                  <div>
                    <Input
                      type="text"
                      placeholder="Your answer here"
                      {...register("phoneNumber")}
                      className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background h-fit"
                    />
                    {errors.phoneNumber && (
                      <div className="text-red-500 font-normal text-xs mt-0.5">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                }
              ></QuestionLayout>
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
          terminusQRETitle="User Additional Information"
          terminusImage={
            <Image
              src="/assets/Questify.svg"
              alt="Questify"
              width={70}
              height={16}
            />
          }
          terminusSectionTitle="Ending"
          terminusText="All set! Let's jump into the workspace."
          buttonClickHandler={next}
          buttonText="Finish"
          buttonIcon={<LuCheckCheck className="w-5 h-5" />}
          buttonType="submit"
        />
      )}
    </form>
  );
};

Form.displayName = "Form";

export default Form;
