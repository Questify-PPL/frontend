import Image from "next/image";
import Link from "next/link";
import { RoleDropdown } from "./RoleDropdown";
import { UserDropdownMenu } from ".";
import { Session } from "next-auth";

export default function PrimaryNavbar({
  session,
}: Readonly<{ session: Session | null }>) {
  return (
    <div className="w-full bg-[#E5EEF0] flex px-[15px] py-[10px] justify-between items-center gap-[10px]">
      <Link href={"/home"}>
        <Image
          src="/assets/Questify.svg"
          alt="Questify Logo"
          width={82}
          height={19}
        />
      </Link>
      <div className="flex items-center gap-[10px]">
        <RoleDropdown session={session} />
        <UserDropdownMenu />
      </div>
    </div>
  );
}
