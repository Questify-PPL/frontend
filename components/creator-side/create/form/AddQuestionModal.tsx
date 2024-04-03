"use client";

import QuestionType from "../../QuestionType";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuX } from "react-icons/lu";

interface AddQuestionModalProps {
  className?: string;
  onCancel: () => void;
  onShortTextClick?: () => void;
}

export function AddQuestionModal({
  className = "",
  onCancel,
  onShortTextClick = () => {},
}: Readonly<AddQuestionModalProps>) {
  const QuestionTypeList = ({ types }: { types: string[] }) => (
    <>
      {types.map((type) => (
        <div
          key={type}
          className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer"
          onClick={type === "Short Text" ? onShortTextClick : undefined}
        >
          <QuestionType type={type} noText={true} />
          <span className="flex-grow-0 w-full truncate text-xs">{type}</span>
        </div>
      ))}
    </>
  );

  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      data-testid="add-question"
    >
      <Card className="flex flex-col w-[60%] p-5 justify-center items-center gap-6 pb-12">
        <div className="flex flex-row justify-end items-center w-full ">
          <LuX
            className="w-5 h-5"
            onClick={onCancel}
            data-testid="cancel-add-question"
          ></LuX>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="flex font-extrabold text-xl">
            Choose a Question Type
          </span>
          <span className="flex font-regular text-sm text-primary/40">
            Choose the best question type for your questionnaire
          </span>
        </div>
        <div className="flex flex-row w-full h-full justify-between gap-3 px-10">
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">Text</span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList types={["Short Text", "Long Text"]} />
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Numeric
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList types={["Number", "Date", "Time"]} />
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Choices
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={[
                "Multiple Choice",
                "Checkboxes",
                "Picture Choice",
                "Yes/No",
                "Dropdown",
              ]}
            />
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Scaler
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={["Matrix", "Net Promoter Score", "Rating"]}
            />
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Others
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList types={["File Upload", "Link"]} />
          </div>
        </div>
      </Card>
    </div>
  );
}
