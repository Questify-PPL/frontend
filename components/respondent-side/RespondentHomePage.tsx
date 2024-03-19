"use client";

import { FormsAsProps } from "@/lib/types";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Button } from "../ui/button";
import RespondentNav from "./RespondentNav";
import { useMediaQuery } from "@/lib/hooks";
import { DraftMobile, InfoTable, TableContent } from "../forms";
import HomeCard from "../forms/HomeCard";

export default function RespondentHomePage({
  forms,
  isRespondent,
}: Readonly<
  FormsAsProps & {
    isRespondent: boolean;
  }
>) {
  const router = useRouter();
  const isMobile = useMediaQuery(768);

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
              You&apos;ve responded 22 Questionnaire (QRE)!
            </div>
          </div>
          <Button
            onClick={() => {
              router.push("/questionnaire");
            }}
          >
            Search For Questionnaires
          </Button>
        </div>
        <RespondentNav className="" state="home"></RespondentNav>

        <div className="flex flex-col w-full flex-1">
          <HomeCard className="w-full" isRespondent={isRespondent}></HomeCard>

          {forms && forms.length !== 0 && (
            <>
              <div className="text-[#32636A] text-[10px] font-semibold my-4">
                Here are your on-going answered questionnaire(s)
              </div>
              {isMobile ? (
                <>
                  {forms.map((form) => {
                    return (
                      <DraftMobile
                        form={form}
                        key={form.id}
                        isRespondent={isRespondent}
                      ></DraftMobile>
                    );
                  })}
                </>
              ) : (
                <InfoTable isRespondent={isRespondent}>
                  {forms.map((form) => (
                    <TableContent
                      key={form.id}
                      form={form}
                      isRespondent={isRespondent}
                    />
                  ))}
                </InfoTable>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
