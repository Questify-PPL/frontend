import { Button } from "@/components/ui/button";
import QuestionType from "../../QuestionType";
import { Card } from "@/components/ui/card";

interface AddQuestionModalProps {
  className?: string;
  onCancel: () => void;
}

export default function AddQuestionModal({
  className = "",
  onCancel,
}: AddQuestionModalProps) {
  const questionTypes = [
    "Short Text",
    "Long Text",
    "Multiple Choice",
    "Checkboxes",
  ];

  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
    >
      <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-6">
        {questionTypes.map((type, index) => (
          <div key={index} className="grow-2">
            <QuestionType type={type} noText={false} />
          </div>
        ))}
        <Button onClick={onCancel}>Cancel</Button>
      </Card>
    </div>
  );
}
