"use client";

import { Card } from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuClipboardList, LuDollarSign, LuHistory } from "react-icons/lu";
import { Fragment } from "react";

const links = [
  { name: "Payments", href: "/home", icon: LuDollarSign },
  { name: "Reports", href: "/reports", icon: LuClipboardList },
  { name: "Reviews", href: "/reviews", icon: LuHistory },
];

const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-fit w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex p-4 md:p-0 fixed z-20 bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:max-w-[238px] w-full !left-0">
      <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0 overflow-x-auto">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Fragment key={link.name}>
              <Link
                className={`${buttonClass} ${clsx({
                  "mb-auto": isActive,
                })}`}
                href={link.href}
              >
                {isActive ? (
                  <span className={buttonIndicatorClassSm}></span>
                ) : (
                  <span
                    className={`${buttonIndicatorClassSm} bg-transparent`}
                  ></span>
                )}
                <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:items-center">
                  <LinkIcon className="mx-auto w-[20px] h-[20px]" />
                  <div className="font-bold text-xs text-center md:text-sm text-[#324B4F] text-wrap md:text-nowrap">
                    {link.name}
                  </div>
                </div>
                {isActive ? (
                  <span className={buttonIndicatorClassMd}></span>
                ) : (
                  <span
                    className={`${buttonIndicatorClassMd} bg-transparent`}
                  ></span>
                )}
              </Link>
            </Fragment>
          );
        })}
      </Card>
    </div>
  );
}
