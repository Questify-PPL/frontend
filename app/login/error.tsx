"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const router = useRouter();

  return (
    <main className="flex h-screen flex-col items-center justify-center text-base md:text-xl px-8 py-10 md:px-10">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-center font-bold text-primary text-base md:text-xl mb-4">
        {error.message}
      </p>
      <Button
        type="submit"
        className="flex bg-primary text-white w-full text-xs font-bold px-[14px] md:text-sm  max-w-[330px] md:mx-auto mb-7 md:mb-8"
        data-testid="reset"
        onClick={() => router.replace("/")}
      >
        Return to Homepage
      </Button>
    </main>
  );
}
