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
import { useEffect, useState } from "react";

export function IndividualContent() {
  const {
    allIndividuals,
    formId,
    setIndividualFormQuestions,
    individualFormQuestions,
    session,
  } = useSummaryContext();
  const [individual, setIndividual] = useState(allIndividuals[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!individual) {
      return;
    }

    async function fetchIndividualResponse() {
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
    individual,
    formId,
    setIndividualFormQuestions,
    session.user.accessToken,
  ]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h2 className="text-[#32636A] text-[14px] leading-normal font-bold">
        Choose an individual to view their response
      </h2>
      <Select defaultValue={individual.email}>
        <SelectTrigger className="md:w-3/5 w-4/5">
          <SelectValue>
            {individual.name ? individual.name : individual.email}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Individuals</SelectLabel>
            {allIndividuals.map((individual) => (
              <SelectItem
                key={individual.respondentId}
                value={individual.respondentId}
                onClick={() => setIndividual(individual)}
              >
                {individual.name ? individual.name : individual.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
