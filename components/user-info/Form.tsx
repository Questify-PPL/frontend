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
  const [formData, setFormData] = useState<FormData>({
    question1: {
      name: "",
    },
    question2: {
      gender: "Male",
      birthDate: new Date(),
    },
  });

  const [openCard, setOpenCard] = useState<number>(1);

  const handleSubmitButtonClick = () => {
    try {
      userInfoSchema.parse(formData);
      console.log("Form data is valid:", formData);
      setOpenCard((prev) => Math.min(prev + 1, 4));
    } catch (error: any) {
      console.error("Form data validation error:", error.errors);
    }
  };

  const handleNextButtonClick = () => {
    setOpenCard((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevButtonClick = () => {
    setOpenCard((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-row w-full h-full justify-center items-center">
      <Card
        className={`flex flex-col w-[50%] h-[90%] ${
          openCard === 1 ? "" : "hidden"
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
          <div className="text-base text-primary">Opening</div>
          <div className="text-xl">
            Greetings! Welcome to Questify. Let&apos;s get you set up swiftly;
            it&apos;ll only take a few seconds to ensure you&apos;re ready to
            go.
          </div>
          <div className="w-[45%] flex flex-col gap-1">
            <ClickEnter />
            <Button className="gap-2" onClick={handleNextButtonClick}>
              Start
              <LuChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      <Card
        className={`flex flex-col w-[50%] h-[90%] ${
          openCard === 2 ? "" : "hidden"
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
          <div className="flex gap-2 text-base text-primary w-full justify-start">
            <span className="w-1.5 h-full bg-[#FE476C] rounded-md"></span>
            <div>Question 1</div>
          </div>
          <div className="flex flex-col gap-1 w-full justify-start">
            <div className="font-semibold text-lg">What&apos;s your name?</div>
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
          </div>
        </div>
        <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
          <div className="flex gap-1">
            <Button variant="outline" onClick={handlePrevButtonClick}>
              <LuChevronUp className="w-5 h-5" />
            </Button>
            <Button variant="outline" onClick={handleNextButtonClick}>
              <LuChevronDown className="w-5 h-5" />
            </Button>
          </div>
          <div className="w-[45%] flex flex-col gap-1">
            <ClickEnter></ClickEnter>
            <Button className="gap-2" onClick={handleNextButtonClick}>
              Next
              <LuCheck className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      <Card
        className={`flex flex-col w-[50%] h-[90%] ${
          openCard === 3 ? "" : "hidden"
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
          <div className="flex-col gap-2 text-base text-primary w-full justify-start">
            <div>Question 2</div>
            <div className="text-xl text-black">
              This section is made to add a personal touch to your account.
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <div className="flex flex-row gap-1 w-6.5 h-fit pt-1">
              <span className="w-1.5 h-5 bg-[#FE476C] rounded-md"></span>
              <div className="flex w-5 h-5 bg-secondary rounded-md text-primary justify-center items-center text-[10px]">
                1
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full justify-start">
              <div className="font-semibold text-lg">Whats your gender?</div>
              <div className="flex flex-col gap-0 w-full h-fit">
                <RadioGroup
                  value={formData.question2.gender}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center self-stretch gap-2">
                    <RadioGroupItem
                      value="Male"
                      id="option-one"
                      className="border-[1px] border-solid border-[#CDDDE1]"
                    />
                    <Label
                      className="text-base font-medium"
                      htmlFor="option-one"
                    >
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center self-stretch gap-2">
                    <RadioGroupItem
                      value="Female"
                      id="option-two"
                      className="border-[1px] border-solid border-[#CDDDE1]"
                    />
                    <Label className="text-base" htmlFor="option-two">
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <div className="flex flex-row gap-1 w-6.5 h-fit pt-1">
              <span className="w-1.5 h-5 bg-transparent rounded-md"></span>
              <div className="flex w-5 h-5 bg-secondary rounded-md text-primary justify-center items-center text-[10px]">
                2
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full justify-start">
              <div className="font-semibold text-lg">When were you born?</div>
              <div className="flex flex-col gap-0 w-full h-fit">
                <Input
                  type="date"
                  placeholder="Your answer here"
                  className="text-base placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
          <div className="flex gap-1">
            <Button variant="outline" onClick={handlePrevButtonClick}>
              <LuChevronUp className="w-5 h-5" />
            </Button>
            <Button variant="outline" onClick={handleNextButtonClick}>
              <LuChevronDown className="w-5 h-5" />
            </Button>
          </div>
          <div className="w-[45%] flex flex-col gap-1">
            <ClickEnter></ClickEnter>
            <Button className="gap-2" onClick={handleSubmitButtonClick}>
              Submit
              <LuCheck className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
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
            <Button className="gap-2" onClick={handleNextButtonClick}>
              Finish
              <LuCheckCheck className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Form;
