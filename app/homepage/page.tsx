import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuHome, LuClipboardList, LuHistory } from "react-icons/lu";

const HomePage: React.FC = () => {
  const buttonClass = `flex-col justify-start py-0 pb-2 px-2 gap-2 h-fit w-full bg-background hover:bg-accent text-[#324B4F] hover:text-[#324B4F]`;

  return (
    <div className="flex p-4">
      <Card className="flex w-full gap-5 px-2">
        <Button className={buttonClass}>
          <span className="w-full h-0.5 bg-primary rounded-b-md"></span>
          <div className="flex flex-col gap-0.5">
            <LuHome className="w-full h-5 text-primary" />
            <div className="font-bold text-xs text-[#324B4F]">Home</div>
          </div>
        </Button>
        <Button className={buttonClass}>
          <span className="w-full h-0.5 bg-primary rounded-b-md"></span>
          <div className="flex flex-col gap-0.5">
            <LuClipboardList className="w-full h-5 text-primary" />
            <div className="font-bold text-xs text-[#324B4F]">
              Create QRE
            </div>
          </div>
        </Button>
        <Button className={buttonClass}>
          <span className="w-full h-0.5 bg-primary rounded-b-md"></span>
          <div className="flex flex-col gap-0.5">
            <LuHistory className="w-full h-5 text-primary" />
            <div className="font-bold text-xs text-[#324B4F]">
              Responses
            </div>
          </div>
        </Button>
      </Card>
    </div>
  );
};

export default HomePage;
