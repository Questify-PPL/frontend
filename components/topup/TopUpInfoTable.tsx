import React, { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { LuCheckCircle2, LuClock, LuCoins, LuXCircle } from "react-icons/lu";
import { InvoiceItem } from "@/lib/types/topup.type";

enum Status {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

const statusConfig = {
  [Status.APPROVED]: {
    style: "bg-[#DDFAD6] text-[#39A014]",
    Icon: LuCheckCircle2,
  },
  [Status.PENDING]: {
    style: "bg-[#FDF8EA] text-[#E2B720]",
    Icon: LuClock,
  },
  [Status.REJECTED]: {
    style: "bg-[#FDEDEA] text-[#E24F20]",
    Icon: LuXCircle,
  },
};

const TopUpInfoTable = ({ invoiceItems }: { invoiceItems: InvoiceItem[] }) => {
  const hasInvoices = invoiceItems && invoiceItems.length > 0;

  const formattedDates = useMemo(() => {
    const newFormattedDates: { [key: string]: string } = {};

    invoiceItems.forEach((item) => {
      newFormattedDates[item.id] = format(
        parseISO(item.createdAt),
        "dd/MM/yyyy",
      );
    });

    return newFormattedDates;
  }, [invoiceItems]);

  return (
    <table className="w-80 h-6 mt-2 md:w-1/2 rounded-lg border border-[#E5EEF0]">
      <thead>
        <tr className="flex flex-row justify-between bg-card text-card-foreground shadow-sm p-3">
          <th className="w-1/3 text-left">
            <span className="font-bold text-[#32636A]">Credit</span>
          </th>
          <th className="w-1/3 text-left">
            <span className="font-bold text-[#32636A]">Date</span>
          </th>
          <th className="w-1/3 text-left">
            <span className="font-bold text-[#32636A]">Status</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {hasInvoices ? (
          invoiceItems.map((item) => (
            <tr
              key={item.id}
              className="flex flex-row justify-between p-3 border-b border-[#E5EEF0]"
            >
              <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <LuCoins
                    className="text-[#E2B720] mr-2"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  />
                  {item.amount.toLocaleString()}
                </div>
              </td>
              <td className="w-1/3 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formattedDates[item.id] || "Loading..."}
              </td>
              <td className="w-1/3 px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusConfig[item.status as keyof typeof statusConfig].style}`}
                >
                  {React.createElement(
                    statusConfig[item.status as keyof typeof statusConfig].Icon,
                    {
                      className: "pr-1 py-1",
                      style: { verticalAlign: "middle" },
                    },
                  )}
                  {item.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr className="flex flex-row justify-center p-3">
            <td
              colSpan={3}
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              No current invoices.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TopUpInfoTable;
