"use client";

import { useEffect, useState } from "react";
import NotFoundPage from "@/app/not-found";
import QuestionnaireJoinWrapper from "@/components/respondent-side/join/QuestionnaireJoinWrapper";
import { getQuestionnaireRespondent } from "@/lib/action/form";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  try {
    const form = await getQuestionnaireRespondent(id);

    const title = form.data.title ?? "";

    return {
      title: title,
      description: "Questify - Fill Page",
    };
  } catch (error) {
    notFound();
  }
}

const JoinForm = ({ params }: Props) => {
  const { id } = params;
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await getQuestionnaireRespondent(id);
        if (response.statusCode !== 200) {
          throw new Error("Failed to get questionnaire as respondent");
        }
      } catch (error) {
        setIsValid(false);
      }
    };

    fetchQuestionnaire();
  }, [id]);

  if (!isValid) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex h-full w-full absolute">
      <QuestionnaireProvider>
        <QuestionnaireJoinWrapper id={id} />
      </QuestionnaireProvider>
    </div>
  );
};

export default JoinForm;
