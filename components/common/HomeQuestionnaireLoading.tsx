import { Skeleton } from "../ui/skeleton";

export function HomeQuestionnaireLoading({
  label,
}: Readonly<{ label: string }>) {
  return (
    <div className="flex flex-col gap-[10px] min-h-[16rem] mt-4 px-2 w-full">
      <div className="text-[#32636A] text-[10px] font-semibold">{label}</div>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={`skeleton-${index + 1}`}
          className="w-full h-20"
        ></Skeleton>
      ))}
    </div>
  );
}
