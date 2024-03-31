import {
  LuClipboardCheck,
  LuHelpCircle,
  LuPercent,
  LuTimer,
} from "react-icons/lu";

const columns = [
  {
    name: "Title",
    icon: <></>,
  },
  {
    name: "Prize",
    icon: <></>,
  },
  {
    name: "Questions",
    icon: <LuHelpCircle className="w-4 h-4 mr-1 text-[#32636A]"></LuHelpCircle>,
  },
  {
    name: "Completed",
    icon: (
      <LuClipboardCheck className="w-4 h-4 mr-1 text-[#32636A]"></LuClipboardCheck>
    ),
  },
  {
    name: "Compl Rate",
    icon: <LuPercent className="w-4 h-4 mr-1 text-[#32636A]"></LuPercent>,
  },
  {
    name: "Updated",
    icon: <LuTimer className="w-4 h-4 mr-1 text-[#32636A]"></LuTimer>,
  },
  {
    name: "",
    icon: <></>,
  },
];

export function ResponsesHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function decidePercentage(index: number) {
    if (index === 0) {
      return "w-[25%]";
    }

    if (index == columns.length - 1) {
      return "w-[3.125%]";
    }

    return "md:w-[17.96875%] lg:w-[14.375%]";
  }

  return (
    <div className={`flex flex-col`} data-testid="responses-header">
      <div>
        <div
          className="md:flex flex-row flex-shrink-0 w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3 hidden"
          data-testid="response-table"
        >
          {columns.map((column, index) => (
            <div
              key={`column-${index + 1}`}
              className={`${index === 4 ? "md:hidden lg:flex" : ""} ${
                index === 0 ? "pl-4" : ""
              } text-[#32636A] flex-shrink-0 justify-start align-stretch flex font-bold text-[10px] leading-3 text-left md:text-sm text-wrap items-center ${decidePercentage(index)}`}
            >
              {column.icon}
              {column.name}
            </div>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
