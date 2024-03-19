"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuMoreHorizontal } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function TableContent({
  form,
  isRespondent = false,
}: Readonly<
  FormAsProps & {
    isRespondent?: boolean;
  }
>) {
  const router = useRouter();

  function toEdit() {
    router.push(`/create/form/${form.id}`);
  }

  return (
    <tr
      className="flex w-full p-3 hover:bg-[#F3F8F9]/30 rounded-md cursor-pointer"
      onClick={toEdit}
    >
      <td className="w-1/4 flex flex-row gap-3">
        <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white mt-2">
          {decidePhoto(form)}
        </div>

        <div className="flex flex-col mb-1 flex-1">
          <div className="text-xs text-teal-900">
            Created on {new Date(form.createdAt).toDateString()}
          </div>

          <div className="text-left text-wrap w-full font-bold ">
            {form.title}
          </div>
        </div>
      </td>

      {isRespondent ? (
        <>
          <td className="flex flex-col mb-1 mt-2 w-[23.958%]">
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
          </td>

          <td className="flex flex-col py-2 w-[23.958%] font-bold">30</td>

          <td className="flex flex-col py-2 w-[23.958%] font-bold">
            {form.endedAt
              ? new Date(form.endedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "TBA"}
          </td>

          <td className="flex flex-col py-2 w-[3.125%] items-center font-bold h-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="right-0 absolute">
                <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Respond</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </>
      ) : (
        <>
          <td className="flex flex-col mb-1 mt-2 w-[17.96875%]">
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
          </td>

          <td className="flex flex-col py-2 w-[17.96875%] font-bold">30</td>

          <td className="flex flex-col py-2 w-[17.96875%] font-bold">
            {form.completedParticipation}
          </td>

          <td className="flex flex-col py-2 w-[17.96875%] font-bold">
            {new Date(form.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </td>

          <td className="flex flex-col py-2 w-[3.125%] items-center font-bold h-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="right-0 absolute">
                <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Summary</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </>
      )}
    </tr>
  );
}
