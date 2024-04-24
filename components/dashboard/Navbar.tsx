"use client";

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "./PrimaryNavbar";
import SecondaryNavbar from "./SecondaryNavbar";

const primaryNavbarPath = ["/home", "/reports", "/reviews", "/blocked"];

export default function Navbar({
  session,
}: Readonly<{ session: Session | null }>) {
  const pathname = usePathname();

  return (
    <>
      {primaryNavbarPath.includes(pathname) && (
        <PrimaryNavbar session={session} />
      )}
      {!primaryNavbarPath.includes(pathname) && (
        <PrimaryNavbar session={session} className="md:flex hidden" />
      )}
      {pathname === "/create" && (
        <SecondaryNavbar
          title="Create QRE"
          infoDescription="Create Questionnaire Page"
        />
      )}
      {pathname === "/response" && (
        <SecondaryNavbar title="Responses" infoDescription="Responses Page" />
      )}
      {pathname === "/questionnaire" && (
        <SecondaryNavbar
          title="QRE For You"
          infoDescription="Search For Questionnaires Page"
        />
      )}
    </>
  );
}
