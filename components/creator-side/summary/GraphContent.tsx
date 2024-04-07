import { useSummaryContext } from "@/lib/context/SummaryContext";
import { QuestionStatistic, SectionGrouped } from "@/lib/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { QuestionRender } from "./QuestionRender";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const variations = [
  {
    label: "Pie Chart",
    value: "pie",
  },
  {
    label: "Bar Chart",
    value: "bar",
  },
  {
    label: "Doughnut Chart",
    value: "doughnut",
  },
];

export function GraphContent() {
  const { formStatistics, graphType, setGraphType } = useSummaryContext();

  return (
    <>
      <div className="flex flex-row justify-end w-full gap-2">
        {variations?.map((variation) => (
          <button
            key={variation.label}
            className={`flex items-center gap-2 bg-[#F3F8F9] text-[#324B4F] font-medium text-[12px] px-3 py-1 rounded-md ${
              graphType === variation.value ? "bg-primary text-white" : ""
            }`}
            onClick={() =>
              setGraphType(variation.value as "pie" | "bar" | "doughnut")
            }
          >
            {variation.label}
          </button>
        ))}
      </div>
      {formStatistics?.questionsStatistics.map((question, index) => {
        return (
          <div
            key={`question-${index + 1}`}
            className="flex flex-col w-full gap-3"
          >
            <div className="flex flex-col gap-[6px]">
              <div className="flex gap-1 items-center">
                <div className="text-[#324B4F] text-[12px] font-medium text-wrap leading-normal">
                  Question {index + 1}
                </div>
                {question.sectionId !== null && (
                  <div className="flex py-[2px] px-[6px] items-center justify-center gap-[10px] rounded-[4px] bg-[#F3F8F9] text-[10px] font-medium leading-normal text-[#32636A]">
                    Section
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#1D2425] text-[16px] font-medium text-wrap w-full leading-normal">
                  {question.sectionId !== null
                    ? (question as SectionGrouped).name
                    : (question as QuestionStatistic).question}
                </div>
                <div className="text-[#626363] text-[12px] font-medium text-wrap w-full leading-normal">
                  {question.description}
                </div>
              </div>
            </div>
            {question.sectionId !== null &&
              (question as SectionGrouped).questions.map((question, index) => (
                <QuestionRender
                  key={`question-${question.questionId}`}
                  question={question}
                  index={index}
                />
              ))}

            {question.sectionId === null && (
              <QuestionRender
                question={question as QuestionStatistic}
                index={index}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
