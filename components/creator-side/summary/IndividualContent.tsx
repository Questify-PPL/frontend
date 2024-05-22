import { Response } from "@/components/common/Response";
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
import { Fragment, useEffect, useState } from "react";
import { ReportDialog } from "@/components/report/ReportDialog";

export function IndividualContent() {
  let {
    allIndividuals,
    formId,
    setIndividualFormQuestions,
    individualFormQuestions,
    session,
  } = useSummaryContext();
  const [individual, setIndividual] = useState(
    allIndividuals ? allIndividuals[0] : null,
  );

  const handleIndividualReportChange = (isReported: boolean) => {
    if (!individual) return;

    const updatedIndividual = { ...individual, isReported };

    const individualIndex = allIndividuals.findIndex(
      (val) => val === individual,
    );
    allIndividuals[individualIndex] = updatedIndividual;
    setIndividual(updatedIndividual);
  };

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
        },
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
    <div className="flex flex-col items-center justify-center gap-4 w-full relative">
      <h2 className="text-[#32636A] text-[14px] leading-normal font-bold">
        Choose an individual to view their response
      </h2>

      {individual && (
        <div className="flex gap-3 self-stretch mb-2">
          <Select
            onValueChange={(e) => {
              setIndividual(
                allIndividuals.find((val) => val.respondentId === e) as {
                  respondentId: string;
                  name: string;
                  email: string;
                  isReported: boolean;
                } | null,
              );
            }}
            defaultValue={individual.respondentId.toString()}
          >
            <SelectTrigger className="flex-1">
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
          <ReportDialog
            formId={formId}
            user={{
              reportedId: individual.respondentId,
              isReported: individual.isReported,
            }}
            handleReport={handleIndividualReportChange}
            reportedInfo={individual.name}
          />
        </div>
      )}

      {!error && individualFormQuestions && (
        <>
          {individualFormQuestions.map((question, index) => (
            <Fragment key={`fragment-${index + 1}`}>
              <Response question={question} index={index} />
            </Fragment>
          ))}

          <div className="min-h-16"></div>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
