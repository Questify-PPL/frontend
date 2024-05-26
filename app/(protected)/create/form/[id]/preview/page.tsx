import { PreviewView } from "@/components/creator-side/create/form/preview/PreviewView";
import { getQuestionnaire } from "@/lib/action/form";
import { PreviewProvider } from "@/lib/provider/PreviewProvider";
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
    const form = await getQuestionnaire(id);

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
  const { id } = params;

  const form = await fetchQuestionnaire();

  async function fetchQuestionnaire() {
    const response = await getQuestionnaire(id);

    return response.data;
  }

  return (
    <PreviewProvider form={form}>
      <PreviewView />
    </PreviewProvider>
  );
}
