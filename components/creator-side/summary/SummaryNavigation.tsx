import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSummaryContext } from "@/lib/context/SummaryContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment } from "react";
import { LuGlasses, LuHelpCircle, LuUser } from "react-icons/lu";

const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-full w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
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
    <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:pr-12 md:py-3 md:items-center">
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

export function SummaryNavigation({ className = "" }) {
  const { activeTab, setActiveTab } = useSummaryContext();

  const NAVIGATION_CONST = [
    {
      icon: <LuGlasses className="w-full h-5 text-primary" />,
      label: "Summary",
      onClick: () => {
        setActiveTab("summary");
      },
      isActive: activeTab === "summary",
    },
    {
      icon: <LuHelpCircle className="w-full h-5 text-primary" />,
      label: "Question",
      onClick: () => {
        setActiveTab("question");
      },
      isActive: activeTab === "question",
    },
    {
      icon: <LuUser className="w-full h-5 text-primary" />,
      label: "Individual",
      onClick: () => {
        setActiveTab("individual");
      },
      isActive: activeTab === "individual",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div className={`flex p-4 md:p-0  ${className} z-10`}>
        <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0 overflow-x-auto">
          {NAVIGATION_CONST.map((nav) => (
            <Fragment key={nav.label}>
              <motion.div
                className="w-full md:block hidden"
                initial={{
                  opacity: 0,
                  y: 400,
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
            </Fragment>
          ))}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
