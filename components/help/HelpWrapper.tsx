"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useState } from "react";
import { ContactModal } from "@/components/help";
import { useRouter } from "next/navigation";
import FAQSection from "./FAQSection";

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
        <div className="flex flex-col w-full space-y-10 flex-1 items-center py-5">
          <div className="w-[80%]">
            <div className="font-bold flex text-2xl justify-center text-center pb-4">
              Frequently Asked Questions
            </div>
            <FAQSection>

            </FAQSection>
          </div>
          <div className="flex flex-col md:w-[40%] sm:w-[50%] w-[80%] gap-3 pb-5">
            <Button
              className="w-full"
              onClick={handleContactModal}
              data-testid="button-contact"
            >
              Contact Us
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.replace("/home")}
            >
              Back
            </Button>
          </div>
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
