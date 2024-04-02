import { LuChevronLeft, LuUpload } from "react-icons/lu";

export function BackAndExport() {
  return (
    <div className="flex justify-between items-end self-stretch">
      <button className="flex gap-1 items-center" onClick={() => {}}>
        <LuChevronLeft className="text-[#95B0B4] h-4 w-4" />
        <p className="text-[#95B0B4] text-[14px] font-semibold leading-normal">
          Back
        </p>
      </button>
      <button className="flex gap-1 items-center" onClick={() => {}}>
        <LuUpload className="text-[#95B0B4] h-4 w-4" />
        <p className="text-[#95B0B4] text-[14px] font-semibold leading-normal">
          Export
        </p>
      </button>
    </div>
  );
}
