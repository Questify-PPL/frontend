import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormRightMenuProps {
  className?: string;
  state?: "question" | "design" | "logic" | "preview";
  onClickOpening?: () => void;
  openingChildren?: React.ReactNode;
  onClickContents?: () => void;
  contentsChildren?: React.ReactNode;
  onClickEnding?: () => void;
  endingChildren?: React.ReactNode;
}

const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-fit w-full bg-background hover:bg-accent text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

const FormRightMenu: React.FC<FormRightMenuProps> = ({
  className = "",
  state = "opening",
  onClickOpening = () => {},
  openingChildren = null,
  // onClickContents = () => {},
  // contentsChildren = null,
  // onClickEnding = () => {},
  // endingChildren = null,
}) => {
  return (
    <div className={`flex p-4 md:py-0  ${className}`}>
      <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0">
        <Button className={buttonClass} onClick={onClickOpening}>
          {state === "opening" ? (
            <span className={buttonIndicatorClassSm}></span>
          ) : (
            <span className={`${buttonIndicatorClassSm} bg-transparent`}></span>
          )}
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
            <div className="font-bold text-xs text-[#324B4F] md:text-sm">
              Opening
            </div>
          </div>
          {state === "opening" ? (
            <span className={buttonIndicatorClassMd}></span>
          ) : (
            <span className={`${buttonIndicatorClassMd} bg-transparent`}></span>
          )}
        </Button>
        {state == "opening" ? (
          <div className="hidden md:flex flex-col h-full">
            {openingChildren}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default FormRightMenu;


