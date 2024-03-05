import { ReactNode } from "react";

interface LayoutProps {
  required?: boolean;
  numbering?: number;
  question?: string;
  answer?: ReactNode;
}

const QuestionLayout: React.FC<LayoutProps> = ({
  required = false,
  numbering = 0,
  question = "",
  answer = null,
}) => {
  return (
    <div className="flex flex-row gap-3 w-full">
      <div className="flex flex-row gap-1 w-6.5 h-fit pt-1">
        {required ? (
          <span className="w-1.5 h-6 bg-[#FE476C] rounded-md"></span>
        ) : (
          <span className="w-1.5 h-6 bg-transparent rounded-md"></span>
        )}
        {numbering === 0 ? null : (
          <div className="flex w-6 h-6 bg-secondary rounded-md text-primary justify-center items-center text-[10px] leading-[12px]">
            {numbering}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 w-full justify-start">
        <div className="font-semibold text-lg">{question}</div>
        <div className="flex flex-col gap-0 w-full h-fit">{answer}</div>
      </div>
    </div>
  );
};

export default QuestionLayout;
