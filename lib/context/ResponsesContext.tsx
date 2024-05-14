"use client";

import { createContext, useContext } from "react";
import { BareForm } from "../types";

export type ResponsesContextValue = {
  tag: "All" | "Ongoing" | "Ended";
  setTag: React.Dispatch<React.SetStateAction<"All" | "Ongoing" | "Ended">>;
  forms: BareForm[];
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const ResponsesContext = createContext({} as ResponsesContextValue);

export function useResponsesContext() {
  const context = useContext(ResponsesContext);

  if (!context) {
    throw new Error(
      "useResponsesContext must be used within a ResponsesProvider",
    );
  }

  return context;
}
