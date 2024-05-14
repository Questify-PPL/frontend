"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Report, ReportStatus } from "@/lib/types/admin/report";
import clsx from "clsx";
import Fuse from "fuse.js";
import { useCallback, useEffect, useRef, useState } from "react";

import ReportTable from "./ReportTable";

const filters = [
  { name: "All", type: "all" },
  { name: "Pending", type: ReportStatus.PENDING },
  { name: "Approved", type: ReportStatus.APPROVED },
  { name: "Rejected", type: ReportStatus.REJECTED },
];

export function ReportInfo({ reports }: Readonly<{ reports: Report[] }>) {
  const [data, setData] = useState(reports);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((item) => item.status === selectedFilter);
  const searchQuery = useRef("");

  const searchItem = useCallback(
    (query: string) => {
      searchQuery.current = query;
      if (!query) {
        setData(reports);
        return;
      }

      const fuse = new Fuse(reports, {
        threshold: 0.1,
        keys: [
          "fromUser.firstName",
          "fromUser.lastName",
          "fromUser.email",
          "toUser.firstName",
          "toUser.lastName",
          "toUser.email",
        ],
      });
      const result = fuse.search(query).map((item) => item.item);
      setData(result.length !== 0 ? result : []);
    },
    [reports],
  );

  useEffect(() => {
    searchItem(searchQuery.current);
  }, [searchItem]);

  return (
    <div className="flex-1">
      <Input
        type="search"
        className="h-9 px-3 py-[10px] bg-[#E5EEF0] text-[#324B4F] rounded-3xl font-semibold text-xs"
        placeholder="Search name/email"
        onChange={(e) => searchItem(e.target.value)}
      ></Input>
      <hr className="my-[10px]" />
      <div className="flex justify-center md:justify-start gap-[6px] mb-8">
        {filters.map((filter) => (
          <Button
            key={filter.type}
            className={`h-[18px] text-[10px] bg-[#E5EEF0] text-[#32636A] py-[2px] px-[10px] hover:bg-[#32636A] hover:text-[#E5EEF0] ${clsx(
              {
                "bg-[#32636A] text-[#E5EEF0]": selectedFilter === filter.type,
              },
            )}`}
            onClick={() => setSelectedFilter(filter.type)}
          >
            {filter.name}
          </Button>
        ))}
      </div>
      <ReportTable data={filteredData} />
    </div>
  );
}
