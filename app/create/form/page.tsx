"use client";

import React from "react";
import FormLeftMenu from "@/components/creator-side/FormLeftMenu";
import { UserDropdownMenu } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuSave } from "react-icons/lu";

export default function Form() {
  const [menuState, setMenuState] = React.useState("opening");

  const openOpening = () => {
    console.log("clicked opening");
    setMenuState("opening");
  };

  const openContents = () => {
    console.log("clicked contents");
    setMenuState("contents");
  };

  const openEnding = () => {
    console.log("clicked ending");
    setMenuState("ending");
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <UserDropdownMenu />
      <div className="flex flex-row w-full h-full gap-4 p-5">
        <FormLeftMenu
          className="absolute md:relative md:flex md:w-[20%]"
          state={menuState as "opening" | "contents" | "ending" | undefined}
          onClickOpening={openOpening}
          onClickContents={openContents}
          onClickEnding={openEnding}
          openingChildren={<div>Opening</div>}
          contentsChildren={<div>Contents</div>}
          endingChildren={<div>Ending</div>}
        ></FormLeftMenu>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex flex-col w-full h-fit px-5 py-3 gap-2 bg-accent rounded-md">
            <div className="flex flex-row justify-between">
              <Button
                variant="secondary"
                className="p-0 gap-1 h-fit text-[#95B0B4]"
              >
                <LuChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="secondary"
                className="p-0 gap-1 h-fit text-[#95B0B4]"
              >
                <LuSave className="w-4 h-4" />
                Save as Draft
              </Button>
            </div>
            <span className="flex text-primary font-semibold">
              Oreo Satisfaction: User Feedback in Indonesia
            </span>
          </div>
          <div className="flex w-full h-full bg-primary/20 rounded-md"></div>
          <div className="flex w-full h-fit">
            <Button className="w-fit">Add Question</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
