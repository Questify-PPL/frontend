import Navbar from "@/components/dashboard/Navbar";
import { auth } from "@/auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen relative">
      <header>
        <Navbar session={session} />
      </header>
      <main className="relative min-h-full flex-1">{children}</main>
    </div>
  );
}
