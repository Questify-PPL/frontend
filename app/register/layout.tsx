import { TriviaForm } from "@/components/auth/TriviaForm";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center h-full min-h-fit">
      <div className="flex flex-col px-[20px] md:w-fit w-full py-[30px] md:py-[190px] md:min-h-screen self-stretch items-center justify-center md:px-[48px] bg-register-pattern bg-cover bg-no-repeat">
        <TriviaForm />
      </div>
      {children}
    </section>
  );
}
