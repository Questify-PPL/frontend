"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuCheckCircle, LuX } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { postParticipation } from "@/lib/action/form";

// ...

interface RespondCardProps {
  className?: string;
  formsRemainder?: number;
  creditsBalance?: number;
  onCancel?: () => void;
  id?: string;
  title?: string;
}

const RespondCard: React.FC<RespondCardProps> = ({
  className = "",
  onCancel = () => {},
  id,
  title,
}) => {
  const router = useRouter();

  const toForm = async () => {
    try {
      await postParticipation(id ?? "");
      router.push(`questionnaire/join/${id}`);
    } catch (error) {
      console.log("Failed to participate in forms", { duration: 5000 });
    }
  };

  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
    >
      <Card className="flex flex-col p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2"></div>
          <LuX className="w-5 h-5" onClick={onCancel} aria-label="Cancel"></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">
              Respond a Questionnaire
            </span>
            <span className="flex font-regular text-sm text-primary/40">
              See the details about this questionnaire
            </span>
          </div>
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">Title</h3>
            <p className="text-sm font-semibold">{title || "Default Title"}</p>
            <h3 className="text-lg font-semibold mt-4">Prize</h3>
            <div className="section bg-purple-100 p-1 pb-2 mb-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center mt-2">
                <LuCheckCircle className="h-5 w-5 text-purple-500 " />
                <p className="ml-2 text-sm font-bold">10% winning chance</p>
              </div>
            </div>
            <div className="section bg-yellow-100 p-1 pb-2 mb-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center mt-2">
                <LuCheckCircle className="h-5 w-5 text-yellow-500" />
                <p className="ml-2 text-sm font-bold">
                  2.000 for each respondent
                </p>
              </div>
            </div>

            <div className="section mt-4 rounded-lg">
              <p className="font-bold">Estimated Time</p>
              <p className="text-sm font-semibold">8 Minutes</p>
            </div>
            <div className="section mt-4 rounded-lg">
              <p className="font-bold mb-1">
                Creator will collect these data from you:
              </p>
              <div className="flex items-center">
                <div className="flex items-center">
                  <LuCheckCircle className="rounded-full mr-2"></LuCheckCircle>
                  <p className="font-semibold text-sm">First Name</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <LuCheckCircle className="rounded-full mr-2"></LuCheckCircle>
                  <p className="font-semibold text-sm">Last Name</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <LuCheckCircle className="rounded-full mr-2"></LuCheckCircle>
                  <p className="font-semibold text-sm">Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="flex font-regular text-sm text-primary/40">
            If you are OK with the details, let&apos;s get started!
          </span>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button className="w-full" onClick={toForm}>
            Respond
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RespondCard;
