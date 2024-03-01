"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { redirectLogin } from "@/lib/services";

export function SSOButton() {
  return (
    <Button
      className="flex flex-row gap-2 border-primary xs:w-3/5 border-[1px] border-solid flex-wrap h-fit w-fit"
      variant={"outline"}
      onClick={() => {
        redirectLogin("/register");
      }}
    >
      <Image src={"/assets/UI Logo.png"} alt="UI" width={20} height={20} />
      <span>Sign Up using SSO</span>
    </Button>
  );
}
