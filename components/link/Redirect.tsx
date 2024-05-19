"use client";

import NotFoundPage from "@/app/not-found";
import { RedirectProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect({ response }: Readonly<RedirectProps>) {
  const router = useRouter();

  useEffect(() => {
    if (response.data) {
      router.push(`/questionnaire/join/${response.data}`);
    }
  }, [response, router]);

  if (!response.data) {
    return (
      <div data-testid="not-found">
        <NotFoundPage />
      </div>
    );
  }

  return null;
}
