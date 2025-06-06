"use client";

import CreatorNav from "@/components/creator-side/CreatorNav";
import CreateModal from "@/components/creator-side/create/CreateModal";
import { DraftMobile, InfoTable } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import { DraftContent } from "./DraftContent";
import { FormsAsProps } from "@/lib/types";
import { Session } from "next-auth";

export function CreateWrapper({
  forms,
  session,
}: Readonly<
  FormsAsProps & {
    session: Session;
  }
>) {
  const [statefulForms, setStatefulForms] = useState(forms);
  const [createModalState, setCreateModalState] = useState("hidden");

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
          <InfoTable>
            {statefulForms.map((form) => (
              <Fragment key={form.id}>
                <DraftMobile form={form} key={form.id} />
                <DraftContent
                  form={form}
                  onDeleteCallback={() => {
                    setStatefulForms(
                      statefulForms.filter((f) => f.id !== form.id),
                    );
                  }}
                />
              </Fragment>
            ))}
          </InfoTable>
        </div>
      </div>
      <CreateModal
        className={`${createModalState}`}
        onCancel={OpenCreateModal}
        formsRemainder={session.user.Creator?.emptyForms}
        creditsBalance={session.user.credit}
      ></CreateModal>
    </>
  );
}
