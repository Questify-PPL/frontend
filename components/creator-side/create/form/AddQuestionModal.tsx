// QuestionTypeList.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuX } from "react-icons/lu";
import { QuestionTypeNames as qtn } from "@/lib/services/form";
import QuestionType from "../../QuestionType";
import { Button } from "@/components/ui/button";

interface QuestionTypeListProps {
  types: string[];
  onShortTextClick?: () => void;
  onLongTextClick?: () => void;
  onDateClick?: () => void;
  onCheckboxClick?: () => void;
  onMultipleChoiceClick?: () => void;
  onYesNoClick?: () => void;
  onLinkClick?: () => void;
}

function QuestionTypeList({
  types,
  onShortTextClick = () => {},
  onLongTextClick = () => {},
  onDateClick = () => {},
  onCheckboxClick = () => {},
  onMultipleChoiceClick = () => {},
  onYesNoClick = () => {},
  onLinkClick = () => {},
}: Readonly<QuestionTypeListProps>) {
  const clickHandlers: { [key: string]: () => void } = {
    [qtn.SHORT_TEXT]: onShortTextClick,
    [qtn.LONG_TEXT]: onLongTextClick,
    [qtn.DATE]: onDateClick,
    [qtn.CHECKBOX]: onCheckboxClick,
    [qtn.MULTIPLE_CHOICE]: onMultipleChoiceClick,
    [qtn.YES_NO]: onYesNoClick,
    [qtn.LINK]: onLinkClick,
  };

  const notYetImplemented = [
    qtn.NUMBER,
    qtn.TIME,
    qtn.PICTURE_CHOICE,
    qtn.DROPDOWN,
    qtn.MATRIX,
    qtn.NET_PROMOTER,
    qtn.RATING,
    qtn.FILE_UPLOAD,
  ];

  const handleClick = (type: string) => {
    const handler = clickHandlers[type] || (() => {});
    handler();
  };

  return (
    <>
      {types.map((type) => (
        <Button
          key={type}
          className="flex flex-row py-2.5 px-2 gap-1.5 bg-white text-primary hover:bg-[#F3F8F9] items-start justify-center rounded-md cursor-pointer"
          onClick={() => handleClick(type)}
          disabled={notYetImplemented.includes(type as qtn)}
        >
          <QuestionType type={type} noText={true} />
          <span className="flex-grow-0 w-full truncate text-xs text-start">
            {type}
          </span>
        </Button>
      ))}
    </>
  );
}

interface AddQuestionModalProps {
  className?: string;
  onCancel: () => void;
  onShortTextClick?: () => void;
  onLongTextClick?: () => void;
  onDateClick?: () => void;
  onCheckboxClick?: () => void;
  onMultipleChoiceClick?: () => void;
  onYesNoClick?: () => void;
  onLinkClick?: () => void;
}

export function AddQuestionModal({
  className = "",
  onCancel,
  onShortTextClick = () => {},
  onLongTextClick = () => {},
  onDateClick = () => {},
  onCheckboxClick = () => {},
  onMultipleChoiceClick = () => {},
  onYesNoClick = () => {},
  onLinkClick = () => {},
}: Readonly<AddQuestionModalProps>) {
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
            <QuestionTypeList
              types={[qtn.SHORT_TEXT, qtn.LONG_TEXT]}
              {...{ onShortTextClick, onLongTextClick }}
            />
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Numeric
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={[qtn.NUMBER, qtn.DATE, qtn.TIME]}
              {...{ onDateClick }}
            />
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
              {...{ onMultipleChoiceClick, onCheckboxClick, onYesNoClick }}
            />
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Scaler
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={[qtn.MATRIX, qtn.NET_PROMOTER, qtn.RATING]}
            />
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Others
            </span>
            <Separator className="bg-[#F3F8F9]" />
            <QuestionTypeList
              types={[qtn.FILE_UPLOAD, qtn.LINK]}
              {...{ onLinkClick }}
            />
          </div>
        </div>
        <span className="flex text-xs">
          The disabled ones are the future question types, stay tuned!
        </span>
      </Card>
    </div>
  );
}
