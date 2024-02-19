import { Benefit, End, Hero } from "@/components/landing-page";

export default function Home() {
  return (
    <main className="flex min-h-screen h-fit flex-col items-center px-2">
      <Hero />
      <Benefit />
      <End />
    </main>
  );
}
