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

import {
  question1Schema,
  question2Schema,
} from "@/lib/schema/user-info.schema";

const Form = () => {
  const [openCard, setOpenCard] = useState<number>(1);
  const [formData, setFormData] = useState({
    question1: { name: "" },
    question2: { gender: "", birthDate: new Date(), phoneNumber: "" },
  });
  const [errors, setErrors] = useState({
    nameError: "",
    birthDateError: "",
    genderError: "",
    phoneNumberError: "",
  });

  const handleNextButtonClick = () => {
    setOpenCard((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevButtonClick = () => {
    setOpenCard((prev) => Math.max(prev - 1, 1));
  };

  const handleQuestion1Validation = () => {
    const result = question1Schema.safeParse(formData.question1);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        nameError: result.error.errors?.[0]?.message,
      }));
      return false;
    } else {
      setErrors((prev) => ({
        ...prev,
        nameError: "",
      }));
      handleNextButtonClick();
      return true;
    }
  };

  const handleQuestion2Validation = () => {
    const result = question2Schema.safeParse(formData.question2);
    console.log(result);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        genderError: result.error.errors?.[0]?.message,
        birthDateError: result.error.errors?.[1]?.message,
        phoneNumberError: result.error.errors?.[2]?.message,
      }));
      return false;
    } else {
      setErrors((prev) => ({
        ...prev,
        genderError: "",
        birthDateError: "",
        phoneNumberError: "",
      }));
      handleNextButtonClick();
      return true;
    }
  };

  console.log(errors)

  return (
    <div className="flex flex-row w-full h-full justify-center items-center">
      <Terminus
        className={`${openCard === 1 ? "" : "hidden"}`}
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
        buttonClickHandler={handleNextButtonClick}
        buttonText="Start"
        buttonIcon={<LuChevronRight className="w-5 h-5" />}
      ></Terminus>
      <Question
        className={`${openCard === 2 ? "" : "hidden"}`}
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
                value={formData.question1.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    question1: { name: e.target.value },
                  }))
                }
                className="text-2xl placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
              />
              <span className="w-full h-0.5 bg-primary/40"></span>
              {errors.nameError && (
                <div className="text-red-500 font-normal text-xs mt-0.5">
                  {errors.nameError}
                </div>
              )}
            </div>
          </div>
        }
        prevButton={handlePrevButtonClick}
        nextButton={handleQuestion1Validation}
        buttonText="Next"
        buttonIcon={<LuCheck className="w-5 h-5" />}
      ></Question>
      <Question
        className={`${openCard === 3 ? "" : "hidden"}`}
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
              numbering="1"
              required={true}
              question="Whats your gender?"
              answer={
                <div>
                  <RadioGroup className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="Male"
                        id="option-one"
                        className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            question2: { ...prev.question2, gender: "Male" },
                          }));
                        }}
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
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            question2: { ...prev.question2, gender: "Female" },
                          }));
                        }}
                      />
                      <Label className="text-base" htmlFor="option-two">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.genderError && (
                    <div className="text-red-500 font-normal text-xs mt-0.5">
                      {errors.genderError}
                    </div>
                  )}
                </div>
              }
            ></QuestionLayout>
            <QuestionLayout
              numbering="2"
              question="When were you born?"
              answer={
                <div>
                  <Input
                    type="date"
                    placeholder="Your answer here"
                    value={
                      formData.question2.birthDate.toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        question2: {
                          ...prev.question2,
                          birthDate: new Date(e.target.value),
                        },
                      }))
                    }
                    className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                  />
                  {errors.birthDateError && (
                    <div className="text-red-500 font-normal text-xs mt-0.5">
                      {errors.birthDateError}
                    </div>
                  )}
                </div>
              }
            ></QuestionLayout>
            <QuestionLayout
              numbering="3"
              question="Phone Number"
              answer={
                <div>
                  <Input
                    type="text"
                    placeholder="Your answer here"
                    value={formData.question2.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        question2: {
                          ...prev.question2,
                          phoneNumber: e.target.value,
                        },
                      }))
                    }
                    className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background h-fit"
                  />
                  {errors.phoneNumberError && (
                    <div className="text-red-500 font-normal text-xs mt-0.5">
                      {errors.phoneNumberError}
                    </div>
                  )}
                </div>
              }
            ></QuestionLayout>
          </div>
        }
        prevButton={handlePrevButtonClick}
        nextButton={handleQuestion2Validation}
        buttonText="Next"
        buttonIcon={<LuCheck className="w-5 h-5" />}
      ></Question>
      <Terminus
        className={`${openCard === 4 ? "" : "hidden"}`}
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
        buttonClickHandler={handleNextButtonClick}
        buttonText="Finish"
        buttonIcon={<LuCheckCheck className="w-5 h-5" />}
        buttonType="submit"
      ></Terminus>
    </div>
  );
};

Form.displayName = "Form";

export default Form;
