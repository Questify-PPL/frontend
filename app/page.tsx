import { Benefit, End, Hero } from "@/components/landing-page";
import { Footer, Navbar } from "@/components/header";
import { auth } from "@/auth";

export default async function Home() {
  const user = await auth();

  return (
    <>
      <Navbar user={user} />
      <main className="flex min-h-screen h-fit flex-col items-center px-2">
        <Hero />
        <Benefit />
        <End />
      </main>
      <Footer />
    </>
  );
}
