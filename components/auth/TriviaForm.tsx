"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TriviaSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";

export function TriviaForm() {
  const { handleSubmit, setValue } = useForm<TriviaSchema>({
    resolver: zodResolver(TriviaSchema),
    defaultValues: {
      answer: undefined,
    },
  });

  const { toast } = useToast();

  function onSubmit(data: TriviaSchema) {
    const { answer } = data;

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col items-center justify-center md:flex hidden md:w-[270px] md:p-[24px] lg:w-[380px] lg:p-[40px] gap-[32px] rounded-[6px] h-fit bg-white"
      aria-label="trivia form"
    >
      <div className="flex items-center gap-[6px] self-stretch">
        <span className="w-[4px] self-strech h-full rounded-[2px] bg-destructive"></span>
        <p className="text-primary text-xs font-medium capitalize">Trivia</p>
      </div>
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-semibold text-black mb-4">
            What sport was featured on the first curved U.S. coin in 2014?
          </legend>
          <div className="flex items-center self-stretch gap-2">
            <Input
              type="radio"
              name="answer"
              value="Basketball"
              id="option-one"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1] accent-[#47737a]"
              onClick={() => {
                setValue("answer", "Basketball");
              }}
              tabIndex={-1}
            />
            <Label htmlFor="option-one">Basketball</Label>
          </div>
          <div className="flex items-center self-stretch gap-2">
            <Input
              type="radio"
              name="answer"
              value="Baseball"
              id="option-two"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1] accent-[#47737a]"
              onClick={() => {
                setValue("answer", "Baseball");
              }}
              tabIndex={-1}
            />
            <Label htmlFor="option-two">Baseball</Label>
          </div>
          <div className="flex items-center self-stretch gap-2">
            <Input
              type="radio"
              name="answer"
              value="Football"
              id="option-three"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1] accent-[#47737a]"
              onClick={() => {
                setValue("answer", "Football");
              }}
              tabIndex={-1}
            />

            <Label htmlFor="option-three">Football</Label>
          </div>

          <div className="flex items-center self-stretch gap-2">
            <Input
              type="radio"
              name="answer"
              value="Hockey"
              id="option-four"
              className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1] accent-[#47737a]"
              onClick={() => {
                setValue("answer", "Hockey");
              }}
              tabIndex={-1}
            />
            <Label htmlFor="option-four">Hockey</Label>
          </div>
        </fieldset>
      </div>
      <Button type="submit" className="w-full bg-[#606F75]" tabIndex={-1}>
        Submit
      </Button>
    </form>
  );
}
