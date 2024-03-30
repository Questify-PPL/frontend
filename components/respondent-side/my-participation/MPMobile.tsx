import { FormAsProps } from "@/lib/types";
import { decidePhoto, isEnded } from "@/lib/utils";
import { LuCoins } from "react-icons/lu";

export function MPMobile({
  form,
  className = "",
}: Readonly<
  FormAsProps & {
    className?: string;
  }
>) {
  return (
    <div
      className={`flex flex-row justify-between items-center justify-center ${className} gap-[60px]`}
      data-testid={`mp-mobile-${form.id}`}
    >
      <div className="flex flex-col justify-center">
        <div className="flex flex-row px-[5px] gap-[10px]">
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
                    }
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
        </div>
        <div className="flex flex-wrap bg-[#FCF8E9] rounded-xl px-3 py-1 ml-[46px]">
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
          <div className="flex flex-row text-xs font-medium text-[#685B2D]">
            respon
          </div>
          <div className="flex flex-row text-xs font-medium text-[#685B2D]">
            dents
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2 w-[14%] font-bold justify-center items-end">
        {form.isCompleted ? (
          <span>Done</span>
        ) : (
          <span>
            {form.questionFilled}/{form.questionAmount}
          </span>
        )}
        <span className="text-xs font-medium text-[#95B0B4]">Answered</span>
      </div>
    </div>
  );
}
