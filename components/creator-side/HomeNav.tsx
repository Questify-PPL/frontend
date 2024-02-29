import React from "react";
import Navigation from "@/components/layout/Navigation";
import { useRouter } from "next/navigation";

interface HomeNavProps {
  homeChildren?: React.ReactNode;
}

const HomeNav: React.FC<HomeNavProps> = ({
  homeChildren = null,
}) => {
  const router = useRouter();

  const toHome = () => {
    router.push("./creator");
  };

  const toCreate = () => {
    router.push("/create");
  };

  const toResponses = () => {
    router.push("/responses");
  };

  return (
    <div className="h-screen w-screen">
      <Navigation
        mainActionM="Create QRE"
        mainActionD="Create Questionnaire"
        state="home"
        onClickHome={toHome()}
        onClickAction={toCreate()}
        onClickResponses={toResponses()}
        homeChildren={homeChildren}
      ></Navigation>
    </div>
  );
};
