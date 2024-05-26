import { FormAsProps } from "@/lib/types";
import { decidePhoto, useShareClick } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LuCoins, LuSend } from "react-icons/lu";

export function ResponseMobile({ form }: Readonly<FormAsProps>) {
  const router = useRouter();
  const handleShareClick = useShareClick(form);

  function toSummary() {
    router.push(`/summary/form/${form.id}`);
  }

  return (
    <div
      className="flex flex-row justify-between items-center md:hidden"
      onClick={toSummary}
    >
      <div className="flex flex-row px-[5px] py-2 gap-[10px]">
        <div className="flex flex-col items-start justify-start">
          <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white">
            {decidePhoto(form)}
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-[8px] text-[#32636A] font-medium">
            created on{" "}
            {new Date(form.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <div className="self-stretch text-[#1D2425] text-[12px] font-bold">
            {form.title}
          </div>

          <div className="flex flex-row px-[6px] py-[2px] rounded-[8px] gap-[2px] bg-[#FDF8EA] w-fit justify-center items-center">
            <LuCoins className="stroke-[#E2B720] stroke-[1.044px] w-[10px] h-[10px] flex-shrink-0" />
            <p className="text-[#685B2D] text-[8px] tracking-[-0.04px] font-medium">
              {form.prizeType === "LUCKY"
                ? `${form.prize} for ${form.maxWinner} lucky respondents`
                : `${form.prize} for each respondents`}
            </p>
          </div>
        </div>
      </div>
      <button
        className="flex h-[51px] p-[6px] justify-center items-center gap-[8px] rounded-[6px] border border-solid border-[#CDDDE1] bg-white cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleShareClick;
        }}
        data-testid="share-icon"
      >
        <LuSend className="w-[16px] h-[16px] text-[#32636A]" />
      </button>
    </div>
  );
}
