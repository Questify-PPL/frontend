import { UserDropdownMenu } from "@/components/dashboard";
import React from "react";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-screen w-full">
      <UserDropdownMenu />
      {children}
    </main>
  );
}
