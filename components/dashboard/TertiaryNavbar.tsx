"use client";

import { BackAndExport } from "./BackAndExport";

export default function TertiaryNavbar({
  formTitle,
}: Readonly<{ formTitle: string }>) {
  return (
    <div className="flex w-full px-5 py-[10px] gap-3 flex-col justify-center bg-[#E5EEF0] md:hidden">
      <BackAndExport />
      {formTitle ? (
        <h3 className="text-[#32636A] text-[14px] font-semibold text-center text-wrap w-full leading-normal">
          {formTitle}
        </h3>
      ) : (
        <h3 className="text-[#32636A] text-[14px] font-semibold text-center text-wrap w-full leading-normal">
          Failed to load title
        </h3>
      )}
    </div>
  );
}
