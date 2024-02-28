"use client";

import Image from "next/image";
import { useState } from "react";
import React from "react";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Terminus from "@/components/respondent-q/Terminus";
import Question from "@/components/respondent-q/Question";
import SubQuestion from "@/components/respondent-q/SubQuestion";
import {
  LuCheck,
  LuChevronRight,
  LuChevronDown,
  LuChevronUp,
  LuCheckCheck,
} from "react-icons/lu";
import { FormData } from "@/lib/schema/user-info.schema";
import userInfoSchema from "@/lib/schema/user-info.schema";

const Form = () => {
  // Introduce error state variables
  const [nameError, setNameError] = useState<string | null>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  const handleSubmitButtonClick = () => {
    try {
      // Reset errors on each submit attempt
      setNameError(null);
      setBirthDateError(null);
      setPhoneNumberError(null);

      userInfoSchema.parse(formData);
      console.log("Form data is valid:", formData);
      setOpenCard((prev) => Math.min(prev + 1, 4));
    } catch (error: any) {
      console.error("Form data validation error:", error.errors);

      // Update error states based on validation errors
      error.errors.forEach((validationError: any) => {
        if (validationError.path.includes("question1.name")) {
          setNameError(validationError.message);
        } else if (validationError.path.includes("question2.birthDate")) {
          setBirthDateError(validationError.message);
        } else if (validationError.path.includes("question2.phoneNumber")) {
          setPhoneNumberError(validationError.message);
        }
      });
    }
  };

  const [formData, setFormData] = useState<FormData>({
    question1: {
      name: "",
    },
    question2: {
      gender: "Male",
      birthDate: new Date(),
      phoneNumber: "",
    },
  });

  const [openCard, setOpenCard] = useState<number>(1);

  const handleNextButtonClick = () => {
    setOpenCard((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevButtonClick = () => {
    setOpenCard((prev) => Math.max(prev - 1, 1));
  };

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
        buttonClickHandler={handleNextButtonClick}
        buttonText="Next"
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
              {nameError && (
                <div className="text-red-500 text-sm">{nameError}</div>
              )}
            </div>
          </div>
        }
        prevButton={handlePrevButtonClick}
        nextButton={handleNextButtonClick}
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
            <SubQuestion
              numbering="1"
              required={true}
              subQuestion="Whats your gender?"
              answer={
                <RadioGroup className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="Male"
                      id="option-one"
                      className="border-[1px] border-solid border-[#CDDDE1]"
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
                      className="border-[1px] border-solid border-[#CDDDE1]"
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
              }
            ></SubQuestion>
            <SubQuestion
              numbering="2"
              subQuestion="When were you born?"
              answer={
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
              }
            ></SubQuestion>
            <SubQuestion
              numbering="3"
              subQuestion="Phone Number"
              answer={
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
              }
            ></SubQuestion>
          </div>
        }
        prevButton={handlePrevButtonClick}
        nextButton={handleNextButtonClick}
        buttonText="Next"
        buttonIcon={<LuCheck className="w-5 h-5" />}
      ></Question>

      <Card
        className={`flex flex-col w-[50%] h-[90%] ${
          openCard === 4 ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col bg-secondary h-[15%] justify-center font-semibold text-xl p-6 gap-1 rounded-t-md">
          <div>User Additional Information</div>
          <Image
            src="/assets/Questify.svg"
            alt="Questify"
            width={70}
            height={16}
          />
        </div>
        <div className="flex flex-col h-full justify-center items-center font-medium text-xl px-24 py-14 gap-8 rounded-t-md">
          <div className="text-base text-primary">Ending</div>
          <div className="text-xl">
            All set! Let&apos;s jump into the workspace.
          </div>
          <div className="w-[45%] flex flex-col gap-1">
            <ClickEnter />
            <Button type="submit" className="gap-2">
              Finish
              <LuCheckCheck className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

Form.displayName = "Form";

export default Form;
