import { Benefit, End, Hero } from "@/components/landing-page";
import { Footer, Navbar } from "@/components/header";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen h-fit flex-col items-center px-2">
        <Hero />
        <Benefit />
        <End />
      </main>
      <Footer />
    </>
  );
}
