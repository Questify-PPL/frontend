import { QuestionAnswer } from "@/lib/types";

export function QuestionsResponse({
  question,
}: Readonly<{ question: QuestionAnswer }>) {
  return (
    <div className="flex flex-col gap-3 min-w-[60%] w-fit">
      <h3 className="text-[14px] font-semibold leading-normal">Responses:</h3>

      {Object.entries(question.occurence).length > 0 ? (
        Object.entries(question.occurence).map(
          ([answer, occur], index: number) => (
            <div
              className="flex flex-col gap-2 pl-3 justify-center"
              key={`answer-${question.questionId}-${index + 1}`}
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0 rounded-[3.33px] bg-[#E5EEF0] text-[10px] font-bold leading-normal">
                  {index + 1}
                </div>
                <p className="text-[14px] font-semibold leading-normal">
                  {answer}
                </p>
              </div>
              <p className="text-[12px] font-medium leading-normal text-[#626363]">
                {occur} responses
              </p>
            </div>
          ),
        )
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-[14px] font-semibold leading-normal text-center">
            No responses for this question yet
          </p>
        </div>
      )}
    </div>
  );
}
