import React from "react";

const ShopInfoTable: React.FC = () => {
  return (
    <table className="w-80 h-6 mt-2 md:w-1/2 rounded-lg border border-[#E5EEF0]">
      <thead>
        <tr className="flex flex-row rounded-lg border bg-card text-card-foreground shadow-sm p-3">
          <th className="flex w-1/2">
            <span className="font-bold text-[#32636A] text-m">Item</span>
          </th>
          <th className="flex w-1/2">
            <span className="font-bold text-[#32636A] text-m">Date</span>
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default ShopInfoTable;
