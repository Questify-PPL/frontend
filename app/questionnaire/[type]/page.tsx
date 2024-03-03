import { ShortText } from "@/components/questionnaire";

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
