"use client";

import { Button } from "@/components/ui/button";
import CreatorNav from "../CreatorNav";
import CreateCard from "./CreateCard";
import { useEffect, useState } from "react";
import { getQuestionnairesOwned } from "@/lib/action/form";
import DraftTable from "./DraftTable";
import { LuMoreHorizontal } from "react-icons/lu";
import { Card } from "@/components/ui/card";

export function CreateModal() {
  const [createCardState, setCreateCardState] = useState("hidden");

  const OpenCreateCard = () => {
    const newClass = createCardState === "hidden" ? "flex" : "hidden";
    setCreateCardState(newClass);
  };

  interface DraftDataItem {
    id: string;
    title: string;
    prize: number;
    prizeType: string;
    maxWinner: number;
    updatedAt: string;
  }

  const [draftData, setDraftData] = useState<DraftDataItem[]>([]);

  useEffect(() => {
    getQuestionnairesOwned().then((response) => {
      setDraftData(response.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="action"
        ></CreatorNav>
        <div className="flex flex-col w-full gap-8">
          <Button className="flex w-fit" onClick={OpenCreateCard}>
            Create a new Questionnaire
          </Button>
          <div className="flex flex-col">
            <Card className="flex flex-row h-fit w-full text-[#32636A] font-medium text-left text-xs text-wrap gap-[10px] px-[44px] py-[10px]">
              <span className="w-full text-sm text-wrap">Title</span>
              <span className="w-full text-sm text-wrap">Prize</span>
              <span className="w-full text-sm text-wrap">Modified</span>
              <span className="text-[#32636A] flex">
                <LuMoreHorizontal className="w-4 h-4"></LuMoreHorizontal>
              </span>
            </Card>
            {draftData.map((data, index) => (
              <DraftTable
                key={index}
                id={data.id}
                title={data.title}
                prize={data.prize}
                prizeType={data.prizeType}
                maxWinner={data.maxWinner}
                modified={data.updatedAt}
              ></DraftTable>
            ))}
          </div>
        </div>
      </div>
      <CreateCard
        className={`${createCardState}`}
        onCancel={OpenCreateCard}
      ></CreateCard>
    </>
  );
}
