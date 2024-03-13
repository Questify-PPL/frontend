import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormLeftMenuProps {
  className?: string;
  state?: string;
  onClickQuestion?: () => void;
  questionChildren?: React.ReactNode;
  onClickDesign?: () => void;
  designChildren?: React.ReactNode;
  onClickLogic?: () => void;
  logicChildren?: React.ReactNode;
  onClickPreview?: () => void;
  previewChildren?: React.ReactNode;
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

const FormLeftMenu: React.FC<FormLeftMenuProps> = ({
  className = "",
  state = "question",
  onClickQuestion = () => {},
  questionChildren = null,
  onClickDesign = () => {},
  designChildren = null,
  onClickLogic = () => {},
  logicChildren = null,
  onClickPreview = () => {},
  previewChildren = null,
  onClickPublish = () => {},
  publishChildren = null,
}) => {
  return (
    <div className={`flex p-0  ${className}`}>
      <Card className="flex flex-col w-full h-full gap-0 py-2 px-0">
        {renderButton("Question", onClickQuestion, state === "question")}
        {state === "question" ? (
          <div className={childrenClass}>{questionChildren}</div>
        ) : null}
        {renderButton("Design", onClickDesign, state === "design")}
        {state === "design" ? (
          <div className={childrenClass}>{designChildren}</div>
        ) : null}
        {renderButton("Logic", onClickLogic, state === "logic")}
        {state === "logic" ? (
          <div className={childrenClass}>{logicChildren}</div>
        ) : null}
        {renderButton("Preview", onClickPreview, state === "preview")}
        {state === "preview" ? (
          <div className={childrenClass}>{previewChildren}</div>
        ) : null}
        {renderButton("Publish", onClickPublish, state === "publish")}
        {state === "publish" ? (
          <div className={childrenClass}>{publishChildren}</div>
        ) : null}
      </Card>
    </div>
  );
};

export default FormLeftMenu;
