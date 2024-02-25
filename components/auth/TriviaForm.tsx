"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TriviaSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

export function TriviaForm() {
  const { handleSubmit, watch, setValue } = useForm<TriviaSchema>({
    resolver: zodResolver(TriviaSchema),
    defaultValues: {
      answer: undefined,
    },
  });

  const { toast } = useToast();

  function onSubmit(data: TriviaSchema) {
    const { answer } = data;
    console.log(answer);

    if (answer == "Baseball") {
      toast({
        title: "Correct!",
        description:
          "Baseball was featured on the first curved U.S. coin in 2014",
      });
    } else {
      toast({
        title: "Incorrect!",
        description:
          "The correct answer is Baseball, it was featured on the first curved U.S. coin in 2014",
      });
    }
  }

  console.log(watch("answer"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col items-center justify-center md:flex hidden md:w-[270px] md:p-[24px] lg:w-[380px] lg:p-[40px] gap-[32px] rounded-[6px] h-fit bg-white"
    >
      <div className="flex items-center gap-[6px] self-stretch">
        <span className="w-[4px] self-strech h-full rounded-[2px] bg-destructive"></span>
        <p className="text-primary text-xs font-medium capitalize">Trivia</p>
      </div>
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <Label className="text-sm font-semibold text-black">
          What sport was featured on the first curved U.S. coin in 2014?
        </Label>
        <RadioGroup className="flex flex-col gap-2">
          <div className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="Basketball"
              id="option-one"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
              onClick={() => {
                setValue("answer", "Basketball");
              }}
            />
            <Label htmlFor="option-one">Basketball</Label>
          </div>
          <div className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="Baseball"
              id="option-two"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
              onClick={() => {
                setValue("answer", "Baseball");
              }}
            />
            <Label htmlFor="option-two">Baseball</Label>
          </div>
          <div className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="Football"
              id="option-three"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
              onClick={() => {
                setValue("answer", "Football");
              }}
            />

            <Label htmlFor="option-three">Football</Label>
          </div>

          <div className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="Hockey"
              id="option-four"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
              onClick={() => {
                setValue("answer", "Hockey");
              }}
            />
            <Label htmlFor="option-four">Hockey</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full bg-[#606F75]">
        Submit
      </Button>
    </form>
  );
}
