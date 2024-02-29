import React from "react";
import Navigation from "@/components/layout/Navigation";
import { redirect } from "next/navigation";

export default async function HomePage(props: Props) {
  return (
    <div className="h-screen w-screen">
      <Navigation
        mainActionM="Create QRE"
        mainActionD="Create Questionnaire"
        state="home"
        onClickHome={redirect("./creator")}
        onClickAction={redirect("/create")}
        onClickResponses={redirect("/responses")}
      ></Navigation>
    </div>
  );
};
