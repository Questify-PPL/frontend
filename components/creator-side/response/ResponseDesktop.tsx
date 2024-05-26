import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormAsProps } from "@/lib/types";
import { decidePhoto, useShareClick } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuMoreHorizontal } from "react-icons/lu";

export function ResponseDesktop({ form }: Readonly<FormAsProps>) {
  const router = useRouter();
  const handleShareClick = useShareClick(form);

  function toSummary() {
    router.push(`/summary/form/${form.id}`);
  }

  return (
    <div
      className="md:flex w-full p-3 hover:bg-[#F3F8F9]/30 rounded-md cursor-pointer hidden"
      onClick={toSummary}
      role="none"
    >
      <div className="w-1/4 flex flex-row gap-3">
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
      </div>

      <div className="flex flex-col md:w-[17.96875%] lg:w-[14.375%]">
        <div className="flex flex-wrap px-2 py-[6px] flex-col justify-center items-center max-w-fit rounded-md overflow-x-scroll bg-[#FCF8E9]">
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
              ? "each respondents"
              : `${form.maxWinner} lucky respondents`}
          </div>
        </div>
      </div>

      <div className="flex flex-col py-2 md:w-[17.96875%] lg:w-[14.375%] font-bold">
        {form.questionAmount}
      </div>

      <div className="flex flex-col py-2 md:w-[17.96875%] lg:w-[14.375%] font-bold">
        {form.completedParticipation}
      </div>

      <div className="flex flex-col py-2 md:hidden lg:flex w-[14.375%] font-bold">
        {isNaN(
          form.completedParticipation /
            (form.completedParticipation + form.ongoingParticipation),
        )
          ? 0
          : (form.completedParticipation /
              (form.completedParticipation + form.ongoingParticipation)) *
            100}
        %
      </div>

      <div className="flex flex-col py-2 md:w-[17.96875%] lg:w-[14.375%] font-bold">
        {form.updatedAt
          ? new Date(form.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "TBA"}
      </div>

      <div className="flex flex-col py-2 w-[3.125%] items-center font-bold h-full">
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="dmt-creator">
            <LuMoreHorizontal className="w-3 h-3 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="right-0 absolute">
            <DropdownMenuLabel>{form.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Summary</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleShareClick;
              }}
            >
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
