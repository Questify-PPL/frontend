"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuScroll, LuCoins, LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

interface HomeNavProps {
  className?: string;
  formsRemainder?: number;
  creditsBalance?: number;
  onCancel?: () => void;
}

const HomeNav: React.FC<HomeNavProps> = ({
  className = "",
  formsRemainder = 0,
  creditsBalance = 0,
  onCancel = () => {},
}) => {
  const router = useRouter();

  const toForm = () => {
    router.push("/create/form");
  };

  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
    >
      <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-1">
              <span className="flex w-5 h-5 justify-center bg-[#F9EBF6] items-center rounded-full">
                <LuScroll className="flex w-3 h-3 text-[#C036A9]"></LuScroll>
              </span>
              <span className="font-bold text-sm">{formsRemainder}</span>
            </div>
            <div className="flex flex-row gap-1">
              <span className="flex w-5 h-5 justify-center bg-[#FCF8E9] items-center rounded-full">
                <LuCoins className="flex w-3 h-3 text-[#E2B720]"></LuCoins>
              </span>
              <span className="font-bold text-sm">{creditsBalance}</span>
            </div>
          </div>
          <LuX className="w-5 h-5" onClick={onCancel}></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">
              Create a New Questionnaire
            </span>
            <span className="flex font-regular text-sm text-primary/40">
              Give the Questionnaire what it needs first :)
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Give your Questionnaire a title"
              className={`rounded-[6px] border-[1px] border-solid`}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="title">Prize</Label>
            <div className="flex flex-row items-center gap-3 pr-3">
              <Input
                type="text"
                id="prize"
                placeholder="Decide your prize Credits"
                className={`rounded-[6px] border-[1px] border-solid`}
              />

              <LuCoins className="min-w-5 min-h-5 text-[#E2B720]"></LuCoins>
            </div>
            <RadioGroup className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="each"
                  id="option-one"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label className="text-sm font-medium" htmlFor="option-one">
                  for each responder
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="certain"
                  id="option-two"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label className="text-sm" htmlFor="option-two">
                  for X responder
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="w-full" onClick={toForm}>
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomeNav;
