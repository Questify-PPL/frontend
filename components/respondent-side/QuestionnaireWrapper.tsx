"use client";

import { FormsAsProps } from "@/lib/types";
import { Fragment, useState } from "react";
import { DraftMobile, InfoTable, TableContent } from "../forms";
import RespondentNav from "./RespondentNav";
import RespondCard from "./join/RespondCard";

export function QuestionnaireWrapper({ forms }: Readonly<FormsAsProps>) {
  const [respondCardState, setRespondCardState] = useState({
    visible: "hidden",
    id: "",
    title: "",
  });

  const openResponsCard = (id: string = "", title: string = "") => {
    setRespondCardState((prevState) => ({
      ...prevState,
      visible: prevState.visible === "hidden" ? "flex" : "hidden",
      id: id,
      title: title,
    }));
  };
  return (
    <main className="flex flex-col h-screen w-full">
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
                  onOpenRespondCard={openResponsCard}
                ></DraftMobile>
                <TableContent
                  form={form}
                  isRespondent={true}
                  onOpenRespondCard={openResponsCard}
                />
              </Fragment>
            ))}
          </InfoTable>
        </div>
      </div>
      <RespondCard
        className={respondCardState.visible}
        id={respondCardState.id}
        title={respondCardState.title}
        onCancel={() => openResponsCard()}
      />
    </main>
  );
}
