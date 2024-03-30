"use client";

import { useMediaQuery } from "@/lib/hooks";
import CreatorNav from "../CreatorNav";

export function ResponseWrapper() {
  const isMobile = useMediaQuery(768);

  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
      <CreatorNav state="responses"></CreatorNav>
      <div className="flex flex-col w-full space-y-4 flex-1">
        <p className="text-[#32636A] text-[10px] font-medium">Drafts</p>
        {isMobile ? <></> : <></>}
      </div>
    </div>
  );
}
