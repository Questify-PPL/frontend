interface QuestionNumProps {
  isRequired?: boolean;
  questionNum?: number;
  isSection?: boolean;
  sectionText?: string;
}

const QuestionNum: React.FC<QuestionNumProps> = ({
  isRequired = false,
  questionNum = "",
  isSection = false,
  sectionText = "",
}) => {
  return (
    <div className="flex flex-col gap-1.5 text-base text-primary w-full justify-start">
      <div className="flex flex-row w-full h-fit gap-3">
        {isRequired && (
          <span className="flex w-1.5 h-6 bg-[#FE476C] rounded-md"></span>
        )}
        Question {questionNum}
        {isSection && (
          <div className="flex rounded-md px-2 py-1 text-xs font-medium text-primary bg-accent">
            Section
          </div>
        )}
      </div>
      {isSection && <div className="text-xl text-black">{sectionText}</div>}
    </div>
  );
};

export default QuestionNum;
