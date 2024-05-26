"use client";

import { FormsAsProps } from "@/lib/types";
import CreatorNav from "../CreatorNav";
import { ResponsesProvider } from "@/lib/provider";
import { FilterSection } from "./FilterSection";
import { ResponsesHeader } from "./ResponsesHeader";
import { ResponsesBody } from "./ResponsesBody";
import { UnpublishConfirmationModal } from "./UnpublishConfirmationModal";

export function ResponseWrapper({ forms }: Readonly<FormsAsProps>) {
  return (
    <ResponsesProvider forms={forms}>
      <div
        className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative"
        data-testid="response-wrapper"
      >
        <CreatorNav state="responses"></CreatorNav>
        <div className="flex flex-col w-full space-y-4 flex-1">
          <FilterSection />
          <ResponsesHeader>
            <ResponsesBody />
          </ResponsesHeader>
        </div>

        <UnpublishConfirmationModal />
      </div>
    </ResponsesProvider>
  );
}
