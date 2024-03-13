"use client";

import React, { useState } from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import CreateCard from "@/components/creator-side/create/CreateCard";
import { Button } from "@/components/ui/button";
import { InfoTable } from "@/components/creator-side/InfoTable";
import { BareForm } from "@/lib/types/form.type";
import { TableContent } from "../TableContent";

interface CreateWrapperProps {
  forms: BareForm[];
}

export function CreateWrapper({ forms }: Readonly<CreateWrapperProps>) {
  const [createCardState, setCreateCardState] = useState("hidden");

  const OpenCreateCard = () => {
    const newClass = createCardState === "hidden" ? "flex" : "hidden";
    setCreateCardState(newClass);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></CreatorNav>
        <div className="flex flex-col w-full space-y-4">
          <Button className="flex w-fit" onClick={OpenCreateCard}>
            Create a new Questionnaire
          </Button>
          <InfoTable />
          {forms.map((form) => (
            <TableContent key={form.id} form={form} />
          ))}
        </div>
      </div>
      <CreateCard
        className={`${createCardState}`}
        onCancel={OpenCreateCard}
      ></CreateCard>
    </main>
  );
}
