"use client";

import Image from "next/image";
import React from "react";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuChevronRight } from "react-icons/lu";

interface OpeningProps {
  onClick: () => void;
}

const Opening: React.FC<OpeningProps> = ({ onClick }) => {
  return (
    <div>
      <Card className="flex flex-col w-[50%] h-[90%]">
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
            <Button className="gap-2" onClick={onClick}>
              Start
              <LuChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      <Card className="flex flex-col w-[50%] h-[90%]">
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
              className="text-2xl placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:ring-background"
            />
            <span className="w-full h-0.5 bg-primary/40"></span>
          </div>
        </div>
        <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
          <div className="flex gap-1">
            <Button variant="outline">
              <LuChevronUp className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <LuChevronDown className="w-5 h-5" />
            </Button>
          </div>
          <div className="w-[45%] flex flex-col gap-1">
            <ClickEnter></ClickEnter>
            <Button className="gap-2">
              Next
              <LuCheck className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Opening;
