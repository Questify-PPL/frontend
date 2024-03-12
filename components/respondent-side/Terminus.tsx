import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";

interface TerminusProps {
  className?: string;
  QRETitle?: string;
  terminusImage?: ReactNode;
  terminusSectionTitle?: string;
  terminusText?: string;
  buttonType?: "button" | "submit" | "reset";
  buttonClickHandler?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
}

const Terminus: React.FC<TerminusProps> = ({
  className = "",
  QRETitle = "",
  terminusImage = null,
  terminusSectionTitle = "",
  terminusText = "",
  buttonType = "button",
  buttonClickHandler = () => {},
  buttonText = "",
  buttonIcon = null,
}) => {
  return (
    <Card className={`flex flex-col w-[50%] h-[90%] ${className}`}>
      <div className="flex flex-col bg-secondary h-[15%] justify-center font-semibold text-xl p-6 gap-1 rounded-t-md">
        {QRETitle}
        {terminusImage}
      </div>
      <div className="flex flex-col h-full justify-center items-center text-center font-medium text-xl px-24 py-14 gap-8 rounded-t-md">
        <div className="text-base text-primary">{terminusSectionTitle}</div>
        <div className="text-xl">{terminusText}</div>
        <div className="w-[45%] flex flex-col gap-1">
          <ClickEnter />
          <Button
            className="gap-2"
            type={buttonType}
            onClick={buttonClickHandler}
          >
            {buttonText}
            {buttonIcon}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Terminus;
