import { useResponsesContext } from "@/lib/context";

const tags = ["All", "Ongoing", "Ended"];

export function FilterSection() {
  const { tag, setTag, setTitle } = useResponsesContext();

  return (
    <div className="w-full flex flex-col gap-[10px]">
      <input
        className="flex px-3 py-[10px] items-center rounded-[24px] bg-[#E5EEF0] placeholder:text-[#324B4F] text-[#1A202C] text-[12px] font-semibold leading-normal focus:outline-none focus:ring-2 focus:ring-[#1A202C] focus:ring-opacity-20"
        placeholder="Search title(s)"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="h-[1px] w-full bg-[#E5EEF0]"></div>
      <div className="flex flex-row gap-[6px]">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t as "All" | "Ongoing" | "Ended")}
            className={`flex py-[2px] px-[10px] gap-[2px] rounded-[10px] ${
              tag === t
                ? "bg-primary text-[#E5EEF0]"
                : "text-primary bg-[#E5EEF0]"
            } text-[10px] font-bold`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
