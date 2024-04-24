import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface QuestionBoxProps {
  className?: string;
  QRETitle?: string;
  questionNum?: ReactNode;
  questionImage?: ReactNode;
  questions?: ReactNode;
  prevButton?: () => void;
  nextButton?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  className = "",
  QRETitle = "",
  questionImage = null,
  questionNum = null,
  questions = null,
  prevButton = () => {},
  nextButton = () => {},
  buttonText = "",
  buttonIcon = null,
}) => {
  return (
    <Card className={`flex flex-col w-[50%] h-[90%] ${className}`}>
      <div className="flex flex-col bg-secondary md:h-[15%] justify-center font-semibold text-[14px] md:text-xl px-[20px] py-[10px] md:p-6 gap-1 rounded-t-md">
        {QRETitle}
        {questionImage}
      </div>
      <div className="flex flex-col h-full overflow-hidden gap-8 items-center font-medium text-sm md:text-xl p-[40px] rounded-t-md">
        {questionNum}
        <div className="flex flex-col h-full overflow-auto gap-8 w-full">
          {questions}
        </div>
      </div>
      <div className="flex flex-row bg-transparent h-[15%] justify-between items-end text-xl p-6 gap-1 rounded-t-md">
        <div className="flex gap-1">
          <Button variant="outline" id="prev" onClick={prevButton}>
            <LuChevronUp className="w-5 h-5" />
          </Button>
          <Button variant="outline" id="next" onClick={nextButton}>
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

export default QuestionBox;
