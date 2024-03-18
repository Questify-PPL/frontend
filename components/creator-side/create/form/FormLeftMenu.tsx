import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormLeftMenuProps {
  className?: string;
  state?: string;
  onClickOpening?: () => void;
  openingChildren?: React.ReactNode;
  onClickContents?: () => void;
  contentsChildren?: React.ReactNode;
  onClickEnding?: () => void;
  endingChildren?: React.ReactNode;
}

const buttonClass = `flex gap-2 h-fit w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
  flex-row justify-between p-0 rounded-none`;
const indicatorClass = `w-1 h-full bg-primary rounded-l-md flex`;
const childrenClass = `flex flex-col h-full gap-4 px-5 py-4 items-stretch overflow-y-auto`;

const renderButton = (
  label: string,
  onClick: () => void,
  isActive: boolean,
) => (
  <Button className={buttonClass} onClick={onClick}>
    <div className="flex flex-row gap-3 pl-5 py-3 items-center">
      <div className="font-bold text-[#324B4F] text-sm">{label}</div>
    </div>
    {isActive ? (
      <span className={indicatorClass}></span>
    ) : (
      <span className={`${indicatorClass} bg-transparent`}></span>
    )}
  </Button>
);

const FormLeftMenu: React.FC<FormLeftMenuProps> = ({
  className = "",
  state = "opening",
  onClickOpening = () => {},
  openingChildren = null,
  onClickContents = () => {},
  contentsChildren = null,
  onClickEnding = () => {},
  endingChildren = null,
}) => {
  return (
    <div className={`flex p-0  ${className}`}>
      <Card className="flex flex-col w-full h-full gap-0 py-2 px-0">
        {renderButton("Opening", onClickOpening, state === "opening")}
        {state === "opening" ? (
          <div className={childrenClass}>{openingChildren}</div>
        ) : null}
        {renderButton("Contents", onClickContents, state === "contents")}
        {state === "contents" ? (
          <div className={childrenClass}>{contentsChildren}</div>
        ) : null}
        {renderButton("Ending", onClickEnding, state === "ending")}
        {state === "ending" ? (
          <div className={childrenClass}>{endingChildren}</div>
        ) : null}
      </Card>
    </div>
  );
};

export default FormLeftMenu;
