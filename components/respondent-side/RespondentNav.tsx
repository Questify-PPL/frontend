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
    router.push("/join");
  };

  const toResponses = () => {
    router.push("/home");
  };

  return (
    <Navigation
      className={className}
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
