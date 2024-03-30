import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuHome, LuClipboardList, LuHistory } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

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

const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-full w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

const renderButton = (
  icon: React.ReactNode,
  label: string,
  onClick: () => void,
  isActive: boolean
) => (
  <Button className={buttonClass} onClick={onClick}>
    {isActive ? (
      <span className={buttonIndicatorClassSm}></span>
    ) : (
      <span className={`${buttonIndicatorClassSm} bg-transparent`}></span>
    )}
    <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
      {icon}
      <div className="font-bold text-xs md:text-sm text-[#324B4F] text-wrap md:text-nowrap">
        {label}
      </div>
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
  const NAVIGATION_CONST = [
    {
      icon: <LuHome className="w-full h-5 text-primary" />,
      label: "Home",
      onClick: onClickHome,
      isActive: state === "home",
    },
    {
      icon: <LuClipboardList className="w-full h-5 text-primary" />,
      label: action,
      onClick: onClickAction,
      isActive: state === "action",
    },
    {
      icon: <LuHistory className="w-full h-5 text-primary" />,
      label: "Responses",
      onClick: onClickResponses,
      isActive: state === "responses",
    },
  ];

  function decideChildren(label: string) {
    switch (label) {
      case "Home":
        return homeChildren;
      case "Responses":
        return responsesChildren;
      default:
        return actionChildren;
    }
  }

  function decideState(state: string) {
    switch (state) {
      case "Home":
        return "home";
      case "Responses":
        return "responses";
      default:
        return "action";
    }
  }

  return (
    <AnimatePresence>
      <div className={`flex p-4 md:p-0  ${className}`}>
        <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0 overflow-x-auto">
          {NAVIGATION_CONST.map((nav) => (
            <Fragment key={nav.label}>
              <motion.div
                className="w-full md:block hidden"
                initial={{
                  opacity: 0,
                  y: state === decideState(nav.label) ? 400 : 0,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 400 }}
                transition={{ duration: 0.5, type: "tween" }}
              >
                {renderButton(nav.icon, nav.label, nav.onClick, nav.isActive)}
              </motion.div>
              <motion.div
                className="w-full md:hidden block"
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 400 }}
                transition={{ duration: 0.5, type: "tween" }}
              >
                {renderButton(nav.icon, nav.label, nav.onClick, nav.isActive)}
              </motion.div>
              {nav.isActive ? (
                <div className="hidden md:flex flex-col h-full">
                  {decideChildren(nav.label)}
                </div>
              ) : null}
            </Fragment>
          ))}
        </Card>
      </div>
    </AnimatePresence>
  );
};

export default Navigation;
