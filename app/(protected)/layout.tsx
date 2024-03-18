import Navbar from "@/components/dashboard/Navbar";
import { auth } from "@/auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <header>
        <Navbar session={session} />
      </header>
      <main className="relative">{children}</main>
    </div>
  );
}
