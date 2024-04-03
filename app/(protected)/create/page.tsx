import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";

export default async function Create() {
  return (
    <section className="flex flex-col h-full w-full absolute">
      <CreateWrapper />
    </section>
  );
}
