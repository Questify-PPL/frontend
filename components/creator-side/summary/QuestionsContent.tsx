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
import { QuestionsResponse } from "./QuestionsResponse";

export function QuestionsContent() {
  const { questionsWithAnswers, questionDetails, currentPage, setCurrentPage } =
    useSummaryContext();

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {questionDetails ? (
        <>
          <div className="flex flex-col gap-1 justify-center items-center">
            <div className="flex flex-row gap-2 items-center">
              <h2 className="text-[#1D2425] md:text-2xl text-lg font-bold text-center leading-normal self-stretch text-wrap text-[16px] w-full">
                {questionDetails?.sectionId !== null
                  ? (questionDetails as QuestionWithAnswerSection)?.name
                  : (questionDetails as QuestionAnswer)?.question}
              </h2>
              {questionDetails?.sectionId !== null && (
                <div className="flex py-[2px] px-[6px] items-center justify-center gap-[10px] rounded-[4px] bg-[#F3F8F9] text-[10px] font-medium leading-normal text-[#32636A]">
                  Section
                </div>
              )}
            </div>
            <p className="text-[#626363] text-[12px] font-medium text-wrap leading-normal">
              {questionDetails?.description}
            </p>
          </div>
          {questionDetails?.sectionId !== null ? (
            <>
              {(questionDetails as QuestionWithAnswerSection)?.questions.map(
                (question, index) => (
                  <div
                    className="flex flex-col gap-[6px] self-stretch justify-center w-full p-3"
                    key={`question-answer-${question.questionId}`}
                  >
                    <div className="flex flex-row gap-[6px] self-stretch justify-center w-full items-center">
                      <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0 rounded-[3.33px] bg-[#E5EEF0] text-[10px] font-bold leading-normal">
                        {index + 1}
                      </div>

                      <div className="flex flex-col justify-center gap-3 flex-1">
                        <p className="text-[#1D2425] text-[14px] font-semibold leading-normal">
                          {question.question}
                        </p>
                      </div>
                    </div>

                    <QuestionsResponse question={question} />
                  </div>
                ),
              )}
            </>
          ) : (
            <QuestionsResponse question={questionDetails as QuestionAnswer} />
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
              {Array.from({
                length: questionsWithAnswers ? questionsWithAnswers.length : 0,
              }).map((_, index) => {
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
              })}

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
        </>
      ) : (
        <h4>Error fetching question details. Please try again later.</h4>
      )}
    </div>
  );
}
