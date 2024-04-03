import { auth } from "@/auth";
import { HelpWrapper } from "@/components/help";
import { Session } from "next-auth";

export default async function Help() {
  const { user } = (await auth()) as Session;

  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center">
      <HelpWrapper user={user} />
    </main>
  );
}
