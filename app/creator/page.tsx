import React from "react";
import CreatorNav from "@/components/creator-side/CreatorNav";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Creator() {
  return (
    <main className="flex flex-col h-screen w-full">
      <div className="flex flex-row w-full h-full gap-5 p-5">
        <CreatorNav className="flex w-[20%]" state="home"></CreatorNav>
        <div className="flex flex-col w-[60%]">
          <Card>
            <div>
              <div></div>
              <div></div>
            </div>

            <Separator className="bg-[#E5EEF0]"></Separator>

            <div className="flex flex-row w-full">
              <Button></Button>
              <Button></Button>

              <Button></Button>

              <Button></Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
