"use client";

import CreatorNav from "@/components/creator-side/CreatorNav";
import HomeCard from "@/components/creator-side/HomeCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ActiveQuestionnaireList } from "./ActiveQuestionnaireList";

export function CreatorHomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full absolute">
      <div className="absolute block md:hidden w-full h-[170px] bg-[#E5EEF0] flex-shrink-0"></div>
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <div className="flex flex-col md:hidden font-semibold text-[10px] items-center gap-2">
          <div className="flex flex-col font-semibold text-[10px] items-center">
            <div className="flex flex-row gap-1">
              Since you use{" "}
              <Image
                src="/assets/Questify.svg"
                alt="Questify SVG"
                width={43.317}
                height={10}
                className="cursor-pointer"
                onClick={() => {
                  router.push("/create");
                }}
              />
            </div>
            <div className="flex flex-row gap-1">
              You&apos;ve created 22 Questionnaire (QRE)!
            </div>
          </div>
          <Button
            onClick={() => {
              router.push("/create");
            }}
          >
            Create Questionnaire
          </Button>
        </div>
        <CreatorNav className="" state="home"></CreatorNav>
        <div className="flex flex-col w-full flex-1">
          <HomeCard className="w-full"></HomeCard>

          <ActiveQuestionnaireList />
        </div>
      </div>
    </div>
  );
}
