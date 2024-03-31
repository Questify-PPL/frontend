import { useMemo, useState } from "react";
import { ResponsesContext } from "../context";
import { BareForm } from "../types";
import Fuse from "fuse.js";

type ResponsesProviderProps = {
  children: React.ReactNode;
  forms: BareForm[];
};

export function ResponsesProvider({
  children,
  forms,
}: Readonly<ResponsesProviderProps>) {
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<"All" | "Ongoing" | "Ended">("All");

  const fuse = useMemo(
    () =>
      new Fuse(forms, {
        threshold: 0.1,
        keys: ["title", "prize", "questionAmount"],
        includeMatches: true,
      }),
    [forms]
  );

  const filteredForms = useMemo(() => {
    const formsFilteredTitle =
      title == "" ? forms : fuse.search(title).map((form) => form.item);

    if (tag === "All") {
      return formsFilteredTitle;
    }

    return formsFilteredTitle.filter((form) => {
      return form.isCompleted === (tag === "Ended");
    });
  }, [tag, title, fuse, forms]);

  const returns = useMemo(() => {
    return {
      tag,
      setTag,
      forms: filteredForms,
      title,
      setTitle,
    };
  }, [tag, title, filteredForms]);

  return (
    <ResponsesContext.Provider value={returns}>
      {children}
    </ResponsesContext.Provider>
  );
}
