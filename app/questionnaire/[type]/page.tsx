import { SLText, Checkboxes, MultipleChoice, YesNo } from "@/components/questions";

interface Props {
  readonly params: {
    readonly type: string;
  };
}

export default function FirstComponentPage({ params }: Props) {
  const { type } = params;

  const renderComponent = () => {
    switch (type) {
      case "short-text":
        return <SLText type="short-text" />;
      case "long-text":
        return <SLText type="long-text" />;
      case "checkboxes":
        return <Checkboxes />;
      case "yesno":
        return <YesNo />;
      case "multiple-choice":
        return <MultipleChoice />;
    }
  };

  return (
    <main className="min-h-screen h-fit flex flex-col">
      {renderComponent()}
    </main>
  );
}
