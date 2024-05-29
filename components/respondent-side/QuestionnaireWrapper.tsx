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
    prizeType: "EVEN",
    winningChance: 10,
    prize: 2000,
    maxWinner: 1,
  });

  const openResponsCard = (
    id: string = "",
    title: string = "",
    prizeType: string = "",
    winningChance: number = 10,
    prize: number = 2000,
    maxWinner: number = 1,
  ) => {
    setRespondCardState((prevState) => ({
      ...prevState,
      visible: prevState.visible === "hidden" ? "flex" : "hidden",
      id: id,
      title: title,
      prizeType: prizeType,
      winningChance: winningChance,
      prize: prize,
      maxWinner: maxWinner,
    }));
  };
  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
        <RespondentNav state="action"></RespondentNav>
        <div className="flex flex-col w-full space-y-4 flex-1">
          <p className="text-[#32636A] text-[10px] font-medium">
            Here are your personalized questionnaire(s)
          </p>

          <InfoTable isRespondent={true}>
            {forms.map((form) => (
              <Fragment key={form.id}>
                <DraftMobile
                  form={form}
                  isRespondent={true}
                  isSendIcon={true}
                  onOpenRespondCard={() =>
                    openResponsCard(
                      form.id,
                      form.title,
                      form.prizeType,
                      form.winningChance,
                      form.prize,
                      form.maxWinner,
                    )
                  }
                ></DraftMobile>
                <TableContent
                  form={form}
                  isRespondent={true}
                  onOpenRespondCard={() =>
                    openResponsCard(
                      form.id,
                      form.title,
                      form.prizeType,
                      form.winningChance,
                      form.prize,
                      form.maxWinner,
                    )
                  }
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
        maxWinner={respondCardState.maxWinner}
        prize={respondCardState.prize}
        prizeType={respondCardState.prizeType}
        winningChance={respondCardState.winningChance}
        onCancel={() => openResponsCard()}
      />
    </main>
  );
}
