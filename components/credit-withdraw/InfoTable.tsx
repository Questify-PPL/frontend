interface InfoTableProps {
  children: React.ReactNode;
}

const withdrawTableColumns = [
  {
    name: "Amount",
  },
  {
    name: "Date",
  },
  {
    name: "Account",
  },
  {
    name: "Status",
  },
];

export function InfoTable({ children }: Readonly<InfoTableProps>) {
  function decidePercentage(index: number) {
    if (index === 1) {
      return "w-[20%]";
    }

    if (index === 3) {
      return "w-[30%]";
    } else {
      return "w-[25%]";
    }
  }

  return (
    <table className={`flex flex-col overflow-y-scroll`}>
      <thead>
        <tr className="flex flex-row gap-[10px] w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3 pr-6">
          {withdrawTableColumns.map((column, index) => (
            <th
              key={`column-${index + 1}`}
              className={`flex text-[#32636A] justify-start text-xs font-medium leading-3 text-left md:text-sm text-wrap items-center ${decidePercentage(index)}`}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="overflow-y-scroll">{children}</tbody>
    </table>
  );
}
