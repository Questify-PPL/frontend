"use client";

import { authenticate } from "@/lib/action";
import Image from "next/image";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SSOForm({ accessToken }: Readonly<{ accessToken: string }>) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  return !errorMessage ? (
    <form action={dispatch} className="mx-auto">
      <h1 className="sr-only">SSO Form</h1>
      <Image
        src={"/assets/bouncing-circles.svg"}
        alt="Loading"
        width={100}
        height={100}
        className="block mx-auto mb-2"
      />
      <SSOTokenFormControl
        accessToken={accessToken}
        errorMessage={errorMessage}
      />
      <div className="text-center font-bold text-primary text-base md:text-xl">
        Loading your SSO information. Hang tight, we&#39;re working on it
      </div>
    </form>
  ) : (
    <main className="flex h-screen flex-col items-center justify-center text-base md:text-xl px-8 py-10 md:px-10">
      <p className="text-center font-bold text-primary text-base md:text-xl mb-4">
        {errorMessage}
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

function SSOTokenFormControl({
  accessToken,
  errorMessage,
}: Readonly<{
  accessToken: string;
  errorMessage: "Invalid credentials" | "Something went wrong" | undefined;
}>) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      (buttonRef.current as HTMLButtonElement).click();
    }
  }, []);

  return (
    <>
      <Label
        htmlFor="SSO"
        className="text-xs md:text-sm mb-2 hidden"
        data-testid="sso-label"
      >
        SSO
      </Label>
      <Input
        type="hidden"
        name="SSO"
        id="SSO"
        placeholder="SSO"
        className={`rounded-[6px] border-[1px] border-solid text-xs ${errorMessage ? "border-destructive" : "border-[#CDDDE1]"}`}
        readOnly={true}
        value={accessToken}
        data-testid="sso-input"
      />
      <button
        type="submit"
        className="hidden"
        ref={buttonRef}
        data-testid="sso-button"
      >
        Loading SSO Information
      </button>
    </>
  );
}
