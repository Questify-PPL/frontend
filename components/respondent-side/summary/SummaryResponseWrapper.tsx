"use client";

import { Response } from "@/components/common/Response";
import { removeUnnecessaryQuestions } from "@/lib/helper";
import { Questions } from "@/lib/types";
import { Fragment } from "react";

export function SummaryResponseWrapper({
  questions,
}: Readonly<{
  questions: Questions;
}>) {
  const questionsToBeRendered = removeUnnecessaryQuestions(questions);

  return (
    <div className="flex flex-col w-full h-full gap-4 p-5 pt-3 relative">
      {questionsToBeRendered?.map((question, index) => (
        <Fragment key={`fragment-${index + 1}`}>
          <Response question={question} index={index} />
        </Fragment>
      ))}

      {!questionsToBeRendered && (
        <p className="text-[#32636A] font-bold flex justify-center">
          There&apos;s an issue with fetching the data
        </p>
      )}

      <div className="min-h-16"></div>
    </div>
  );
}
