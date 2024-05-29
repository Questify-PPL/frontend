import React from "react";
import { Head } from "./Head";
import { BENEFIT } from "@/lib/constant";
import { BenefitCard } from "./BenefitCard";

export function Benefit() {
  return (
    <section
      className="flex flex-col items-center justify-center w-fit px-2 sm:px-8 py-6 lg:py-12 space-y-2"
      id="benefit"
      aria-label="benefit"
    >
      <Head content="Create an educationally optimal framework for diverse professional questionnaires" />
      {BENEFIT.map((benefit, index) => {
        return (
          <BenefitCard
            key={`benefit-${index + 1}`}
            benefit={benefit}
            index={index}
          />
        );
      })}
    </section>
  );
}
