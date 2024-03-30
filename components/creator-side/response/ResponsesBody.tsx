import { useResponsesContext } from "@/lib/context";
import { ResponseDesktop } from "./ResponseDesktop";
import { Fragment } from "react";

export function ResponsesBody() {
  const { forms } = useResponsesContext();

  return (
    <>
      {forms.map((form) => (
        <Fragment key={form.id}>
          <ResponseDesktop form={form} />
        </Fragment>
      ))}
    </>
  );
}
