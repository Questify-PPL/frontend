import { useToast } from "@/components/ui/use-toast";
import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";
import { unpublishQuestionnaire } from "../action/form";
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
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<"All" | "Ongoing" | "Ended">("All");
  const [statefulForms, setStatefulForms] = useState<BareForm[]>(forms);

  const [chosenFormId, setChosenFormId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(true);

  const { toast } = useToast();

  const onUnpublish = useCallback(async () => {
    console.log(isOpen);
    console.log(chosenFormId);
    if (!isOpen || !chosenFormId) return;

    setIsFinished(false);

    try {
      await unpublishQuestionnaire(chosenFormId);

      setStatefulForms((prev) => {
        return prev.filter((form) => form.id !== chosenFormId);
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }

    setIsOpen(false);
    setChosenFormId(null);
    setIsFinished(true);
  }, [toast, isOpen, chosenFormId]);

  const fuse = useMemo(
    () =>
      new Fuse(statefulForms, {
        threshold: 0.1,
        keys: ["title", "prize", "questionAmount"],
        includeMatches: true,
      }),
    [statefulForms],
  );

  const filteredForms = useMemo(() => {
    const formsFilteredTitle =
      title == "" ? statefulForms : fuse.search(title).map((form) => form.item);

    if (tag === "All") {
      return formsFilteredTitle;
    }

    return formsFilteredTitle.filter((form) => {
      return form.isCompleted === (tag === "Ended");
    });
  }, [tag, title, fuse, statefulForms]);

  const returns = useMemo(() => {
    return {
      tag,
      setTag,
      forms: filteredForms,
      title,
      setTitle,
      chosenFormId,
      setChosenFormId,
      isOpen,
      setIsOpen,
      onUnpublish,
      isFinished,
      setIsFinished,
    };
  }, [
    tag,
    title,
    filteredForms,
    isOpen,
    chosenFormId,
    onUnpublish,
    isFinished,
  ]);

  return (
    <ResponsesContext.Provider value={returns}>
      {children}
    </ResponsesContext.Provider>
  );
}
