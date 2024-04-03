"use client";

import { FormsAsProps } from "@/lib/types";
import CreatorNav from "../CreatorNav";
import { ResponsesProvider } from "@/lib/provider";
import { FilterSection } from "./FilterSection";
import { ResponsesHeader } from "./ResponsesHeader";
import { ResponsesBody } from "./ResponsesBody";

export function ResponseWrapper({ forms }: Readonly<FormsAsProps>) {
  return (
    <div
      className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative"
      data-testid="response-wrapper"
    >
      <CreatorNav state="responses"></CreatorNav>
      <div className="flex flex-col w-full space-y-4 flex-1">
        <ResponsesProvider forms={forms}>
          <FilterSection />
          <ResponsesHeader>
            <ResponsesBody />
          </ResponsesHeader>
        </ResponsesProvider>
      </div>
    </div>
  );
}
