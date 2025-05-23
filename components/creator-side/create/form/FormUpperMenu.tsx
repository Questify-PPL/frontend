import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuSave } from "react-icons/lu";

interface FormUpperMenuProps {
  onBack?: () => void;
  onSave?: () => void;
  QRETitle?: string;
  isParticipate?: boolean;
}

export function FormUpperMenu({
  onBack = () => {},
  onSave = () => {},
  QRETitle = "",
  isParticipate = false,
}: Readonly<FormUpperMenuProps>) {
  return (
    <div className="flex flex-col w-full h-fit px-5 py-3 gap-2 bg-[#F3F8F9] rounded-md">
      <div className="flex flex-row justify-between items-center">
        <Button
          variant="secondary"
          className={
            isParticipate
              ? "p-0 gap-1 h-fit text-[#95B0B4] font-bold bg-[#F3F8F9] text-lg"
              : "p-0 gap-1 h-fit text-[#95B0B4] bg-[#F3F8F9] "
          }
          onClick={onBack}
        >
          <LuChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          variant="secondary"
          className={
            isParticipate
              ? "p-0 gap-1 h-fit text-[#95B0B4] font-bold bg-[#F3F8F9] text-lg"
              : "p-0 gap-1 h-fit text-[#95B0B4] bg-[#F3F8F9] "
          }
          onClick={onSave}
          data-testid="save-as-draft"
        >
          <LuSave className="w-4 h-4" />
          Save as Draft
        </Button>
      </div>
      <span className="flex text-primary font-semibold">{QRETitle}</span>
    </div>
  );
}
