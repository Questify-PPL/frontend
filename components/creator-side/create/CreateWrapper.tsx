"use client";

import CreatorNav from "@/components/creator-side/CreatorNav";
import CreateModal from "@/components/creator-side/create/CreateModal";
import { DraftMobile, InfoTable, TableContent } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks";
import { FormsAsProps } from "@/lib/types";
import { useState } from "react";

export function CreateWrapper({ forms }: Readonly<FormsAsProps>) {
  const [createModalState, setCreateModalState] = useState("hidden");
  const isMobile = useMediaQuery(768);

  const OpenCreateModal = () => {
    const newClass = createModalState === "hidden" ? "flex" : "hidden";
    setCreateModalState(newClass);
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row w-full h-full gap-4 p-5 relative"
        data-testid="table-content"
      >
        <CreatorNav state="action"></CreatorNav>
        <div className="flex flex-col w-full space-y-4 flex-1">
          <Button className="flex md:w-fit w-full" onClick={OpenCreateModal}>
            Create a new Questionnaire
          </Button>
          <p className="text-[#32636A] text-[10px] font-medium">Drafts</p>
          {isMobile ? (
            <>
              {forms.map((form) => {
                return <DraftMobile form={form} key={form.id}></DraftMobile>;
              })}
            </>
          ) : (
            <InfoTable>
              {forms.map((form) => (
                <TableContent key={form.id} form={form} />
              ))}
            </InfoTable>
          )}
        </div>
      </div>
      <CreateModal
        className={`${createModalState}`}
        onCancel={OpenCreateModal}
      ></CreateModal>
    </>
  );
}
