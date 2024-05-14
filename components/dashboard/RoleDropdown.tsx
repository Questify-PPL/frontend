"use client";
import { titleCase } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Session } from "next-auth";
import { useTransition } from "react";
import { changeRole } from "@/lib/action";
import { UserRole } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

export function RoleDropdown({
  session,
}: Readonly<{ session: Session | null }>) {
  const activeRole = session?.user.activeRole;
  // eslint-disable-next-line no-unused-vars
  const [_isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRoleChange = (value: string) => {
    startTransition(async () => {
      await changeRole(value as UserRole);
      router.refresh();
    });
  };

  return (
    <Select
      name="role"
      defaultValue={activeRole}
      onValueChange={handleRoleChange}
    >
      <SelectTrigger className="w-[197px] text-xs h-6 px-3 py-1 md:text-base">
        <span className="">Role: </span>
        <SelectValue placeholder={titleCase(activeRole)} />
      </SelectTrigger>

      <SelectContent>
        {session?.user.roles.map((role) => (
          <SelectItem value={role} key={role}>
            {titleCase(role)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
