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
import { updateReport } from "@/lib/action/admin";
import { InvoiceStatusEnum } from "@/lib/types/admin";
import { Report, ReportStatus } from "@/lib/types/admin/report";
import clsx from "clsx";
import { useTransition } from "react";
import {
  LuBadgeAlert,
  LuCheckCircle2,
  LuClock3,
  LuXCircle,
} from "react-icons/lu";
import { useToast } from "../ui/use-toast";
import { ReportMessageHover } from "./ReportMessageHover";

export default function ReportTable({
  data,
}: Readonly<{
  data: Report[];
}>) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (report: Report, value: ReportStatus) => {
    startTransition(async () => {
      const response = await updateReport(report, value);
      const notificationMessage = response
        ? {
            title: "Failed to update payment status",
            description:
              "Please try again in a few minutes or contact our support team",
          }
        : {
            title: "Success to update report status",
          };
      toast(notificationMessage);
    });
  };

  return (
    <div className="overflow-y-scroll md:h-5/6">
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead
              className="h-auto px-[5px] py-[10px] text-black text-center font-bold bg-emerald-100 rounded-tl-xl"
              colSpan={3}
            >
              Reporter
            </TableHead>
            <TableHead
              className="h-auto px-[5px] py-[10px] text-black text-center font-bold bg-rose-100 rounded-tr-xl"
              colSpan={4}
            >
              Reportee
            </TableHead>
          </TableRow>
          <TableRow className="">
            <TableHead className="h-auto px-[5px] py-[10px] w-[160px]">
              Name
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Email
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Message
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[160px]">
              Name
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Email
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Total Approved Reports
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {`${report.fromUser.firstName} ${report.fromUser.lastName}`}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {report.fromUser.email}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                <ReportMessageHover message={report.message} />
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {`${report.toUser.firstName} ${report.toUser.lastName}`}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {report.toUser.email}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                <span className="flex gap-[10px] items-center">
                  <LuBadgeAlert color="#E24F20" />
                  {report.toUser._count.ReportTo}
                </span>
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px] pr-[20px]">
                <Select
                  defaultValue={report.status}
                  value={report.status}
                  onValueChange={(value: string) =>
                    handleStatusChange(report, value as ReportStatus)
                  }
                >
                  <SelectTrigger
                    className="w-[150px] h-[38px] px-3 py-2"
                    disabled={
                      isPending ||
                      report.status === ReportStatus.REJECTED ||
                      report.status === ReportStatus.APPROVED
                    }
                  >
                    <div
                      className={`rounded-xl px-[9px] py-[3px] flex gap-[3px] items-center ${clsx(
                        {
                          "bg-[#FDF8EA] text-[#E2B720]":
                            report.status === ReportStatus.PENDING,
                          "bg-[#FDEDEA] text-[#E24F20]":
                            report.status === ReportStatus.REJECTED,
                          "bg-[#DDFAD6]  text-[#39A014]":
                            report.status === ReportStatus.APPROVED,
                        },
                      )}`}
                    >
                      {report.status === ReportStatus.PENDING && (
                        <LuClock3 className="w-[15px] h-[15px]" />
                      )}
                      {report.status === ReportStatus.REJECTED && (
                        <LuXCircle className="w-[15px] h-[15px]" />
                      )}
                      {report.status === ReportStatus.APPROVED && (
                        <LuCheckCircle2 className="w-[15px] h-[15px]" />
                      )}
                      {report.status}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={InvoiceStatusEnum.PENDING}
                      className=" text-[#E2B720] rounded-xl"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      value={InvoiceStatusEnum.REJECTED}
                      className="text-[#E24F20] rounded-xl"
                    >
                      Rejected
                    </SelectItem>
                    <SelectItem
                      value={InvoiceStatusEnum.APPROVED}
                      className="  text-[#39A014] rounded-xl"
                    >
                      Approved
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
