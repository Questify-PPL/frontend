import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuHome, LuClipboardList, LuHistory } from "react-icons/lu";

interface NavigationProps {
  className?: string;
  action?: string;
  state?: "home" | "action" | "responses";
  onClickHome?: () => void;
  homeChildren?: React.ReactNode;
  onClickAction?: () => void;
  actionChildren?: React.ReactNode;
  onClickResponses?: () => void;
  responsesChildren?: React.ReactNode;
}

const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-fit w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

const renderButton = (
  icon: React.ReactNode,
  label: string,
  onClick: () => void,
  isActive: boolean,
) => (
  <Button className={buttonClass} onClick={onClick}>
    {isActive ? (
      <span className={buttonIndicatorClassSm}></span>
    ) : (
      <span className={`${buttonIndicatorClassSm} bg-transparent`}></span>
    )}
    <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
      {icon}
      <div className="font-bold text-xs md:text-sm text-[#324B4F]">{label}</div>
    </div>
    {isActive ? (
      <span className={buttonIndicatorClassMd}></span>
    ) : (
      <span className={`${buttonIndicatorClassMd} bg-transparent`}></span>
    )}
  </Button>
);

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  action = "",
  state = "home",
  onClickHome = () => {},
  homeChildren = null,
  onClickAction = () => {},
  actionChildren = null,
  onClickResponses = () => {},
  responsesChildren = null,
}) => {
  return (
    <div className={`flex p-4 md:p-0  ${className}`}>
      <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0">
        {renderButton(
          <LuHome className="w-full h-5 text-primary" />,
          "Home",
          onClickHome,
          state === "home",
        )}
        {state === "home" ? (
          <div className="hidden md:flex flex-col h-full">{homeChildren}</div>
        ) : null}
        {renderButton(
          <LuClipboardList className="w-full h-5 text-primary" />,
          action,
          onClickAction,
          state === "action",
        )}
        {state === "action" ? (
          <div className="hidden md:flex flex-col h-full">{actionChildren}</div>
        ) : null}
        {renderButton(
          <LuHistory className="w-full h-5 text-primary" />,
          "Responses",
          onClickResponses,
          state === "responses",
        )}
        {state === "responses" ? (
          <div className="hidden md:flex flex-col h-full">
            {responsesChildren}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default Navigation;
