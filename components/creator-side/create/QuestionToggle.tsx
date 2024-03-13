import QuestionType from "@/components/creator-side/QuestionType";

interface QuestionToggleProps {
  onSelect?: () => void;
  isActive?: boolean;
  numbering?: number;
  questionType?: string;
  question?: string;
}

const QuestionToggle: React.FC<QuestionToggleProps> = ({
  onSelect = () => {},
  isActive = false,
  numbering = 0,
  questionType = "",
  question = "",
}) => {
  return (
    <div
      className={`flex flex-row gap-1.5 py-2.5 px-2 w-full rounded-md justify-start items-center ${isActive ? "bg-accent" : "bg-transparent"}`}
      onClick={onSelect}
    >
      <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-md text-primary flex justify-center items-center text-[10px] leading-3">
        {numbering}
      </div>
      <QuestionType type={questionType} noText={true} />
      <div className="flex-grow-0 w-full truncate text-xs">{question}</div>
    </div>
  );
};

export default QuestionToggle;
