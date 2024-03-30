export function FilterSection() {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <input
        className="flex px-3 py-[10px] items-center rounded-[24px] bg-[#E5EEF0] placeholder:text-[#324B4F] text-[#1A202C] text-[12px] font-semibold leading-normal focus:outline-none focus:ring-2 focus:ring-[#1A202C] focus:ring-opacity-20"
        placeholder="Search title(s)"
      />
      <div className="h-[1px] w-full bg-[#E5EEF0]"></div>
      <div className="flex flex-row gap-[6px]">
        <button className="flex py-[2px] px-[10px] gap-[2px] rounded-[10px] bg-primary text-[#E5EEF0] text-[10px] font-bold">
          All
        </button>
        <button className="flex py-[2px] px-[10px] gap-[2px] rounded-[10px] text-primary bg-[#E5EEF0] text-[10px] font-bold">
          Ongoing
        </button>
        <button className="flex py-[2px] px-[10px] gap-[2px] rounded-[10px] text-primary bg-[#E5EEF0] text-[10px] font-bold">
          Ended
        </button>
      </div>
    </div>
  );
}
