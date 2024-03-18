import QuestionType from "../../QuestionType";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuX } from "react-icons/lu";

interface AddQuestionModalProps {
  className?: string;
  onCancel: () => void;
}

export default function AddQuestionModal({
  className = "",
  onCancel,
}: AddQuestionModalProps) {
  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
    >
      <Card className="flex flex-col w-[60%] p-5 justify-center items-center gap-6 pb-12">
        <div className="flex flex-row justify-end items-center w-full ">
          <LuX className="w-5 h-5" onClick={onCancel}></LuX>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="flex font-extrabold text-xl">
            Choose a Question Type
          </span>
          <span className="flex font-regular text-sm text-primary/40">
            Choose the best question type for your questionnaire
          </span>
        </div>
        <div className="flex flex-row w-full h-full justify-between gap-3 px-10">
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">Text</span>
            <Separator className="bg-[#F3F8F9]"></Separator>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Short Text" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Short Text
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Long Text" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Long Text
              </span>
            </div>
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Numeric
            </span>
            <Separator className="bg-[#F3F8F9]"></Separator>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Number" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Number
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Date" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">Date</span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Time" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">Time</span>
            </div>
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Choices
            </span>
            <Separator className="bg-[#F3F8F9]"></Separator>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Multiple Choice" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Multiple Choice
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Checkboxes" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Checkboxes
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Picture Choice" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Picture Choice
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Yes/No" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Yes/No
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Dropdown" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Dropdown
              </span>
            </div>
          </div>
          <div className="flex flex-col w-[30%] gap-1">
            <span className="text-primary/40 font-semibold text-sm">
              Scaler
            </span>
            <Separator className="bg-[#F3F8F9]"></Separator>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Matrix" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Matrix
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Net Promoter Score" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Net Promoter Score
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Rating" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                Rating
              </span>
            </div>
            <span className="text-primary/40 font-semibold text-sm mt-2">
              Others
            </span>
            <Separator className="bg-[#F3F8F9]"></Separator>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="File Upload" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">
                File Upload
              </span>
            </div>
            <div className="flex flex-row py-2.5 px-2 gap-1.5 hover:bg-[#F3F8F9] items-center rounded-md cursor-pointer">
              <QuestionType type="Link" noText={true} />
              <span className="flex-grow-0 w-full truncate text-xs">Link</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
