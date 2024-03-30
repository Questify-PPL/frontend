import { useState } from "react";
import { ResponsesContext } from "../context";
import { BareForm } from "../types";

type ResponsesProviderProps = {
  children: React.ReactNode;
  forms: BareForm[];
};

export function ResponsesProvider({
  children,
  forms,
}: Readonly<ResponsesProviderProps>) {
  const [tag, setTags] = useState<"All" | "Ongoing" | "Ended">("All");

  console.log(forms);

  return (
    <ResponsesContext.Provider
      value={{
        tag,
        setTags,
        forms,
      }}
    >
      {children}
    </ResponsesContext.Provider>
  );
}
