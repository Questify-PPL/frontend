import { createContext, useContext } from "react";
import { SummarizeFormAsProps } from "../types";

export type SummaryContextValue = SummarizeFormAsProps & {
  graphType: "bar" | "pie";
  setGraphType: (type: "bar" | "pie") => void;
};

export const SummaryContext = createContext({} as SummaryContextValue);

export function useSummaryContext() {
  const context = useContext(SummaryContext);

  if (!context) {
    throw new Error("useSummaryContext must be used within a SummaryProvider");
  }

  return context;
}
