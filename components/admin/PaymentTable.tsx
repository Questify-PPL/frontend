"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  LuPlusCircle,
  LuDownload,
  LuCoins,
  LuCheckCircle2,
  LuClock3,
  LuXCircle,
} from "react-icons/lu";
import clsx from "clsx";
import { Invoice, InvoiceStatus } from "@/lib/types";
import { useTransition } from "react";
import { updatePaymentStatus } from "@/lib/action";
import { useToast } from "../ui/use-toast";

export default function PaymentTable({
  data,
}: Readonly<{
  data: Invoice[];
}>) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStatusChange = (invoice: Invoice, value: InvoiceStatus) => {
    startTransition(async () => {
      const response = await updatePaymentStatus(invoice, value);

      if (response) {
        toast({
          title: "Failed to update payment status",
          description:
            "Please try again in a few minutes or contact our support team",
        });
      }

      toast({
        title: "Success to update payment status",
      });
    });
  };

  return (
    <div className="overflow-y-scroll md:h-5/6">
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="h-auto px-[5px] py-[10px] pl-[20px] w-[160px]">
              Name
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Exhange
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Amount
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[100px]">
              Payment
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] w-[292px]">
              Proof Image/Account Number
            </TableHead>
            <TableHead className="h-auto px-[5px] py-[10px] pr-[20px] w-[140px]">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="h-auto px-[5px] py-[10px] pl-[20px] font-bold">
                {invoice.name}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px] text-[10px]">
                <span className="flex gap-[10px] items-center">
                  {invoice.exchange === "Top Up" && (
                    <LuPlusCircle
                      className="w-[12px] h-[12px]"
                      color="#E2B720"
                    />
                  )}
                  {invoice.exchange === "Withdraw" && (
                    <LuDownload className="w-[12px] h-[12px]" color="#E2B720" />
                  )}
                  {invoice.exchange}
                </span>
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                <span className="flex gap-[10px] items-center">
                  <LuCoins color="#E2B720" />
                  {invoice.amount.toLocaleString("id-ID")}
                </span>
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {invoice.payment}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px]">
                {(invoice.proof && (
                  <a href={`https://${invoice.proof}`} className="underline">
                    {invoice.proof}
                  </a>
                )) ||
                  invoice.accountNumber}
              </TableCell>
              <TableCell className="h-auto px-[5px] py-[10px] pr-[20px]">
                <Select
                  defaultValue={invoice.status}
                  value={invoice.status}
                  onValueChange={(value: string) =>
                    handleStatusChange(invoice, value as InvoiceStatus)
                  }
                >
                  <SelectTrigger
                    className="w-[140px] h-[38px] px-3 py-2"
                    disabled={isPending}
                  >
                    <div
                      className={`rounded-xl px-[9px] py-[3px] flex gap-[3px] items-center ${clsx(
                        {
                          "bg-[#FDF8EA] text-[#E2B720]":
                            invoice.status === "Pending",
                          "bg-[#FDEDEA] text-[#E24F20]":
                            invoice.status === "Rejected",
                          "bg-[#DDFAD6]  text-[#39A014]":
                            invoice.status === "Approved",
                        },
                      )}`}
                    >
                      {invoice.status === "Pending" && (
                        <LuClock3 className="w-[15px] h-[15px]" />
                      )}
                      {invoice.status === "Rejected" && (
                        <LuXCircle className="w-[15px] h-[15px]" />
                      )}
                      {invoice.status === "Approved" && (
                        <LuCheckCircle2 className="w-[15px] h-[15px]" />
                      )}
                      {invoice.status}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="Pending"
                      className=" text-[#E2B720] rounded-xl"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="Rejected"
                      className="text-[#E24F20] rounded-xl"
                    >
                      Rejected
                    </SelectItem>
                    <SelectItem
                      value="Approved"
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
