"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuScroll, LuCoins, LuX } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { createQuestionnaire, patchQuestionnaire } from "@/lib/action";
import { CreateQuestionnaire } from "@/lib/schema/create-questionnaire.schema";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionTypeNames, QuestionGroup as qg } from "@/lib/services/form";
import { QuestionnaireItem } from "@/lib/context";
import { useToast } from "@/components/ui/use-toast";
import { decreaseCreditAndBalance } from "@/lib/action/form";
import { ReloadIcon } from "@/components/common";

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
}: Readonly<CreateModalProps>) {
  const [title, setTitle] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuestionnaire>({
    resolver: zodResolver(CreateQuestionnaire),
    defaultValues: {
      title: "",
      prize: 0,
      prizeType: "EVEN",
      maxWinner: 0,
    },
  });

  const toForm: SubmitHandler<CreateQuestionnaire> = async (data) => {
    setIsCreating(true);
    try {
      const response = await createQuestionnaire(
        data.title,
        data.prize,
        data.prizeType,
        data.maxWinner ?? undefined,
      );
      await decreaseCreditAndBalance(data.prize);
      const formId = response.data.id;
      const initSection = [
        {
          type: "SECTION",
          sectionId: null,
          number: -1,
          sectionName: qg.OPENING,
          sectionDescription: "",
          questions: [],
        },
        {
          type: "SECTION",
          sectionId: null,
          number: 0,
          sectionName: qg.ENDING,
          sectionDescription: "",
          questions: [],
        },
        {
          type: "DEFAULT",
          question: {
            number: 1,
            questionId: null,
            questionType: "TEXT",
            questionTypeName: QuestionTypeNames.SHORT_TEXT,
            question: "Let's start with a simple question",
          },
        },
      ] as QuestionnaireItem[];
      await patchQuestionnaire(formId, initSection);
      router.push(`/create/form/${formId}`);
    } catch (error: any) {
      toast({
        title: "Failed to create new Questionnaire",
        description: (error as Error).message,
      });
    }

    setIsCreating(false);
  };

  return (
    <form
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      onSubmit={handleSubmit(toForm)}
    >
      <Card className="flex flex-col w-[90%] md:w-[35%] p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-between w-full">
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
          <div className="flex flex-col justify-center text-center items-center">
            <span className="flex font-extrabold text-xl">
              Create a New Questionnaire
            </span>
            <span className="hidden md:flex font-regular text-sm text-primary/40">
              Give the Questionnaire what it needs first :)
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              {...register("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your Questionnaire a title"
              className="rounded-[6px] border-[1px] border-solid"
            />
            {errors.title && (
              <div className="text-red-500 font-normal text-xs mt-0.5">
                {errors.title.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="prize">Prize</Label>
            <div className="flex flex-row items-center gap-3 pr-3">
              <Input
                type="number"
                id="prize"
                {...register("prize", { valueAsNumber: true })}
                placeholder="Decide your prize Credits"
                className="rounded-[6px] border-[1px] border-solid"
              />
              <LuCoins className="min-w-5 min-h-5 text-[#E2B720]"></LuCoins>
            </div>
            {errors.prize && (
              <div className="text-red-500 font-normal text-xs mt-0.5">
                {errors.prize.message}
              </div>
            )}
            <RadioGroup className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="EVEN"
                  id="option-one"
                  {...register("prizeType")}
                  className="h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label className="text-sm font-medium" htmlFor="option-one">
                  for each responder
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="LUCKY"
                  id="option-two"
                  {...register("prizeType")}
                  className="h-4 w-4 border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label
                  className="flex text-sm flex-row items-center gap-1.5"
                  htmlFor="option-two"
                >
                  for
                  <Input
                    type="number"
                    {...register("maxWinner", { valueAsNumber: true })}
                    disabled={watch("prizeType") !== "LUCKY"}
                    className="mx-2"
                  />
                  responder(s)
                </Label>
              </div>
            </RadioGroup>
            {errors.prizeType && (
              <div className="text-red-500 font-normal text-xs mt-0.5">
                {errors.prizeType.message}
              </div>
            )}
            {errors.maxWinner && (
              <div className="text-red-500 font-normal text-xs mt-0.5">
                {errors.maxWinner.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin fill-white" />
            )}
            {!isCreating && "Create"}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default CreateModal;
