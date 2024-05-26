"use client";

import { PreviewProvider } from "@/lib/provider/PreviewProvider";
import { QuestionnaireCreator } from "@/lib/types";
import { PreviewLogic } from "./PreviewLogic";

export function PreviewView({
  form,
}: Readonly<{ form: QuestionnaireCreator }>) {
  return (
    <PreviewProvider form={form}>
      <div
        className="flex w-full min-h-screen items-center justify-center"
        data-testid="form-wrapper"
      >
        <PreviewLogic />
      </div>
    </PreviewProvider>
  );
}
