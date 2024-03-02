"use client";

import React from "react";
import { useState } from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import CreateCard from "@/components/creator-side/CreateCard";
import { Button } from "@/components/ui/button";

export default function Create() {
  const [createCardState, setCreateCardState] = useState("hidden");

  const OpenCreateCard = () => {
    const newClass = createCardState === "hidden" ? "flex" : "hidden";
    setCreateCardState(newClass);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></CreatorNav>
        <div className="flex flex-col w-full">
          <Button className="w-fit" onClick={OpenCreateCard}>
            Create New Questionnaire
          </Button>
        </div>
      </div>
      <CreateCard
        className={`${createCardState}`}
        onCancel={OpenCreateCard}
      ></CreateCard>
    </main>
  );
}
