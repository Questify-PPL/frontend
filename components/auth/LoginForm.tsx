"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/action";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="md:max-w-[330px] mx-auto">
      <h2 className="sr-only">Login Form</h2>
      <p className="text-xs mb-4 text-center md:text-sm">
        Otherwise, just fill the <span className="font-bold">form</span> below!
      </p>
      <LoginFormControl errorMessage={errorMessage} />
    </form>
  );
}

function LoginFormControl({
  errorMessage,
}: Readonly<{
  errorMessage: string | undefined;
}>) {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="flex flex-col mb-4">
        <Label htmlFor="email" className="text-xs md:text-sm mb-2">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className={`rounded-[6px] border-[1px] border-solid text-xs ${errorMessage ? "border-destructive" : "border-[#CDDDE1]"}`}
          disabled={pending}
        />
      </div>
      <div className="flex flex-col mb-4">
        <Label htmlFor="password" className="text-xs md:text-sm mb-2">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={`rounded-[6px] border-[1px] border-solid text-xs ${errorMessage ? "border-destructive" : "border-[#CDDDE1]"}`}
          disabled={pending}
        />
        {errorMessage && (
          <span className="text-[#DA0A1E] text-xs font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="flex bg-primary text-white w-full text-xs font-bold px-[14px] md:text-sm  md:max-w-[330px] md:mx-auto mb-7 md:mb-8"
        disabled={pending}
        data-testid="login"
      >
        {pending && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Log In
      </Button>
    </>
  );
}
