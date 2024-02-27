import React from "react";
import ClickEnter from "@/components/ui/click-enter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function UserInfo() {
  const backgroundImageUrl = "/assets/user-info-bg.png";
  return (
    <main
      className="flex bg-cover bg-center h-screen w-screen justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Card className="flex flex-col w-[50%] h-[90%]">
        <div className="flex flex-col bg-secondary h-[15%] justify-center font-semibold text-xl p-6 gap-1 rounded-t-md">
          <div>User Additional Information</div>
          <Image
            src="/assets/Questify.svg"
            alt="Questify"
            width={70}
            height={16}
          />
        </div>
        <div className="flex flex-col h-full justify-center items-center font-medium text-xl px-24 py-14 gap-8 rounded-t-md">
            <div className="text-base text-primary">Opening</div>
            <div className="text-xl">Greetings! Welcome to Questify. Let&apos;s get you set up swiftly; it&apos;ll only take a few seconds to ensure you&apos;re ready to go.</div>
            <div className="w-[45%] flex flex-col gap-1">
                <ClickEnter></ClickEnter>
                <Button>
                    Start
                </Button>
            </div>
        </div>        
      </Card>
    </main>
  );
}
