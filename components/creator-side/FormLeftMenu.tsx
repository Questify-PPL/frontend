import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormLeftMenuProps {
  className?: string;
  state?: "opening" | "contents" | "ending";
  onClickOpening?: () => void;
  openingChildren?: React.ReactNode;
  onClickContents?: () => void;
  contentsChildren?: React.ReactNode;
  onClickEnding?: () => void;
  endingChildren?: React.ReactNode;
}

const buttonClass = `flex gap-2 h-fit w-full bg-background hover:bg-accent text-[#324B4F] hover:text-[#324B4F]
  flex-row justify-between p-0 rounded-none`;
const buttonIndicatorClass = `w-1 h-full bg-primary rounded-l-md flex`;

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
        <Button className={buttonClass} onClick={onClickOpening}>
          <div className="flex flex-row gap-3 pl-5 py-3 items-center">
            <div className="font-bold text-[#324B4F] text-sm">Opening</div>
          </div>
          {state === "opening" ? (
            <span className={buttonIndicatorClass}></span>
          ) : (
            <span className={`${buttonIndicatorClass} bg-transparent`}></span>
          )}
        </Button>
        {state == "opening" ? (
          <div className="flex flex-col h-full">{openingChildren}</div>
        ) : null}
        <Button className={buttonClass} onClick={onClickContents}>
          <div className="flex flex-row gap-3 pl-5 py-3 items-center">
            <div className="font-bold text-[#324B4F] text-sm">Contents</div>
          </div>
          {state === "contents" ? (
            <span className={buttonIndicatorClass}></span>
          ) : (
            <span className={`${buttonIndicatorClass} bg-transparent`}></span>
          )}
        </Button>
        {state == "contents" ? (
          <div className="flex flex-col h-full">{contentsChildren}</div>
        ) : null}
        <Button className={buttonClass} onClick={onClickEnding}>
          <div className="flex flex-row gap-3 pl-5 py-3 items-center">
            <div className="font-bold text-[#324B4F] text-sm">Ending</div>
          </div>
          {state === "ending" ? (
            <span className={buttonIndicatorClass}></span>
          ) : (
            <span className={`${buttonIndicatorClass} bg-transparent`}></span>
          )}
        </Button>
        {state == "ending" ? (
          <div className="flex flex-col h-full">{endingChildren}</div>
        ) : null}
      </Card>
    </div>
  );
};

export default FormLeftMenu;
