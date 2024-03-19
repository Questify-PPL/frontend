"use client";

import { FormsAsProps } from "@/lib/types";
import RespondentNav from "./RespondentNav";
import { useMediaQuery } from "@/lib/hooks";
import { DraftMobile, InfoTable, TableContent } from "../forms";

export function QuestionnaireWrapper({ forms }: Readonly<FormsAsProps>) {
  const isMobile = useMediaQuery(768);

  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
      <RespondentNav state="action"></RespondentNav>
      <div className="flex flex-col w-full space-y-4 flex-1">
        <p className="text-[#32636A] text-[10px] font-medium">
          Here are your active questionnaire(s)
        </p>
        {isMobile ? (
          <>
            {forms.map((form) => {
              return (
                <DraftMobile
                  form={form}
                  key={form.id}
                  isRespondent={true}
                  isSendIcon={true}
                ></DraftMobile>
              );
            })}
          </>
        ) : (
          <InfoTable isRespondent={true}>
            {forms.map((form) => (
              <TableContent key={form.id} form={form} isRespondent={true} />
            ))}
          </InfoTable>
        )}
      </div>
    </div>
  );
}
