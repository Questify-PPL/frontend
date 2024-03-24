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

  const toJoin = () => {
    router.push("/questionnaire");
  };

  const toResponses = () => {
    router.push("/response");
  };

  return (
    <Navigation
      className={
        className +
        " fixed bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:w-[30%] lg:w-[22%] xl:w-[17.5%] w-full !left-0"
      }
      action="Questionnaire for You"
      state={state}
      onClickHome={toHome}
      onClickAction={toJoin}
      onClickResponses={toResponses}
      homeChildren={homeChildren}
    ></Navigation>
  );
};

export default HomeNav;
