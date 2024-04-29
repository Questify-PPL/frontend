import { IndividualQuestion } from "@/components/common/IndividualQuestion";
import {
  QuestionGroupedWithAnswerAndChoice,
  SectionGroupedWithAnswer,
} from "@/lib/types";
import { LuBoxSelect } from "react-icons/lu";

export function Response({
  question,
  index,
}: Readonly<{
  question: SectionGroupedWithAnswer | QuestionGroupedWithAnswerAndChoice;
  index: number;
}>) {
  return (
    <>
      {question.sectionId !== null &&
        (question as SectionGroupedWithAnswer).name !== "Opening" &&
        (question as SectionGroupedWithAnswer).name !== "Ending" && (
          <div
            key={`section-${index + 1}`}
            className="flex flex-col gap-1 w-full"
          >
            <div className="flex flex-row gap-1 items-center">
              <div className="w-4 h-4 flex-shrink-0 rounded-[2.66px] bg-[#E5EEF0] text-center flex flex-col items-center justify-center text-[8px] leading-normal font-bold">
                {index + 1}
              </div>

              <div className="flex items-center gap-[2px] py-[2px] px-[6px] rounded-[8px] bg-[#E5EEF0]">
                <LuBoxSelect className="w-[10px] h-[10px]" />
                <h4 className="text-[#1D2425] text-[8px] font-medium leading-normal">
                  Section
                </h4>
              </div>
            </div>
            <div className="flex p-[8px] flex-col justify-center gap-[12px] self-stretch rounded-[8px] bg-[#F3F8F9]">
              <h3 className="text-[#1D2425] truncate font-semibold leading-normal py-[6px] px-[12px] rounded-[6px] border border-solid border-[#CDDDE1]">
                {(question as SectionGroupedWithAnswer).name}
              </h3>
              {(question as SectionGroupedWithAnswer).questions.map(
                (val, index) => (
                  <IndividualQuestion
                    key={val.questionId}
                    val={val}
                    index={index + 1}
                  />
                ),
              )}
            </div>
          </div>
        )}

      {question.sectionId === null && (
        <IndividualQuestion
          key={`individual-question-${index + 1}`}
          val={question as QuestionGroupedWithAnswerAndChoice}
          index={index + 1}
        />
      )}
    </>
  );
}
