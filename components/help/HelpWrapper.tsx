"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useState } from "react";
import { ContactModal } from "@/components/help";
import { useRouter } from "next/navigation";

export function HelpWrapper({ user }: Readonly<{ user: User }>) {
  const [contactModalState, setContactModalState] = useState("hidden");
  const router = useRouter();

  const handleContactModal = () => {
    const newClass = contactModalState === "hidden" ? "flex" : "hidden";
    setContactModalState(newClass);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative">
        <div className="flex flex-col w-full space-y-4 flex-1 items-center justify-center">
          <Button
            className="flex md:w-fit w-full"
            onClick={handleContactModal}
            data-testid="button-contact"
          >
            Contact Us
          </Button>
          <Button
            className="flex md:w-fit w-full"
            onClick={() => router.replace("/home")}
          >
            Back
          </Button>
        </div>
      </div>
      <ContactModal
        className={`${contactModalState}`}
        name={`${user.firstName || ""} ${user.lastName || ""}`.trim()}
        email={user.email}
        closeModal={handleContactModal}
      ></ContactModal>
    </>
  );
}
