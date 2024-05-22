"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateUserBlockedStatus } from "@/lib/action/admin";
import { User } from "@/lib/types";
import { UserAccessStatus } from "@/lib/types/admin/user";
import clsx from "clsx";
import { useTransition } from "react";
import { LuBadgeAlert, LuCheckCircle2, LuXCircle } from "react-icons/lu";
import { useToast } from "../ui/use-toast";

export default function UserTable({
  data,
}: Readonly<{
  data: User[];
}>) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (user: User, value: UserAccessStatus) => {
    startTransition(async () => {
      const response = await updateUserBlockedStatus(user.id, value);
      const notificationMessage = response
        ? {
            title: "Failed to update user status",
            description:
              "Please try again in a few minutes or contact our support team",
          }
        : {
            title: "Success to update user status",
          };
      toast(notificationMessage);
    });
  };

  return (
    <div className="overflow-y-scroll md:h-5/6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-auto px-[5px] py-[10px] w-[160px]">
              Name
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Email
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Role
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[160px]">
              Phone Number
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Company
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Credit
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Total Approved Reported
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Access
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((user) => {
            const userBlockedStatus = user.isBlocked
              ? UserAccessStatus.BLOCKED
              : UserAccessStatus.ALLOWED;
            return (
              <TableRow key={user.id}>
                <TableCell className="h-auto px-[5px] py-[10px]">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  {user.email}
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  {user.roles.join(", ")}
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  {user.phoneNumber}
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  {user.companyName}
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  {user.credit}
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px]">
                  <span className="flex gap-[10px] items-center">
                    <LuBadgeAlert color="#E24F20" />
                    {user._count?.ReportTo}
                  </span>
                </TableCell>
                <TableCell className="h-auto px-[5px] py-[10px] pr-[20px]">
                  <Select
                    defaultValue={userBlockedStatus}
                    value={userBlockedStatus}
                    onValueChange={(value: UserAccessStatus) =>
                      handleStatusChange(user, value)
                    }
                  >
                    <SelectTrigger
                      className="w-[150px] h-[38px] px-3 py-2"
                      disabled={isPending}
                    >
                      <div
                        className={`rounded-xl px-[9px] py-[3px] flex gap-[3px] items-center ${clsx(
                          {
                            "bg-[#FDEDEA] text-[#E24F20]": user.isBlocked,
                            "bg-[#DDFAD6]  text-[#39A014]": !user.isBlocked,
                          },
                        )}`}
                      >
                        {user.isBlocked && (
                          <LuXCircle className="w-[15px] h-[15px]" />
                        )}
                        {!user.isBlocked && (
                          <LuCheckCircle2 className="w-[15px] h-[15px]" />
                        )}
                        {userBlockedStatus}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value={UserAccessStatus.ALLOWED}
                        className="  text-[#39A014] rounded-xl"
                      >
                        Allowed
                      </SelectItem>
                      <SelectItem
                        value={UserAccessStatus.BLOCKED}
                        className="text-[#E24F20] rounded-xl"
                      >
                        Blocked
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
