"use client";

import QuestionType from "../../QuestionType";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuX } from "react-icons/lu";
import { QuestionTypeNames as qtn } from "@/lib/services/form";

interface AddQuestionModalProps {
  className?: string;
  onCancel: () => void;
  onShortTextClick?: () => void;
  onLongTextClick?: () => void;
  onCheckboxClick?: () => void;
  onMultipleChoiceClick?: () => void;
  onYesNoClick?: () => void;
}

export function AddQuestionModal({
  className = "",
  onCancel,
  onShortTextClick = () => {},
  onLongTextClick = () => {},
  onCheckboxClick = () => {},
  onMultipleChoiceClick = () => {},
  onYesNoClick = () => {},
}: Readonly<AddQuestionModalProps>) {
  const QuestionTypeList = ({ types }: { types: string[] }) => {
    const clickHandlers: { [key: string]: () => void } = {
      [qtn.SHORT_TEXT]: onShortTextClick,
      [qtn.LONG_TEXT]: onLongTextClick,
      [qtn.CHECKBOX]: onCheckboxClick,
      [qtn.MULTIPLE_CHOICE]: onMultipleChoiceClick,
      [qtn.YES_NO]: onYesNoClick,
    };

    const handleClick = (type: string) => {
      const handler = clickHandlers[type] || (() => {});
      handler();
    };

    return (
      <>
        {types.map((type) => (
          <div
            key={type}
            className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer"
            onClick={() => handleClick(type)}
          >
            <QuestionType type={type} noText={true} />
            <span className="flex-grow-0 w-full truncate text-xs">{type}</span>
          </div>
        ))}
      </>
    );
  };

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
            <QuestionTypeList types={[qtn.NUMBER, qtn.DATE, qtn.TIME]} />
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Choices
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={[
                qtn.MULTIPLE_CHOICE,
                qtn.CHECKBOX,
                qtn.PICTURE_CHOICE,
                qtn.YES_NO,
                qtn.DROPDOWN,
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
