import { FormAsProps } from "@/lib/types";
import { decidePhoto, useHomeClick, useShareClick } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { LuCoins, LuDices, LuSend } from "react-icons/lu";

export function DraftMobile({
  form,
  isRespondent = false,
  isSendIcon = false,
  isFromHome = false,
  // eslint-disable-next-line no-unused-vars
  onOpenRespondCard = (id, title) => {},
}: Readonly<
  FormAsProps & {
    isRespondent?: boolean;
    isSendIcon?: boolean;
    isFromHome?: boolean;
    // eslint-disable-next-line no-unused-vars
    onOpenRespondCard?: (id: string, title: string) => void;
  }
>) {
  const router = useRouter();
  const handleShareClick = useShareClick(form);
  const handleHomeClick = useHomeClick(form);

  function toEdit() {
    router.push(`/create/form/${form.id}`); // Adjust it to the correct path, if needed
  }

  const handleRespondClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      onOpenRespondCard(form.id, form.title);
    },
    [form.id, form.title, onOpenRespondCard]
  );

  return (
    <div
      className="flex flex-row justify-between items-center md:hidden"
      onClick={
        isRespondent
          ? isFromHome
            ? handleHomeClick
            : handleRespondClick
          : toEdit
      }
      role="none"
    >
      <div className="flex flex-row px-[5px] py-2 gap-[10px]">
        <div className="flex flex-col items-start justify-start">
          <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white">
            {decidePhoto(form)}
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {isRespondent && (
            <div className="text-[8px] text-[#32636A] font-medium">
              responded on{" "}
              {new Date(form.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
          <div className="self-stretch text-[#1D2425] text-[12px] font-bold">
            {form.title}
          </div>
          {isRespondent && (
            <>
              {!isSendIcon && (
                <div className="flex flex-row px-[6px] py-[2px] rounded-[8px] gap-[2px] bg-[#F9EBF6] w-fit justify-center items-center">
                  <LuDices className="stroke-[#C036A9] stroke-[1.044px] w-[10px] h-[10px] flex-shrink-0" />
                  <p className="text-[#685B2D] text-[8px] tracking-[-0.04px] font-medium">
                    100% winning chances
                  </p>
                </div>
              )}
            </>
          )}

          <div className="flex flex-row px-[6px] py-[2px] rounded-[8px] gap-[2px] bg-[#FDF8EA] w-fit justify-center items-center">
            <LuCoins className="stroke-[#E2B720] stroke-[1.044px] w-[10px] h-[10px] flex-shrink-0" />
            <p className="text-[#685B2D] text-[8px] tracking-[-0.04px] font-medium">
              {form.prize} for all participants
              {form.prizeType === "EVEN"
                ? "all participants"
                : `${form.maxWinner} lucky respondents`}
            </p>
          </div>
        </div>
      </div>
      {isRespondent && (
        <>
          {isSendIcon && (
            <div
              className="flex h-[51px] p-[6px] justify-center items-center gap-[8px] rounded-[6px] border border-solid border-[#CDDDE1] bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleShareClick;
              }}
              data-testid="share-icon"
            >
              <LuSend className="w-[16px] h-[16px] text-[#32636A]" />
            </div>
          )}
          {!isSendIcon && (
            <div className="flex flex-col gap-1 mr-2">
              <span className="text-[14px] leading-normal font-bold text-[#1D2425]">
                22/100
              </span>
              <span className="text-[#95B0B4] text-[10px] font-medium leading-normal tracking-[-0.05px]">
                Answered
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
