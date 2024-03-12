"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RespondCard from "@/components/respondent-side/RespondCard";
import RespondentNav from "@/components/respondent-side/RespondentNav";

export default function Join() {
  const [createCardState, setCreateCardState] = useState("hidden");

  const OpenCreateCard = () => {
    const newClass = createCardState === "hidden" ? "flex" : "hidden";
    setCreateCardState(newClass);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <RespondentNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></RespondentNav>
        <div className="flex flex-col w-full">
          <Button className="flex w-fit" onClick={OpenCreateCard}>
            Create a new Questionnaire
          </Button>
        </div>
      </div>
      <RespondCard
        className={`${createCardState}`}
        onCancel={OpenCreateCard}
      ></RespondCard>
    </main>
  );
}
