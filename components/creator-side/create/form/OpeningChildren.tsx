import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreatorInfo, RespondentInfo } from "@/lib/constant";

export function OpeningChildren() {
  return (
    <form className="flex flex-col w-full h-full gap-2">
      <span className="flex flex-col font-bold text-xs text-wrap">
        Specify your personal details disclosure
      </span>
      <div className="flex flex-col gap-1">
        {CreatorInfo.map((item, index) => (
          <div key={index} className="flex flex-row gap-1.5 w-full">
            <Checkbox id={`cre${item}`} className="text-xs" />
            <Label htmlFor={`cre${item}`} className="font-medium text-xs">
              {item}
            </Label>
          </div>
        ))}
      </div>
      <Separator className="bg-[#E5EEF0]"></Separator>
      <div className="flex flex-col gap-0">
        <span className="flex flex-col font-bold text-xs text-wrap">
          Specify the required respondent data
        </span>
        <span className="flex flex-col font-normal text-[#95B0B4] text-[10px] leading-3 text-wrap">
          If you add another, the question will expect a short answer.
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {RespondentInfo.map((item, index) => (
          <div key={index} className="flex flex-row gap-1.5 w-full">
            <Checkbox id={`res${item}`} className="text-xs" />
            <Label htmlFor={`res${item}`} className="font-medium text-xs">
              {item}
            </Label>
          </div>
        ))}
      </div>
    </form>
  );
}
