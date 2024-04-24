import { useCallback, useMemo, useState } from "react";
import { SummaryContext } from "../context/SummaryContext";
import { QuestionDetailResponse, SummarizeFormAsProps } from "../types";
import { convertToCSV } from "../utils";
import { useToast } from "@/components/ui/use-toast";
import { URL as fetchURL } from "../constant";
import { exportForm } from "../helper";

type SummaryProviderProps = {
  children: React.ReactNode;
} & SummarizeFormAsProps;

export function SummaryProvider({
  children,
  formStatistics,
  questionsWithAnswers,
  allIndividuals,
  formId,
  session,
}: Readonly<SummaryProviderProps>) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "question" | "individual"
  >("summary");
  const { toast } = useToast();
  const [graphType, setGraphType] = useState<"bar" | "pie">("pie");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFinishedFetching, setIsFinishedFetching] = useState(false);
  const [individualFormQuestions, setIndividualFormQuestions] = useState<
    QuestionDetailResponse | undefined
  >(undefined);

  const exportData = useCallback(async () => {
    if (!session?.user?.accessToken || !formStatistics) return;

    setIsFinishedFetching(true);

    await exportForm(
      formId,
      session.user.accessToken,
      formStatistics.title,
      () => {
        toast({
          title: "Failed to export data",
          description: "Please try again later",
          variant: "destructive",
        });
      },
    );

    setIsFinishedFetching(false);
  }, [formStatistics, formId, session?.user?.accessToken, toast]);

  const returns = useMemo(() => {
    return {
      formStatistics,
      questionsWithAnswers,
      allIndividuals,
      graphType,
      setGraphType,
      activeTab,
      setActiveTab,
      currentPage,
      setCurrentPage,
      questionDetails: questionsWithAnswers
        ? questionsWithAnswers[currentPage - 1]
        : undefined,

      isFinishedFetching,
      setIsFinishedFetching,
      formId,
      session,
      exportData,
    };
  }, [
    formStatistics,
    questionsWithAnswers,
    allIndividuals,
    graphType,
    activeTab,
    currentPage,
    isFinishedFetching,
    formId,
    session,
    exportData,
  ]);

  return (
    <SummaryContext.Provider value={returns}>
      {children}
    </SummaryContext.Provider>
  );
}
