import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuHome, LuClipboardList, LuHistory } from "react-icons/lu";

const HomePage: React.FC = () => {
  const buttonClass = `flex-col justify-start py-0 pb-2 px-2 gap-2 h-fit w-full bg-background hover:bg-accent text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0`;
  const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
  const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

  return (
    <div className="flex p-4 md:py-0">
      <Card className="flex px-2 md:flex-col w-full md:w-[20%] md:h-screen md:gap-0 gap-5 md:py-2 md:px-0">
        <Button className={buttonClass}>
          <span className={buttonIndicatorClassSm}></span>
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
            <LuHome className="w-full h-5 text-primary" />
            <div className="font-bold text-xs text-[#324B4F] md:text-sm">
              Home
            </div>
          </div>
          <span className={buttonIndicatorClassMd}></span>
        </Button>
        <Button className={buttonClass}>
          <span className={buttonIndicatorClassSm}></span>
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
            <LuClipboardList className="w-full h-5 text-primary" />
            <div className="md:hidden font-bold text-xs md:text-sm text-[#324B4F]">
              Create QRE
            </div>
            <div className="hidden lg:flex font-bold text-sm text-[#324B4F]">
              Create Questionnaire
            </div>
          </div>
          <span className={buttonIndicatorClassMd}></span>
        </Button>
        <Button className={buttonClass}>
          <span className={buttonIndicatorClassSm}></span>
          <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
            <LuHistory className="w-full h-5 text-primary" />
            <div className="font-bold text-xs text-[#324B4F] md:text-sm">
              Responses
            </div>
          </div>
          <span className={buttonIndicatorClassMd}></span>
        </Button>
      </Card>
    </div>
  );
};

export default HomePage;
