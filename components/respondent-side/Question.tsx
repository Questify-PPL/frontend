import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface QuestionProps {
  className?: string;
  questionQRETitle?: string;
  questionImage?: ReactNode;
  questionSectionTitle?: string;
  questionSectionText?: string;
  required?: boolean;
  questions?: ReactNode;
  prevButton?: () => void;
  nextButton?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
}

const Question: React.FC<QuestionProps> = ({
  className = "",
  questionQRETitle = "",
  questionImage = null,
  questionSectionTitle = "",
  questionSectionText = "",
  questions = null,
  required = false,
  prevButton = () => {},
  nextButton = () => {},
  buttonText = "",
  buttonIcon = null,
}) => {
  return (
    <Card className={`flex flex-col w-[50%] h-[90%] ${className}`}>
      <div className="flex flex-col bg-secondary h-[15%] justify-center font-semibold text-xl p-6 gap-1 rounded-t-md">
        {questionQRETitle}
        {questionImage}
      </div>
      <div className="flex flex-col h-full overflow-hidden gap-8 items-center font-medium text-xl px-24 py-14 rounded-t-md">
        <div className="flex flex-col h-full overflow-auto gap-8 w-full">
          <div className="flex flex-col gap-1.5 text-base text-primary w-full justify-start">
            <div className="flex flex-row w-full h-fit gap-2">
              {required && (
                <span className="flex w-1.5 h-6 bg-[#FE476C] rounded-md"></span>
              )}
              {questionSectionTitle}
            </div>
            <div className="text-xl text-black">{questionSectionText}</div>
          </div>
          {questions}
        </div>
      </div>
      <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
        <div className="flex gap-1">
          <Button variant="outline" onClick={prevButton}>
            <LuChevronUp className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={nextButton}>
            <LuChevronDown className="w-5 h-5" />
          </Button>
        </div>
        <div className="w-[45%] flex flex-col gap-1">
          <ClickEnter></ClickEnter>
          <Button className="gap-2" onClick={nextButton}>
            {buttonText}
            {buttonIcon}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Question;
