import { LuChevronLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function WithdrawHeader() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col w-full h-fit p-4 gap-2 bg-[#F3F8F9] rounded-md">
      <div className="flex flex-row justify-between">
        <Button
          variant="secondary"
          className="p-0 gap-1 h-fit text-[#95B0B4] bg-[#F3F8F9]"
          onClick={onBack}
        >
          <LuChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <span className="text-primary text-xl font-semibold">
          Credit Withdraw
        </span>
      </div>
    </div>
  );
}
