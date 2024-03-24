"use client";

import RespondentNav from "@/components/respondent-side/RespondentNav";
import { FormsAsProps } from "@/lib/types";
import {
  MPTable,
  MPContent,
  MPMobile,
} from "@/components/respondent-side/my-participation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { isEnded } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";

export function MPWrapper({
  forms,
  isError = false,
}: Readonly<
  FormsAsProps & {
    isError?: boolean;
  }
>) {
  const [data, setData] = useState(forms);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filters = ["All", "On Going", "Ended"];
  const isMobile = useMediaQuery(768);

  useEffect(() => {
    const filterData = (selectedFilter: string, query: string) => {
      let filteredForms = forms;

      if (query) {
        filteredForms = filteredForms.filter((form) =>
          form.title.toLowerCase().includes(query.toLowerCase()),
        );
      }
      if (selectedFilter !== "All" && !isMobile) {
        filteredForms = filteredForms.filter((form) => {
          if (selectedFilter === "On Going") {
            return !isEnded(form.endedAt);
          } else {
            return isEnded(form.endedAt);
          }
        });
      }
      setData(filteredForms);
    };

    filterData(selectedFilter, query);
  }, [selectedFilter, query, isMobile, forms]);

  const errorMessage = () => (
    <div
      className={`flex items-center justify-center text-center ${isMobile ? "text-sm pt-3 pb-1" : "text-base pt-5"}`}
    >
      There&apos;s an issue with fetching the data
    </div>
  );

  return (
    <div
      className="flex flex-col md:flex-row w-full h-full gap-4 p-5 pt-3 relative"
      data-testid="mp-wrapper"
    >
      <RespondentNav state="responses"></RespondentNav>
      <div className="flex flex-col w-full space-y-3 flex-1">
        <Input
          type="search"
          className="h-11 px-3 py-[10px] bg-[#E5EEF0] text-[#324B4F] rounded-3xl font-semibold text-sm"
          placeholder="Search title(s)"
          onChange={(e) => setQuery(e.target.value)}
        />
        <hr className="my-[10px]" />
        {isMobile ? (
          <div className="flex flex-col w-full space-y-4 pt-1">
            <span className="pt-2">On going</span>
            <div className="flex flex-col w-full flex-1">
              {data
                .filter((form) => !isEnded(form.endedAt))
                .map((form) => (
                  <MPMobile form={form} key={form.id}></MPMobile>
                ))}
              {isError && errorMessage()}
            </div>
            <span className="pt-2">Ended</span>
            <div className="flex flex-col w-full space-y-8 flex-1">
              {data
                .filter((form) => isEnded(form.endedAt))
                .map((form, index, array) => (
                  <MPMobile
                    key={form.id}
                    form={form}
                    className={index === array.length - 1 ? "pb-32" : ""}
                  ></MPMobile>
                ))}
              {isError && errorMessage()}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center md:justify-start gap-[6px] mb-8 pb-6">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  data-testid={`filter-${filter.replace(" ", "").toLowerCase()}`}
                  className={`h-[23px] font-semibold rounded-3xl text-[12px] bg-[#E5EEF0] text-[#32636A] py-[2px] px-[12px] hover:bg-[#32636A] hover:text-[#E5EEF0] ${selectedFilter === filter ? "bg-[#32636A] text-[#E5EEF0]" : ""}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <MPTable>
              {data.map((form) => (
                <MPContent key={form.id} form={form} />
              ))}
            </MPTable>
            {isError && errorMessage()}
          </>
        )}
      </div>
    </div>
  );
}
