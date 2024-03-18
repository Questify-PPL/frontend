"use client";

import React, { useState } from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import CreateModal from "@/components/creator-side/create/CreateModal";
import { Button } from "@/components/ui/button";
import { InfoTable } from "@/components/creator-side/InfoTable";
import { BareForm } from "@/lib/types/form.type";
import { TableContent } from "../TableContent";

interface CreateWrapperProps {
  forms: BareForm[];
}

export function CreateWrapper({ forms }: Readonly<CreateWrapperProps>) {
  const [createModalState, setCreateModalState] = useState("hidden");

  const OpenCreateModal = () => {
    const newClass = createModalState === "hidden" ? "flex" : "hidden";
    setCreateModalState(newClass);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></CreatorNav>
        <div className="flex flex-col w-full space-y-4">
          <Button className="flex w-fit" onClick={OpenCreateModal}>
            Create a new Questionnaire
          </Button>
          <InfoTable />
          {forms.map((form) => (
            <TableContent key={form.id} form={form} />
          ))}
        </div>
      </div>
      <CreateModal
        className={`${createModalState}`}
        onCancel={OpenCreateModal}
      ></CreateModal>
    </main>
  );
}
