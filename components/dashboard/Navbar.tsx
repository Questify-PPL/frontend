"use client";

import { useMediaQuery } from "@/lib/hooks";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "./PrimaryNavbar";
import SecondaryNavbar from "./SecondaryNavbar";

const primaryNavbarPath = ["/home", "/reports", "/reviews"];

export default function Navbar({
  session,
}: Readonly<{ session: Session | null }>) {
  const isMobile = useMediaQuery(768);
  const pathname = usePathname();

  return (
    <>
      {isMobile ? (
        <>
          {primaryNavbarPath.includes(pathname) && (
            <PrimaryNavbar session={session} />
          )}
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
          {pathname === "/questionnaire" && (
            <SecondaryNavbar
              title="QRE For You"
              infoDescription="Search For Questionnaires Page"
            />
          )}
        </>
      ) : (
        <PrimaryNavbar session={session} />
      )}
    </>
  );
}
