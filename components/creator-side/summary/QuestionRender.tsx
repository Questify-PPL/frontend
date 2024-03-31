import { useSummaryContext } from "@/lib/context/SummaryContext";
import { QuestionStatistic, RadioStatistic } from "@/lib/types";
import { Bar, Pie } from "react-chartjs-2";

export function QuestionRender({
  question,
  index,
}: Readonly<{
  question: QuestionStatistic;
  index: number;
}>) {
  const { graphType } = useSummaryContext();

  return (
    <div className="flex gap-[6px] self-stretch justify-center w-full rounded-[6px] p-3">
      <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0 rounded-[3.33px] bg-[#E5EEF0] text-[10px] font-bold leading-normal">
        {index + 1}
      </div>
      <div className="flex flex-col justify-center gap-3 flex-1">
        <p className="text-[#1D2425] text-[14px] font-semibold leading-normal">
          {question.question}
        </p>
        {question.questionType !== "TEXT" && (
          <div className="relative w-full">
            {graphType === "bar" && (
              <Bar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={{
                  labels: (question.statistics as RadioStatistic).choices,
                  datasets: [
                    {
                      label: "Amount",
                      data: (question.statistics as RadioStatistic).amounts,
                    },
                  ],
                }}
              />
            )}

            {graphType === "pie" && (
              <Pie
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={{
                  labels: (question.statistics as RadioStatistic).choices,
                  datasets: [
                    {
                      label: "Amount",
                      data: (question.statistics as RadioStatistic).amounts,
                      backgroundColor: (
                        question.statistics as RadioStatistic
                      ).choices.map((_, index) => {
                        return `hsl(${(index * 360) / (question.statistics as RadioStatistic).choices.length}, 100%, 50%)`;
                      }),
                    },
                  ],
                }}
              />
            )}
          </div>
        )}
        {question.questionType === "TEXT" && (
          <div className="flex flex-col w-full gap-2">
            <p className="text-[12px] font-medium self-stretch leading-normal text-[#626363]">
              {(question.statistics as string[]).length} Responses
            </p>
            <div className="flex flex-col gap-1 w-full border border-solid border-[#E5EEF0] rounded-sm px-4 py-4">
              {(question.statistics as string[]).map((answer, index) => (
                <div
                  key={`answer-${index + 1}`}
                  className="flex flex-col gap-1"
                >
                  <p className="text-[14px] font-medium leading-normal">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
