"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import Fuse from "fuse.js";
import { useCallback, useEffect, useRef, useState } from "react";

import { User } from "@/lib/types";
import { UserAccessStatus } from "@/lib/types/admin/user";
import UserTable from "./UserTable";

const filters = [
  { name: "All", type: "all" },
  { name: "Free", type: UserAccessStatus.ALLOWED },
  { name: "Blocked", type: UserAccessStatus.BLOCKED },
];

export function UserInfo({ users }: Readonly<{ users: User[] }>) {
  const [data, setData] = useState(users);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((user) => {
          if (selectedFilter === UserAccessStatus.ALLOWED) {
            return !user.isBlocked;
          } else if (selectedFilter === UserAccessStatus.BLOCKED) {
            return user.isBlocked;
          }
        });
  const searchQuery = useRef("");

  const searchItem = useCallback(
    (query: string) => {
      searchQuery.current = query;
      if (!query) {
        setData(users);
        return;
      }

      const fuse = new Fuse(users, {
        threshold: 0.1,
        keys: ["email", "firstName", "lastName", "phoneNumber", "companyName"],
      });
      const result = fuse.search(query).map((item) => item.item);
      setData(result.length !== 0 ? result : []);
    },
    [users],
  );

  useEffect(() => {
    searchItem(searchQuery.current);
  }, [searchItem]);

  return (
    <div className="flex-1">
      <Input
        type="search"
        className="h-9 px-3 py-[10px] bg-[#E5EEF0] text-[#324B4F] rounded-3xl font-semibold text-xs"
        placeholder="Search user"
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
      <UserTable data={filteredData} />
    </div>
  );
}
