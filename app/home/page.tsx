import React from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import HomeCard from "@/components/creator-side/HomeCard";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5">
        <CreatorNav
          className="absolute md:relative md:flex md:w-[20%]"
          state="home"
        ></CreatorNav>
        <div className="flex flex-col w-full">
          <HomeCard className="w-full"></HomeCard>
        </div>
      </div>
    </main>
  );
}
