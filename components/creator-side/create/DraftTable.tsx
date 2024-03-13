import { LuCoins } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface DraftTableProps {
  id: string;
  title: string;
  prize: number;
  prizeType: string;
  maxWinner?: number;
  modified: string;
}

export default function DraftTable({
  id,
  title,
  prize,
  prizeType,
  maxWinner = 0,
  modified,
}: DraftTableProps) {
  const router = useRouter();

  function toEdit() {
    router.push(`/create/form/${id}`);
  }

  return (
    <div
      className="flex w-full gap-[10px] items-center hover:bg-primary/20 rounded-md  p-[10px] pr-[44px]"
      onClick={toEdit}
    >
      <div className="flex-shrink-0 w-6 h-6 bg-[#D8EAEE] rounded-md text-primary flex justify-center items-center">
        o
      </div>
      <span className="text-left text-wrap w-full font-bold text-xs">
        {title}
      </span>
      <div className="flex flex-col gap-1 w-full text-[#685B2D] rounded-md">
        <div className="flex flex-row text-xs font-bold  gap-1">
          <LuCoins className="text-[#E2B720]"></LuCoins>
          {prize}
          <span className="font-medium">for</span>
        </div>
        {prizeType === "EVEN" ? (
          <div className="flex flex-row text-xs">all respondents</div>
        ) : (
          <div className="flex flex-row text-xs">
            <span className="font-bold">{maxWinner}</span>
            lucky respondents
          </div>
        )}
      </div>
      <span className="text-left text-wrap w-full font-bold text-sm">
        {new Date(modified).toLocaleDateString("en-GB")}
      </span>
    </div>
  );
}
