"use client";

import { Session } from "next-auth";
import { BackAndExport } from "./BackAndExport";
import { exportForm } from "@/lib/helper";

export default function TertiaryNavbar({
  formTitle,
  session,
  formId,
}: Readonly<{ formTitle: string; session: Session; formId: string }>) {
  async function exportData() {
    if (session.user.activeRole !== "CREATOR") return;
    if (!session?.user?.accessToken) return;

    await exportForm(formId, session.user.accessToken, formTitle);
  }

  return (
    <div className="flex w-full px-5 py-[10px] gap-3 flex-col justify-center bg-[#E5EEF0] md:hidden">
      <BackAndExport
        onExport={exportData}
        canExport={session.user.activeRole == "CREATOR"}
      />
      {formTitle ? (
        <h3 className="text-[#32636A] text-[14px] font-semibold text-center text-wrap w-full leading-normal">
          {formTitle}
        </h3>
      ) : (
        <h3 className="text-[#32636A] text-[14px] font-semibold text-center text-wrap w-full leading-normal">
          Failed to load title
        </h3>
      )}
    </div>
  );
}
