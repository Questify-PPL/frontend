import { BareForm } from "@/lib/types/form.type";
import { decidePhoto } from "@/lib/utils";
import { LuCoins } from "react-icons/lu";

export function DraftMobile({ form }: Readonly<{ form: BareForm }>) {
  return (
    <div className="flex flex-row px-[5px] py-2 gap-[10px]">
      <div className="flex flex-col items-start justify-start">
        <div className="min-w-8 h-8 bg-[#95B0B4] rounded-md flex justify-center items-center text-white">
          {decidePhoto(form)}
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="self-stretch text-[#1D2425] text-[12px] font-bold">
          {form.title}
        </div>

        <div className="flex flex-row px-[6px] py-[2px] rounded-[8px] gap-[2px] bg-[#FDF8EA] w-fit justify-center items-center">
          <LuCoins className="stroke-[#E2B720] stroke-[1.044px] w-[10px] h-[10px] flex-shrink-0" />
          <p className="text-[#685B2D] text-[8px] tracking-[-0.04px] font-medium">
            2000 for all participants
          </p>
        </div>
      </div>
    </div>
  );
}
