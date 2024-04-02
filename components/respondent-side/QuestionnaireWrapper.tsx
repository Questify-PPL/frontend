"use client";

import { FormsAsProps } from "@/lib/types";
import { Fragment } from "react";
import { DraftMobile, InfoTable, TableContent } from "../forms";
import RespondentNav from "./RespondentNav";

export function QuestionnaireWrapper({ forms }: Readonly<FormsAsProps>) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
      <RespondentNav state="action"></RespondentNav>
      <div className="flex flex-col w-full space-y-4 flex-1">
        <p className="text-[#32636A] text-[10px] font-medium">
          Here are your active questionnaire(s)
        </p>

        <InfoTable isRespondent={true}>
          {forms.map((form) => (
            <Fragment key={form.id}>
              <DraftMobile
                form={form}
                isRespondent={true}
                isSendIcon={true}
              ></DraftMobile>
              <TableContent form={form} isRespondent={true} />
            </Fragment>
          ))}
        </InfoTable>
      </div>
    </div>
  );
}
