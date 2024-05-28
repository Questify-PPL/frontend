"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuMoreHorizontal } from "react-icons/lu";
import { deleteQuestionnaire } from "@/lib/action/form";
import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReloadIcon } from "@/components/common";
import { useToast } from "@/components/ui/use-toast";

export function DraftContent({
  form,
  isRespondent = false,
  onDeleteCallback,
}: Readonly<
  FormAsProps & {
    isRespondent?: boolean;
    onDeleteCallback?: () => void;
  }
>) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

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
    async (event: { stopPropagation: () => void }) => {
      setIsDeleting(true);
      event.stopPropagation();
      await deleteQuestionnaire(form.id);
      onDeleteCallback?.();
      setIsDeleting(false);

      toast({
        title: "Form Deleted",
        description: "Your form has been successfully deleted",
      });
    },
    [form.id, toast, onDeleteCallback],
  );

  return (
    <div
      className="hidden md:flex w-full p-3 hover:cursor-pointer border-b border-[#E5EEF0] items-center hover:bg-[#F3F8F9]"
      onClick={toEdit}
      data-testid="table-content"
      role="none"
    >
      <div className="w-1/4 flex flex-row gap-[10px] mt-1">
        <div className="min-w-7 h-7 bg-[#95B0B4] rounded-md flex justify-center items-center text-white text-xs text-bold">
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
          {/* Prize */}
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

          {/* Form Ended */}
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
              <DropdownMenuTrigger>
                <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="right-0 absolute">
                <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Respond</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          {/* Prize */}
          <div className="flex flex-col md:w-[14.375%] lg:w-[11.97916667%]">
            <div className="flex flex-col px-2 py-[6px] max-w-fit bg-[#FCF8E9] rounded-md flex-wrap">
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
          </div>

          {/* Updated At */}
          <div className="text-xs flex flex-col md:w-[14.375%] lg:w-[11.97916667%] font-medium">
            {new Date(form.updatedAt).toLocaleDateString("en-GB")}
          </div>

          {/* Questions */}
          <div className="text-xs flex md:w-[14.375%] lg:w-[11.97916667%] font-bold">
            {form.questionAmount}
          </div>

          {/* Time */}
          <div className="text-xs flex md:w-[14.375%] lg:w-[11.97916667%] font-bold">
            {((form.questionAmount as number) * 7.5) / 60} mins
          </div>

          {/* Theme */}
          <div className="text-xs lg:flex flex-row gap-1 md:w-[14.375%] lg:w-[11.97916667%] font-bold md:hidden">
            <div className="w-4 h-4 bg-slate-600 rounded-full border-2 border-neutral-800" />
            <div className="w-4 h-4 bg-white rounded-full border-2 border-neutral-800" />
          </div>

          {/* Font */}
          <div className="text-xs flex flex-col md:w-[14.375%] lg:w-[11.97916667%] font-bold">
            Aa
          </div>

          {/* Action */}
          <div className="flex flex-shrink-0 flex-grow-0 w-[3.125%] h-8 items-center justify-center font-bold rounded-sm border">
            <DropdownMenu data-testid="more-button">
              <DropdownMenuTrigger data-testid="trigger">
                {isDeleting ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin fill-white" />
                ) : (
                  <LuMoreHorizontal
                    className="flex w-4 h-full cursor-pointer"
                    aria-label="More"
                  />
                )}
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
