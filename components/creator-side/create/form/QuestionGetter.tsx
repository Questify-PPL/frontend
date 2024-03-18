"use client";

import { getQuestionnaire } from "@/lib/action/form";
import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import { useEffect } from "react";

const transformData = (questions: any[]) => {
  const sectionMap = new Map();
  const defaultQuestions: { type: string; question: any }[] = [];

  questions.forEach((question) => {
    if (question.sectionId != null) {
      if (!sectionMap.has(question.sectionId)) {
        sectionMap.set(question.sectionId, {
          type: "SECTION",
          sectionId: question.sectionId,
          sectionName: "", // Change this so that can get section name from BE
          sectionDescription: "", // Change this so that can get section description from BE
          questions: [],
        });
      }
      sectionMap.get(question.sectionId).questions.push(question);
    } else {
      defaultQuestions.push({
        type: "DEFAULT",
        question,
      });
    }
  });

  return Array.from(sectionMap.values()).concat(defaultQuestions);
};

export default function QuestionGetter({ id }: { id: string }) {
  const { setQuestionnaire } = useQuestionnaireContext();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await getQuestionnaire(id);
        const transformed = transformData(response.data.questions);
        setQuestionnaire(transformed);
        console.log(transformed);
      } catch (error) {
        console.error("Failed to get questionnaire", error);
      }
    };

    fetchQuestionnaire();
  }, [id, setQuestionnaire]);

  return <div data-testid="question-getter"></div>;
}
