import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { LuCheckCircle2, LuClock, LuCoins, LuXCircle } from "react-icons/lu";

const TopUpInfoTable = ({ invoiceItems }: { invoiceItems: any[] }) => {
  const hasInvoices = invoiceItems && invoiceItems.length > 0;
  const statusStyles = {
    APPROVED: "bg-[#DDFAD6] text-[#39A014]",
    PENDING: "bg-[#FDF8EA] text-[#E2B720]",
    REJECTED: "bg-[#FDEDEA] text-[#E24F20]",
  };

  const [formattedDates, setFormattedDates] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const newFormattedDates: { [key: string]: string } = {};
    invoiceItems.forEach((item) => {
      // Ensure dates are parsed in a universal format like ISO and then formatted
      newFormattedDates[item.id] = format(
        parseISO(item.createdAt),
        "dd/MM/yyyy",
      );
    });
    setFormattedDates(newFormattedDates);
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
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[item.status as keyof typeof statusStyles]}`}
                >
                  <span
                    className={`pr-1 py-1 ${statusStyles[item.status as keyof typeof statusStyles]}`}
                  >
                    {item.status === "APPROVED" && <LuCheckCircle2 />}
                    {item.status === "PENDING" && <LuClock />}
                    {item.status === "REJECTED" && <LuXCircle />}
                  </span>
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
