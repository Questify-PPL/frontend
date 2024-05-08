import { FormAsProps } from "@/lib/types";
import { decidePhoto, isEnded } from "@/lib/utils";
import { LuCoins, LuDices } from "react-icons/lu";
import { useRouter } from "next/navigation";

export function MPMobile({
  form,
  className = "",
}: Readonly<
  FormAsProps & {
    className?: string;
  }
>) {
  const router = useRouter();

  function onClick() {
    !form.isCompleted
      ? router.push(`questionnaire/join/${form.id}`)
      : router.push(`summary/form/${form.id}`); // This should be directed to report summary
  }

  return (
    <div
      className={`flex flex-row justify-between items-center ${className} gap-[60px]`}
      onClick={onClick}
      data-testid={`mp-mobile-${form.id}`}
      role="none"
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
          <div className="flex flex-row text-xs font-medium text-[#685B2D] break-all">
            respondents
          </div>
        </div>
        <div className="flex flex-wrap bg-[#F9EBF6] rounded-xl px-3 py-1 mt-2 ml-[46px]">
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
      </div>
      {!isEnded(form.endedAt) ? (
        <div className="flex flex-col py-2 w-[14%] font-bold justify-center items-end">
          {form.questionFilled === form.questionAmount ? (
            <span>Done</span>
          ) : (
            <span>
              {form.questionFilled}/{form.questionAmount}
            </span>
          )}
          <span className="text-xs font-medium text-[#95B0B4]">Answered</span>
        </div>
      ) : (
        <div className="flex flex-wrap text-xs font-bold text-[#685B2D] mr-1 justify-end">
          +{"\u00A0"}
          <LuCoins className="mr-1 text-[#E2B720]" />
          {form.winningStatus
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
      )}
    </div>
  );
}
