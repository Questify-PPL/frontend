"use client";

import React from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuCoins } from "react-icons/lu";

export default function Create() {
  const newQREModal = () => {
    console.log("Create new QRE");
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></CreatorNav>
        <div className="flex flex-col w-full">
          <Button className="w-fit" onClick={newQREModal}>
            Create New Questionnaire
          </Button>
        </div>
      </div>
      <div className="absolute flex w-full h-full justify-center items-center bg-[#324B4F]/70">
        <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">
              Create New Questionnaire
            </span>
            <span className="flex font-regular text-xs text-[#64748B]">
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
            <div className="flex flex-row items-center gap-2 pr-3">
              <Input
                type="text"
                id="title"
                placeholder="Credits you'd like to appreaciate the participants with"
                className={`rounded-[6px] border-[1px] border-solid`}
              />

              <LuCoins className="min-w-5 min-h-5 text-[#E2B720]"></LuCoins>
            </div>
            <RadioGroup className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Male"
                  id="option-one"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label className="text-sm font-medium" htmlFor="option-one">
                  for each responder
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Female"
                  id="option-two"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label className="text-sm" htmlFor="option-two">
                  for the first responder
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Button variant="outline">Cancel</Button>
            <Button>Create</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
