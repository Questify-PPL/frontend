"use client";

import React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuScroll, LuCoins, LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createQuestionnaire } from "@/lib/action";
import { useRouter } from "next/navigation";

interface CreateModalProps {
  className?: string;
  formsRemainder?: number;
  creditsBalance?: number;
  onCancel?: () => void;
}

export function CreateModal({
  className = "",
  formsRemainder = 0,
  creditsBalance = 0,
  onCancel = () => {},
}: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState(0);
  const [prizeType, setPrizeType] = useState("EVEN");
  const [maxWinner, setMaxWinner] = useState<number | undefined>(undefined);

  const router = useRouter();

  const toForm = async () => {
    try {
      const response = await createQuestionnaire(
        title,
        prize,
        prizeType,
        maxWinner,
      );
      const formId = response.data.id;
      router.push(`/create/form/${formId}`);
    } catch (error) {
      console.error("Failed to create questionnaire", error);
    }
  };

  return (
    <form
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      action={toForm}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your Questionnaire a title"
              className="rounded-[6px] border-[1px] border-solid"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="title">Prize</Label>
            <div className="flex flex-row items-center gap-3 pr-3">
              <Input
                type="number"
                id="prize"
                value={prize}
                onChange={(e) => setPrize(Number(e.target.value))}
                placeholder="Decide your prize Credits"
                className="rounded-[6px] border-[1px] border-solid"
              />
              <LuCoins className="min-w-5 min-h-5 text-[#E2B720]"></LuCoins>
            </div>
            <RadioGroup value={prizeType} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="EVEN"
                  id="option-one"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                  onClick={() => setPrizeType("EVEN")}
                />
                <Label className="text-sm font-medium" htmlFor="option-one">
                  for each responder
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="LUCKY"
                  id="option-two"
                  className="flex h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                  onClick={() => setPrizeType("LUCKY")}
                />
                <Label
                  className="flex text-sm flex-row items-center gap-1.5"
                  htmlFor="option-two"
                >
                  for
                  <Input
                    type="number"
                    value={maxWinner || ""}
                    onChange={(e) => setMaxWinner(Number(e.target.value))}
                    disabled={prizeType !== "LUCKY"}
                  />
                  responder(s)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default CreateModal;
