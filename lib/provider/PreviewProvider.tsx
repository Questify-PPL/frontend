import { useMemo, useState } from "react";
import { PreviewContext } from "../context/PreviewContext";
import { QuestionnaireCreator } from "../types";

type PreviewProviderProps = {
  children: React.ReactNode;
  form: QuestionnaireCreator;
};

export function PreviewProvider({
  children,
  form,
}: Readonly<PreviewProviderProps>) {
  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireCreator>(form);

  const returns = useMemo(() => {
    return {
      questionnaire,
      setQuestionnaire,
    };
  }, [questionnaire]);

  return (
    <PreviewContext.Provider value={returns}>
      {children}
    </PreviewContext.Provider>
  );
}
