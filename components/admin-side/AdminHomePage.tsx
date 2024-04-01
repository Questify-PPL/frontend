"use client";
import AdminNav from "./AdminNav";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PaymentTable from "../admin/PaymentTable";
import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Invoice } from "@/lib/types/admin";
import clsx from "clsx";

const filters = [
  { name: "All", type: "all" },
  { name: "Top Up", type: "top up" },
  { name: "Withdraw", type: "withdraw" },
];

export function AdminHomePage({ invoices }: Readonly<{ invoices: Invoice[] }>) {
  return (
    <div
      className="flex flex-col w-full h-full absolute"
      data-testid="admin-homepage"
    >
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <AdminNav />
        <PaymentInfo invoices={invoices} />
      </div>
    </div>
  );
}

export function PaymentInfo({ invoices }: Readonly<{ invoices: Invoice[] }>) {
  const [data, setData] = useState(invoices);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((item) => item.exchange.toLowerCase() === selectedFilter);
  const searchQuery = useRef("");

  useEffect(() => {
    searchItem(searchQuery.current);
  }, [invoices]);

  function searchItem(query: string) {
    searchQuery.current = query;
    if (!query) {
      setData(invoices);
      return;
    }

    const fuse = new Fuse(invoices, {
      threshold: 0.1,
      keys: ["creatorName"],
    });
    const result = fuse.search(query).map((item) => item.item);
    setData(result.length !== 0 ? result : []);
  }

  return (
    <div className="flex-1">
      <Input
        type="search"
        className="h-9 px-3 py-[10px] bg-[#E5EEF0] text-[#324B4F] rounded-3xl font-semibold text-xs"
        placeholder="Search name"
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
      <PaymentTable data={filteredData} />
    </div>
  );
}
