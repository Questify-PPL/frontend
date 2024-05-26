import { PreviewView } from "@/components/creator-side/create/form/preview/PreviewView";
import { getQuestionnaire } from "@/lib/action/form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  return await fetchQuestionnaire(id, true);
}

export default async function Preview({ params }: Readonly<Props>) {
  const { id } = params;

  const form = await fetchQuestionnaire(id);

  return <PreviewView form={form} />;
}

async function fetchQuestionnaire(id: string, isMetadata = false) {
  try {
    const response = await getQuestionnaire(id);

    if (!isMetadata) {
      return response.data;
    }

    const title = response.data.title ?? "";

    return {
      title: title,
      description: "Questify - Preview Page",
    };
  } catch (error) {
    notFound();
  }
}
