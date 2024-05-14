import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormRightMenuState as frms } from "@/lib/services/form";

interface FormRightMenuProps {
  className?: string;
  state?: string;
  onClickQuestion?: () => void;
  questionChildren?: React.ReactNode;
  onClickDesign?: () => void;
  designChildren?: React.ReactNode;
  onClickLogic?: () => void;
  logicChildren?: React.ReactNode;
  onClickPublish?: () => void;
  publishChildren?: React.ReactNode;
}

const buttonClass = `flex gap-2 h-fit w-full bg-background hover:bg-accent text-[#324B4F] hover:text-[#324B4F]
  flex-row justify-between p-0 rounded-none`;
const indicatorClass = `w-1 h-full bg-primary rounded-r-md flex`;
const childrenClass = `flex flex-col h-full gap-4 px-5 py-4 items-center`;

const renderButton = (
  label: string,
  onClick: () => void,
  isActive: boolean,
) => (
  <Button className={buttonClass} onClick={onClick}>
    {isActive ? (
      <span className={indicatorClass}></span>
    ) : (
      <span className={`${indicatorClass} bg-transparent`}></span>
    )}
    <div className="flex flex-row gap-3 pr-5 py-3 items-center">
      <div className="font-bold text-[#324B4F] text-sm">{label}</div>
    </div>
  </Button>
);

export function FormRightMenu({
  className = "",
  state = frms.QUESTION,
  onClickQuestion = () => {},
  questionChildren = null,
  onClickDesign = () => {},
  designChildren = null,
  onClickLogic = () => {},
  logicChildren = null,
  onClickPublish = () => {},
  publishChildren = null,
}: Readonly<FormRightMenuProps>) {
  return (
    <div className={`flex p-0  ${className}`}>
      <Card className="flex flex-col w-full h-full gap-0 py-2 px-0">
        {renderButton("Question", onClickQuestion, state === frms.QUESTION)}
        {state === frms.QUESTION ? (
          <div className={childrenClass}>{questionChildren}</div>
        ) : null}
        {renderButton("Logic", onClickLogic, state === frms.LOGIC)}
        {state === frms.LOGIC ? (
          <div className={childrenClass}>{logicChildren}</div>
        ) : null}
        {renderButton("Design", onClickDesign, state === frms.DESIGN)}
        {state === frms.DESIGN ? (
          <div className={childrenClass}>{designChildren}</div>
        ) : null}
        {renderButton("Publish", onClickPublish, state === frms.PUBLISH)}
        {state === frms.PUBLISH ? (
          <div className={childrenClass}>{publishChildren}</div>
        ) : null}
      </Card>
    </div>
  );
}
