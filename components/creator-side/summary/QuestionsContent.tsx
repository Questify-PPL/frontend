import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSummaryContext } from "@/lib/context/SummaryContext";
import { QuestionAnswer, QuestionWithAnswerSection } from "@/lib/types";

export function QuestionsContent() {
  const { questionsWithAnswers, questionDetails, currentPage, setCurrentPage } =
    useSummaryContext();

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col gap-1">
        <div className="text-[#1D2425] text-[16px] font-medium text-wrap w-full leading-normal">
          {questionDetails.sectionId !== null
            ? (questionDetails as QuestionWithAnswerSection).name
            : (questionDetails as QuestionAnswer).question}
        </div>
        <div className="text-[#626363] text-[12px] font-medium text-wrap w-full leading-normal">
          {questionDetails.description}
        </div>
      </div>
      {questionDetails.sectionId !== null ? (
        <>
          {(questionDetails as QuestionWithAnswerSection).questions.map(
            (question, index) => (
              <div
                className="flex gap-[6px] self-stretch justify-center w-full rounded-[6px] p-3"
                key={`question-answer-${question.questionId}`}
              >
                <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0 rounded-[3.33px] bg-[#E5EEF0] text-[10px] font-bold leading-normal">
                  {index + 1}
                </div>
                <div className="flex flex-col justify-center gap-3 flex-1">
                  <p className="text-[#1D2425] text-[14px] font-semibold leading-normal">
                    {question.question}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[14px] font-semibold leading-normal">
                    Responses:
                  </h3>

                  <p className="text-[14px] font-semibold leading-normal"></p>
                </div>
              </div>
            ),
          )}
        </>
      ) : (
        <></>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setCurrentPage((prev: number) => {
                  if (prev === 1) return prev;
                  return prev - 1;
                })
              }
              className="cursor-pointer"
            />
          </PaginationItem>
          {Array.from({ length: questionsWithAnswers.length }).map(
            (_, index) => {
              return (
                <PaginationItem key={`pagination-${index + 1}`}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            },
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => {
                  if (prev === questionsWithAnswers.length) return prev;
                  return prev + 1;
                })
              }
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
