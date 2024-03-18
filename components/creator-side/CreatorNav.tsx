"use client";

import React from "react";
import Navigation from "@/components/layout/Navigation";
import { useRouter } from "next/navigation";

interface HomeNavProps {
  className?: string;
  state?: "home" | "action" | "responses";
  homeChildren?: React.ReactNode;
}

const HomeNav: React.FC<HomeNavProps> = ({
  className = "",
  state = "home",
  homeChildren = null,
}) => {
  const router = useRouter();

  const toHome = () => {
    router.push("/home");
  };

  const toCreate = () => {
    router.push("/create");
  };

  const toResponses = () => {
    router.push("/home");
  };

  return (
    <Navigation
      className={
        className +
        " fixed bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:w-[25%] lg:w-[20%] xl:w-[15%] w-full !left-0"
      }
      action="Create QRE"
      state={state}
      onClickHome={toHome}
      onClickAction={toCreate}
      onClickResponses={toResponses}
      homeChildren={homeChildren}
    ></Navigation>
  );
};

export default HomeNav;
