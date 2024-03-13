"use client";

import RespondentNav from "@/components/respondent-side/RespondentNav";
import { MPTHeader, MPTRows } from "@/components/my-participation";

export default function MyParticipation() {
  return (
    <main className="flex flex-row h-screen">
      <RespondentNav></RespondentNav>
      <div>
        <MPTHeader></MPTHeader>
        <MPTRows></MPTRows>
        <MPTRows></MPTRows>
        <MPTRows></MPTRows>
      </div>
    </main>
  );
}
