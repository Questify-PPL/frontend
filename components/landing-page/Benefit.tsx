import React from "react";
import { Head } from "./Head";
import Image from "next/image";
import { BENEFIT } from "@/lib/constant";

export function Benefit() {
  return (
    <section
      className="flex flex-col items-center justify-center w-fit px-2 sm:px-8 py-6 lg:py-12 space-y-2"
      id="benefit"
    >
      <Head content="Create an educationally optimal framework for diverse professional questionnaires" />
      {BENEFIT.map((benefit, index) => {
        return (
          <div
            className={`flex sm:gap-8 gap-2 w-full items-center overflow-hidden pb-4 pt-4 lg:pb-8 lg:pt-16 ${index % 2 == 0 ? "flex-row" : "flex-row-reverse"}`}
            key={`benefit-${index + 1}`}
          >
            <Image
              src={benefit.src}
              alt={`Benefit ${index + 1}`}
              width={239}
              height={180}
              className="hidden sm:block"
            />
            <Image
              src={benefit.src}
              alt={`Benefit ${index + 1}`}
              width={119}
              height={90}
              className="block sm:hidden"
            />
            <div
              className={`flex flex-col space-y-2 text-primary sm:w-fit w-3/4 ${index % 2 == 0 ? "" : "items-end"}`}
            >
              <h2 className="font-bold lg:text-3xl md:text-2xl text-xl sm:block hidden">
                {benefit.title}
              </h2>
              <p className="font-medium lg:text-2xl md:text-xl sm:text-lg text-xs">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
