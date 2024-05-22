"use client";

import { FormAsProps } from "@/lib/types";
import { decidePhoto, isEnded } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuDices, LuMoreHorizontal } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "@/components/report/ReportDialog";

export function MPContent({ form }: Readonly<FormAsProps>) {
  const router = useRouter();

  function onClick() {
    !form.isCompleted
      ? router.push(`questionnaire/join/${form.id}`)
      : router.push(`summary/form/${form.id}`); // This should be directed to report summary
  }

  return (
    <tr
      className="flex w-full p-3 hover:bg-[#F3F8F9]/30 rounded-md cursor-pointer items-center"
      onClick={onClick}
      data-testid={`mp-content-${form.id}`}
    >
      <td className="w-[21.75%] flex flex-row gap-3">
        <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white">
          {decidePhoto(form)}
        </div>
        <div className="flex flex-col mb-1 flex-1">
          <div className="text-xs text-[#32636A] flex flex-wrap items-center">
            {form.prizeType === "LUCKY" &&
              isEnded(form.endedAt) &&
              form.winningStatus && (
                <span
                  className="inline-block bg-[#DDFAD6] text-[#39A014] font-bold rounded-full px-2 py-0.5 mr-1.5 text-xs"
                  data-testid="luckily"
                >
                  luckily
                </span>
              )}
            {form.prizeType === "LUCKY" &&
              isEnded(form.endedAt) &&
              !form.winningStatus && (
                <span
                  className="inline-block bg-[#FDEDEA] text-[#E24F20] font-bold rounded-full px-2 py-0.5 mr-1.5 text-xs"
                  data-testid="alas-not"
                >
                  alas, not
                </span>
              )}
            {form.prizeType === "EVEN" &&
              isEnded(form.endedAt) &&
              form.winningStatus && (
                <span
                  className="inline-block bg-[#DDFAD6] text-[#39A014] font-bold rounded-full px-2 py-0.5 mr-1.5 text-xs"
                  data-testid="each"
                >
                  each
                </span>
              )}
            {!isEnded(form.endedAt)
              ? `started on ${new Date(form.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )}`
                  .split("/")
                  .map((part, index, arr) => (
                    <div key={index}>
                      {part}
                      {index !== arr.length - 1 && "/"}
                    </div>
                  ))
              : `prized on ${
                  form.endedAt
                    ? new Date(form.endedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "TBA"
                }`
                  .split("/")
                  .map((part, index, arr) => (
                    <div key={index}>
                      {part}
                      {index !== arr.length - 1 && "/"}
                    </div>
                  ))}
          </div>
          <div className="text-left text-wrap w-full font-bold break-all">
            {form.title}
          </div>
        </div>
      </td>
      <td className="flex flex-col py-2 w-[11.25%] text-sm justify-center">
        <div className="flex flex-wrap">
          {form.endedAt ? (
            new Date(form.endedAt)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .split("/")
              .map((part, index, arr) => (
                <div key={index}>
                  {part}
                  {index !== arr.length - 1 && "/"}
                </div>
              ))
          ) : (
            <div>TBA</div>
          )}
        </div>
      </td>
      <td className="flex flex-col mb-1 mt-2 w-[13.75%] pr-4 justify-center">
        <div className="flex flex-wrap w-full bg-[#FCF8E9] rounded-xl px-3 py-2">
          <div className="flex flex-wrap text-xs font-bold text-[#685B2D] mr-1">
            <LuCoins className="mr-1 text-[#E2B720]"></LuCoins>
            {form.prize
              .toLocaleString()
              .split(",")
              .map((part, index, arr) => (
                <div key={index}>
                  {part}
                  {index !== arr.length - 1 && "."}
                </div>
              ))}
          </div>
          <div className="flex flex-row text-xs font-medium text-[#685B2D] mr-1">
            for
          </div>
          <div className="flex flex-row text-xs font-bold text-[#685B2D] mr-1">
            {form.prizeType === "EVEN" ? "each" : `${form.maxWinner} `}
          </div>
          <div className="flex flex-row text-xs font-medium text-[#685B2D]">
            {form.prizeType === "LUCKY" && <span className="mr-1">lucky</span>}
          </div>
          <div className="flex flex-row text-xs font-medium text-[#685B2D] break-all">
            respondents
          </div>
        </div>
      </td>
      <td className="flex flex-col mb-1 mt-2 w-[13.75%] pr-4 justify-center">
        <div className="flex flex-row w-full bg-[#F9EBF6] rounded-xl px-3 py-2">
          <div className="flex flex-wrap mb-1 flex-1">
            <div className="flex flex-wrap text-xs font-bold text-[#804877] mr-1">
              <LuDices className="mr-1 text-[#C036A9]"></LuDices>
              {parseFloat(Number(form.winningChance).toFixed(2))
                .toString()
                .replace(".", ",")}
              <div>%</div>
            </div>
            <div className="text-xs font-medium text-[#804877] break-all">
              winning chance
            </div>
          </div>
        </div>
      </td>
      <td className="flex flex-col py-2 w-[14%] font-bold justify-center">
        {form.questionFilled === form.questionAmount ? (
          <span>Done</span>
        ) : (
          <span>
            {form.questionFilled}/{form.questionAmount}
          </span>
        )}
      </td>
      <td
        className="flex flex-col py-2 w-[11.25%] font-bold justify-center"
        data-testid={!isEnded(form.endedAt) ? "status-ongoing" : "status-ended"}
      >
        {!isEnded(form.endedAt) ? "On Going" : "Ended"}
      </td>
      <td className="flex flex-col py-2 w-[11.25%] font-bold justify-center">
        <div className="flex flex-wrap text-xs font-bold text-[#685B2D]">
          <LuCoins className="mr-1 text-[#E2B720]" />
          {!isEnded(form.endedAt)
            ? "?"
            : form.winningStatus
              ? Math.floor(form.prize / Number(form.winnerAmount))
                  .toLocaleString()
                  .split(",")
                  .map((part, index, arr) => (
                    <div key={index} data-testid={`prize-amount-${index}`}>
                      {part}
                      {index !== arr.length - 1 && "."}
                    </div>
                  ))
              : 0}
        </div>
      </td>
      <td className="flex flex-col py-2 w-[3.125%] items-center justify-center font-bold h-full">
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="right-0 absolute"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClick}>
              {form.isCompleted ? "Summary" : "Continue"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ReportDialog
          user={{
            reportedId: form.creatorId!,
            isReported: form.formIsReported,
          }}
          formId={form.id}
          reportedInfo={form.title}
          handleReport={() => {}}
          asIcon={true}
        />
      </td>
    </tr>
  );
}
