import { Card } from "@/components/ui/card";
import { Fragment } from "react";
import { LuGlasses, LuHelpCircle, LuUser } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

export function SummaryLoadingNav({
  activeTab = "summary",
}: Readonly<{
  activeTab?: "summary" | "question" | "individual";
}>) {
  const NAVIGATION_CONST = [
    {
      icon: (
        <LuGlasses
          className={`w-5 h-min-5 h-5 ${activeTab === "summary" ? "text-primary" : "text-transparent"}`}
        />
      ),
      label: "Summary",
      isActive: activeTab === "summary",
    },
    {
      icon: (
        <LuHelpCircle
          className={`w-5 h-min-5 h-5 ${activeTab === "question" ? "text-primary" : "text-transparent"}`}
        />
      ),
      label: "Question",
      isActive: activeTab === "question",
    },
    {
      icon: (
        <LuUser
          className={`w-5 h-min-5 h-5 ${activeTab === "individual" ? "text-primary" : "text-transparent"}`}
        />
      ),
      label: "Individual",
      isActive: activeTab === "individual",
    },
  ];

  const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-full w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
          md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
  const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
  const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

  const renderButton = (
    icon: React.ReactNode,
    label: string,
    isActive: boolean,
  ) => (
    <Button className={buttonClass}>
      {isActive ? (
        <span className={buttonIndicatorClassSm}></span>
      ) : (
        <span className={`${buttonIndicatorClassSm} bg-transparent`}></span>
      )}
      <div
        className={`flex w-full flex-col items-center md:flex-row md:py-3 md:gap-3 md:pr-4 md:pl-5 lg:pr-6 gap-0.5 md:items-center relative`}
      >
        {icon}
        <div
          className={`font-bold text-xs md:text-sm text-wrap md:text-nowrap ${isActive ? "text-[#324B4F]" : "text-transparent"}`}
        >
          {label}
        </div>
        {!isActive && (
          <Skeleton className="w-full self-stretch h-full md:h-8 absolute overflow-hidden md:left-1 lg:left-2 xl:left-1" />
        )}
      </div>
      {isActive ? (
        <span className={buttonIndicatorClassMd}></span>
      ) : (
        <span className={`${buttonIndicatorClassMd} bg-transparent`}></span>
      )}
    </Button>
  );

  return (
    <div
      className={`flex p-4 md:p-0 fixed bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:w-fit w-full !left-0 z-10`}
    >
      <Card className="flex px-2 md:flex-col w-full md:h-full md:gap-0 gap-5 md:py-2 md:px-0 overflow-x-auto">
        {NAVIGATION_CONST.map((nav) => (
          <Fragment key={nav.label}>
            <div className="w-full lg:block hidden">
              {renderButton(nav.icon, nav.label, nav.isActive)}
            </div>
            <div className="w-full md:block lg:hidden hidden">
              {renderButton(
                nav.icon,
                nav.label == "Create Questionnaire" ? "Create QRE" : nav.label,
                nav.isActive,
              )}
            </div>
            <div className="w-full md:hidden block">
              {renderButton(nav.icon, nav.label, nav.isActive)}
            </div>
          </Fragment>
        ))}
      </Card>
    </div>
  );
}
