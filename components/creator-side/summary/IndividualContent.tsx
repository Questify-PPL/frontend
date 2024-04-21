import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { URL } from "@/lib/constant";
import { useSummaryContext } from "@/lib/context/SummaryContext";
import {
  QuestionGroupedWithAnswerAndChoice,
  SectionGroupedWithAnswer,
} from "@/lib/types";
import { Fragment, useEffect, useState } from "react";
import { LuBoxSelect } from "react-icons/lu";
import { IndividualQuestion } from "./IndividualQuestion";

export function IndividualContent() {
  const {
    allIndividuals,
    formId,
    setIndividualFormQuestions,
    individualFormQuestions,
    session,
  } = useSummaryContext();
  const [individual, setIndividual] = useState(
    allIndividuals ? allIndividuals[0] : null
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIndividualResponse() {
      if (!individual) return;

      const response = await fetch(
        `${URL.summaryURL}/${formId}/individual/${individual.respondentId}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      const res = await response.json();

      if (response.status >= 400) {
        setError(res.message);

        return;
      }

      // do something with res
      setIndividualFormQuestions(res.data);
    }

    fetchIndividualResponse();
  }, [
    formId,
    setIndividualFormQuestions,
    session.user.accessToken,
    individual,
  ]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h2 className="text-[#32636A] text-[14px] leading-normal font-bold">
        Choose an individual to view their response
      </h2>

      {individual && (
        <Select
          onValueChange={(e) => {
            setIndividual(
              allIndividuals.find((val) => val.respondentId === e) as {
                respondentId: string;
                name: string;
                email: string;
              } | null
            );
          }}
          defaultValue={individual.respondentId.toString()}
        >
          <SelectTrigger className="md:w-3/5 w-4/5">
            <SelectValue>
              {individual.name ? individual.name : individual.email}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Individuals</SelectLabel>
              {allIndividuals.map((curr) => (
                <SelectItem
                  key={curr.respondentId}
                  value={curr.respondentId.toString()}
                >
                  {curr.name ? curr.name : curr.email}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {!error && individualFormQuestions && (
        <>
          {individualFormQuestions.map((question, index) => (
            <Fragment key={`fragment-${index + 1}`}>
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
                        )
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
            </Fragment>
          ))}

          <div className="min-h-16"></div>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
