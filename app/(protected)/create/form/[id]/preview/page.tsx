import { getQuestionnaireRespondent } from "@/lib/action/form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  try {
    const form = await getQuestionnaireRespondent(id);

    const title = form.data.title ?? "";

    return {
      title: title,
      description: "Questify - Preview Page",
    };
  } catch (error) {
    notFound();
  }
}

export default async function Preview({ params }: Readonly<Props>) {
  return <div>{params.id}</div>;
}
