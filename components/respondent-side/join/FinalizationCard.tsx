"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideClipboardCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuCheckCircle, LuX } from "react-icons/lu";

interface FinalizationCardProps {
  className?: string;
  winningChance?: number;
  prizeType?: string;
  QRETitle?: string;
  prize?: number;
  maxWinner?: number;

  onCancel?: () => void;
}

const FinalizationCard: React.FC<FinalizationCardProps> = ({
  className = "",
  QRETitle = "",
  prizeType = "",
  winningChance = 0,
  prize = 0,
  maxWinner = 0,
  onCancel = () => {},
}) => {
  // const [inputValue, setInputValue] = useState<string>(
  //   "Initial Questionnaire Title",
  // );

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };
  const router = useRouter();

  const toForm = () => {
    router.push("../");
    router.refresh();
  };

  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      data-testid="finalization-modal"
    >
      <Card className="flex flex-col p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2"></div>
          <LuX className="w-5 h-5" onClick={onCancel}></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="text-center">
            <LucideClipboardCheck className="h-16 w-16 text-[#32636A] mx-auto" />
            <h2 className="text-xl font-bold mt-4">Done and Dusted</h2>
            <p className="text-gray-600">Thank you for your participation!</p>
          </div>
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">Title</h3>
            <p className="text-sm font-semibold">
              {QRETitle || "Default Title"}
            </p>
            <h3 className="text-lg font-semibold mt-4">Prize</h3>
            <div className="section bg-purple-100 p-1 pb-2 mb-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center mt-2">
                <LuCheckCircle className="h-5 w-5 text-purple-500 " />
                <p className="ml-2 text-sm font-bold">
                  {parseFloat(Number(winningChance).toFixed(2))
                    .toString()
                    .replace(".", ",")}
                </p>
                <div>%</div>
              </div>
            </div>
            <div className="section bg-yellow-100 p-1 pb-2 mb-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center mt-2">
                <LuCheckCircle className="h-5 w-5 text-yellow-500" />
                <p className="ml-2 text-sm font-bold">
                  {prizeType === "EVEN"
                    ? `${prize} for each respondent`
                    : maxWinner === 1
                      ? `${prize} for ${maxWinner} lucky respondent`
                      : `${prize} for ${maxWinner} lucky respondents`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full gap-3">
          <Button
            className="w-full"
            onClick={toForm}
            data-testid="submit-participation"
          >
            OK
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FinalizationCard;
