import { QuestionGroupedWithAnswerAndChoice } from "@/lib/types";

export function IndividualQuestion({
  val,
  index,
}: Readonly<{
  val: QuestionGroupedWithAnswerAndChoice;
  index: number;
}>) {
  return (
    <div className="w-full bg-white flex flex-wrap flex-row gap-[6px] justify-center p-[8px] rounded-[6px] border border-solid border-[#CDDDE1]">
      <div className="w-4 h-4 flex-shrink-0 rounded-[2.66px] bg-[#E5EEF0] text-center flex flex-col items-center justify-center text-[8px] leading-normal font-bold">
        {index}
      </div>
      <div className="flex flex-col gap-[6px] flex-1 overflow-hidden">
        <div className="flex flex-row justify-between flex-wrap">
          <div className="flex py-[2px] px-[6px] gap-[2px] rounded-[8px] text-[8px] bg-[#FAD6E8]">
            {val.questionTypeName}
          </div>
          <p className="text-[#1D2425] text-[8px] font-semibold leading-normal">
            {val.isRequired ? "Required" : "Optional"}
          </p>
        </div>
        <h4 className="text-[#1D2425] text-[12px] font-semibold leading-normal truncate">
          {val.question}
        </h4>
        <h5 className="text-[10px] font-medium leading-normal text-[#CDDDE1]">
          {val.description}
        </h5>
        <div className="flex flex-col gap-1">
          {val.questionType === "TEXT" && (
            <>
              <p className="text-[#1D2425] text-[8px] font-semibold leading-normal truncate">
                {val.answer}
              </p>
              <div className="h-[1px] w-full bg-[#E5EEF0]"></div>
            </>
          )}
          {val.questionType !== "TEXT" && (
            <div className="flex flex-row flex-wrap justify-evenly">
              {val.choice?.map((choice, index) => {
                return (
                  <div
                    key={`choice-${val.questionId}-${index}`}
                    className="flex flex-row gap-[6px] self-stretch justify-center items-center"
                  >
                    <div
                      className={`w-4 h-4 flex-shrink-0 bg-[#E5EEF0] text-center flex flex-col items-center justify-center text-[8px] leading-normal font-bold ${val.questionType === "RADIO" ? "rounded-full" : "rounded-[2.66px]"}`}
                    >
                      {val.answer && (val.answer as string[]).includes(choice)
                        ? "✔️"
                        : ""}{" "}
                    </div>
                    <p className="text-[#1D2425] text-[12px] font-semibold leading-normal">
                      {choice}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
