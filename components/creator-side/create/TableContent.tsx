"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins } from "react-icons/lu";

export function TableContent({ form }: Readonly<FormAsProps>) {
  function caluculatePercentage() {
    return (
      (form.completedParticipation / form.ongoingParticipation +
        form.completedParticipation) *
      100
    );
  }

  const router = useRouter();

  function toEdit() {
    router.push(`/create/form/${form.id}`);
  }

  return (
    <div
      className="flex w-full p-3 hover:bg-[#F3F8F9]/30 rounded-md cursor-pointer"
      onClick={toEdit}
      role="none"
    >
      <div className="w-3/5 flex flex-row gap-3">
        <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white mt-2">
          {decidePhoto(form)}
        </div>

        <div className="flex flex-col mb-1 flex-1">
          <div className="text-xs text-teal-900">
            Created on {new Date(form.createdAt).toDateString()}
          </div>

          <div className="text-l text-wrap w-full font-bold ">{form.title}</div>
        </div>
      </div>

      <div className="flex flex-col mb-1 mt-2 w-1/5">
        <div className="flex flex-row w-full">
          <div className="flex flex-row text-xs font-bold text-[#685B2D]">
            <LuCoins className="mr-1 text-[#E2B720]"></LuCoins>
            {form.prize}
          </div>
          <div className="ml-1 flex flex-row text-xs font-medium text-[#685B2D]">
            for
          </div>
        </div>
        <div className="flex flex-row text-xs font-medium text-[#685B2D]">
          {form.prizeType === "EVEN"
            ? "all participants"
            : `${form.maxWinner} lucky respondents`}
        </div>
      </div>

      <div className="flex flex-col py-2 w-1/5 font-bold items-center">30</div>

      <div className="flex flex-col py-2 w-1/5 font-bold items-center">
        {form.completedParticipation}
      </div>

      <div className="flex flex-col py-2 w-1/5 font-bold items-center">
        {isNaN(caluculatePercentage()) ? 0 : caluculatePercentage().toFixed(2)}%
      </div>

      <div className="flex flex-col py-2 w-1/5 items-center font-bold">
        {new Date(form.updatedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
