import {
  LuClipboardCheck,
  LuDroplets,
  LuFunctionSquare,
  LuHelpCircle,
  LuTimer,
} from "react-icons/lu";

interface InfoTableProps {
  children: React.ReactNode;
  isRespondent?: boolean;
}

const tableColumnsCreator = [
  {
    name: "Title",
    icon: <></>,
  },
  {
    name: "Prize",
    icon: <></>,
  },
  {
    name: "Modified",
    icon: <></>,
  },
  {
    name: "Questions",
    icon: (
      <LuHelpCircle className="w-4 h-4 mr-1 text-[#32636A] md:hidden lg:block"></LuHelpCircle>
    ),
  },
  {
    name: "Time",
    icon: (
      <LuTimer className="w-4 h-4 mr-1 text-[#32636A] md:hidden lg:block"></LuTimer>
    ),
  },
  {
    name: "Theme",
    icon: (
      <LuDroplets className="w-4 h-4 mr-1 text-[#32636A] md:hidden lg:block"></LuDroplets>
    ),
  },
  {
    name: "Font",
    icon: (
      <LuFunctionSquare className="w-4 h-4 mr-1 text-[#32636A] md:hidden lg:block"></LuFunctionSquare>
    ),
  },
  {
    name: "",
    icon: <></>,
  },
];

const tableColumnsRespondent = [
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
    icon: (
      <LuClipboardCheck className="w-4 h-4 mr-1 text-[#32636A] md:hidden lg:block"></LuClipboardCheck>
    ),
  },
  {
    name: "End Date",
    icon: <></>,
  },
  {
    name: "",
    icon: <></>,
  },
];

export function InfoTable({
  children,
  isRespondent = false,
}: Readonly<InfoTableProps>) {
  function decidePercentage(index: number, tableColumns: any) {
    if (index === 0) {
      return "w-[25%]";
    }

    if (index == tableColumns.length - 1) {
      return "w-[3.125%]";
    }

    return isRespondent ? `w-[23.958%]` : `md:w-[14.375%] lg:w-[11.97916667%]`;
  }

  return (
    <div className={`flex flex-col overflow-y-scroll`}>
      <div>
        <div className="md:flex flex-row flex-shrink-0 w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3 pr-6 hidden">
          {!isRespondent && (
            <>
              {tableColumnsCreator.map((column, index) => (
                <div
                  key={`column-${index + 1}`}
                  className={` ${
                    index === 0 ? "pl-[34px]" : ""
                  } flex text-[#32636A] justify-start text-[10px] leading-3 text-left font-normal md:text-sm text-wrap items-center ${decidePercentage(index, tableColumnsCreator)} ${index == 5 ? "md:hidden lg:flex" : ""}`}
                >
                  {column.icon}
                  {column.name}
                </div>
              ))}
            </>
          )}
          {isRespondent && (
            <>
              {tableColumnsRespondent.map((column, index) => {
                return (
                  <div
                    key={`column-${index + 1}`}
                    className={` ${
                      index === 0 ? "pl-4" : ""
                    } text-[#32636A] flex-shrink-0 justify-start align-stretch flex font-bold text-[10px] leading-3 text-left md:text-sm text-wrap items-center ${decidePercentage(index, tableColumnsRespondent)}`}
                  >
                    {column.icon}
                    {column.name}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="overflow-y-scroll">{children}</div>
    </div>
  );
}
