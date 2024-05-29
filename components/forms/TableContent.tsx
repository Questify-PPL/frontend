"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto, useHomeClick, useShareClick } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuMoreHorizontal } from "react-icons/lu";
import { deleteQuestionnaire } from "@/lib/action/form";
import { useCallback } from "react";
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
  isFromHome = false,
  // eslint-disable-next-line no-unused-vars
  onOpenRespondCard = (id, title) => {},
}: Readonly<
  FormAsProps & {
    isRespondent?: boolean;
    isFromHome?: boolean;
    // eslint-disable-next-line no-unused-vars
    onOpenRespondCard?: (id: string, title: string) => void;
  }
>) {
  const router = useRouter();
  const handleShareClick = useShareClick(form);
  const handleHomeClick = useHomeClick(form);

  function toEdit() {
    router.push(`/create/form/${form.id}`);
  }

  const handleEditClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      router.push(`/create/form/${form.id}`);
    },
    [form.id, router],
  );

  const handleDeleteClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      deleteQuestionnaire(form.id);
      router.refresh();
    },
    [form.id, router],
  );

  const handleRespondClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      onOpenRespondCard(form.id, form.title);
    },
    [form.id, form.title, onOpenRespondCard],
  );

  return (
    <div
      className="md:flex w-full p-3 hover:bg-[#F3F8F9]/30 rounded-md cursor-pointer hidden"
      onClick={
        isRespondent
          ? isFromHome
            ? handleHomeClick
            : handleRespondClick
          : toEdit
      }
      role="none"
    >
      <div className="w-1/4 flex flex-row gap-3">
        <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white mt-2">
          {decidePhoto(form)}
        </div>

        <div className="flex flex-col flex-1">
          <span className="text-[10px] leading-3 text-primary">
            Created on {new Date(form.createdAt).toLocaleDateString("en-GB")}
          </span>

          <span className="text-left text-wrap w-full font-bold text-sm">
            {form.title}
          </span>
        </div>
      </div>

      {isRespondent ? (
        <>
          <div className="flex flex-col mb-1 mt-2 w-[23.958%]">
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

          <div className="flex flex-col py-2 w-[23.958%] font-bold">
            {form.questionAmount}
          </div>

          <div className="flex flex-col py-2 w-[23.958%] font-bold">
            {form.endedAt
              ? new Date(form.endedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "TBA"}
          </div>

          <div className="flex flex-col py-2 w-[3.125%] items-center font-bold h-full">
            <DropdownMenu>
              <DropdownMenuTrigger data-testid="dmt-respondent">
                <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="right-0 absolute">
                <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isFromHome ? (
                  <DropdownMenuItem>
                    {form.isCompleted ? "Summary" : "Continue"}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>Respond</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleShareClick();
                  }}
                >
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col px-2 py-[6px] md:w-[14.375%] lg:w-[11.97916667%] bg-[#FCF8E9] rounded-md overflow-x-scroll">
            <div className="flex flex-row w-full flex-wrap min-w-fit">
              <div className="flex flex-row text-xs font-bold text-[#685B2D]">
                <LuCoins className="mr-1 text-[#E2B720]"></LuCoins>
                {form.prize}
              </div>
              <div className="ml-1 flex flex-row text-xs font-medium text-[#685B2D]">
                for
              </div>
            </div>
            <div className="flex flex-row text-xs font-medium text-[#685B2D] min-w-fit">
              {form.prizeType === "EVEN"
                ? "each participants"
                : `${form.maxWinner} lucky respondents`}
            </div>
          </div>

          <div className="flex flex-col py-2 w-[11.97916667%] font-bold">
            {form.questionAmount}
          </div>

          <div className="flex flex-col py-2 w-[11.97916667%] font-bold">
            {form.completedParticipation}
          </div>

          <div className="flex flex-col py-2 w-[11.97916667%] font-bold">
            {new Date(form.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>

          <div className="flex flex-col py-2 w-[3.125%] items-center font-bold h-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="right-0 absolute"
                data-testid="content-menu"
              >
                <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEditClick}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#E24F20] focus:text-[#E24F20] focus:bg-[#FDEDEA]"
                  onClick={handleDeleteClick}
                  data-testid="delete-button"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
