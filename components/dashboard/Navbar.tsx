"use client";

import { useMediaQuery } from "@/lib/hooks";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "./PrimaryNavbar";
import SecondaryNavbar from "./SecondaryNavbar";

export default function Navbar({
  session,
}: Readonly<{ session: Session | null }>) {
  const isMobile = useMediaQuery(768);
  const pathname = usePathname();

  return (
    <>
      {isMobile ? (
        <>
          {pathname === "/home" && <PrimaryNavbar session={session} />}
          {pathname === "/create" && (
            <SecondaryNavbar
              title="Create QRE"
              infoDescription="Create Questionnaire Page"
            />
          )}
          {pathname === "/response" && (
            <SecondaryNavbar
              title="Responses"
              infoDescription="Responses Page"
            />
          )}
        </>
      ) : (
        <PrimaryNavbar session={session} />
      )}
    </>
  );
}
