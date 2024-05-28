import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loading } from "../common";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface TerminusProps {
  className?: string;
  QRETitle?: string;
  terminusImage?: ReactNode;
  terminusSectionTitle?: string;
  terminusText?: string;
  buttonType?: "button" | "submit" | "reset";
  buttonClickHandler?: () => void;
  buttonPrevHandler?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonDisabled?: boolean;
  isParticipate?: boolean;
  isEnding?: boolean;
}

const Terminus: React.FC<TerminusProps> = ({
  className = "",
  QRETitle = "",
  terminusImage = null,
  terminusSectionTitle = "",
  terminusText = "",
  buttonType = "button",
  buttonClickHandler = () => {},
  buttonPrevHandler = () => {},
  buttonText = "",
  buttonIcon = null,
  buttonDisabled = false,
  isEnding = false,
  isParticipate = false,
}) => {
  return (
    <Card
      className={`flex flex-col ${isParticipate ? "w-full" : "w-[50%]"} h-[90%] ${className}`}
      data-testid="terminus"
    >
      <div className="flex flex-col bg-secondary md:h-[15%] justify-center font-semibold text-[14px] md:text-xl px-[20px] py-[10px] md:p-6 gap-1 md:rounded-t-md">
        {QRETitle}
        {terminusImage}
      </div>
      <div className="flex flex-col h-full justify-center items-center text-center font-medium text-xl p-[40px] md:px-24 md:py-14 gap-8 md:rounded-t-md">
        <div className="text-sm md:text-base text-primary">
          {terminusSectionTitle}
        </div>
        <div className="text-base md:text-xl">{terminusText}</div>
        <div className="max-w-[330px] w-full flex flex-col gap-1">
          <Button
            className="gap-2"
            type={buttonType}
            onClick={buttonClickHandler}
            data-testid="terminus-button"
            disabled={buttonDisabled}
          >
            {buttonDisabled && <Loading />}
            {buttonText}
            {buttonIcon}
          </Button>
        </div>
      </div>
      {isEnding && (
        <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
          <div className="flex gap-1">
            <Button variant="outline" id="prev" onClick={buttonPrevHandler}>
              <LuChevronUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Terminus;
