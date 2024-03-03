"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { redirectLogin } from "@/lib/services";

export function SSOButton({
  text,
  className,
  url,
  type,
  disabled,
}: Readonly<{
  text: string;
  className: string;
  url?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}>) {
  return (
    <Button
      className={className}
      variant={"outline"}
      data-testid="sso-login"
      type={type}
      disabled={disabled}
      onClick={
        url
          ? () => {
              redirectLogin(url);
            }
          : undefined
      }
    >
      {disabled && (
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
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <Image src={"/assets/UI Logo.png"} alt="UI" width={20} height={20} />
      <span className="text-primary font-bold md:text-base">{text}</span>
    </Button>
  );
}
