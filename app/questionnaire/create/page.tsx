"use client";

import React from "react";
import { Questionnaire } from "@/components/questions";
import { QuestionnaireProvider } from "@/lib/provider/QuestionnaireProvider";

export default function CreateQuestionnaire() {
  return (
    <main
      className="min-h-screen h-fit flex flex-col"
      data-testid="create-questionnaire"
    >
      <QuestionnaireProvider>
        <Questionnaire></Questionnaire>
      </QuestionnaireProvider>
    </main>
  );
}
