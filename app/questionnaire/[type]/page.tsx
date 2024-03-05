import { ShortText } from "@/components/questionnaire";
import { Checkboxes } from "@/components/questions";
import { MultipleChoice } from "@/components/questions";
import { YesNo } from "@/components/questions";

interface Props {
  params: {
    type: string;
  };
}

export default function FirstComponentPage({ params }: Props) {
  const { type } = params;

  const renderComponent = () => {
    switch (type) {
      case "short-text":
        return <ShortText />;
      case "checkboxes":
        return <Checkboxes />;
      case "yesno":
        return <YesNo />;
      case "multiple-choice":
        return <MultipleChoice />;

      // case "long-text":
      //   return <LongText />;
      // case "checkbox":
      //   return <Checkbox />;
    }
  };

  return (
    <main className="min-h-screen h-fit flex flex-col">
      {renderComponent()}
    </main>
  );
}
