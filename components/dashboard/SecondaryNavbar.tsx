import { LuInfo } from "react-icons/lu";
import { UserDropdownMenu } from ".";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function SecondaryNavbar({
  title,
  infoDescription,
}: Readonly<{
  title: string;
  infoDescription: string;
}>) {
  return (
    <>
      <div className="w-full flex px-[15px] py-[10px] justify-between items-center gap-[10px]">
        <div className="text-[20px] font-semibold text-center flex flex-row gap-1 items-center flex-1">
          <span className="text-[#32636A]">{title}</span>
          <HoverCard>
            <HoverCardTrigger>
              <LuInfo className="flex w-4 h-4 text-[#95B0B4]"></LuInfo>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                {infoDescription}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <UserDropdownMenu />
      </div>
      <div className="w-[92.5%] h-[2px] bg-[#d4dddf]"></div>
    </>
  );
}
