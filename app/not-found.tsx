import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen h-fit flex-col items-center px-8 justify-center space-y-2 sm:space-y-4 -mt-12">
      <Image
        src={`/assets/questify-text.png`}
        alt="Questify"
        width={120}
        height={120}
      />
      <div className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center">
        Sorry, the page you are looking for is not found.
      </div>
    </main>
  );
}
