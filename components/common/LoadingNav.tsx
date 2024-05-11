import { Card } from "@/components/ui/card";
import { Fragment } from "react";
import { LuClipboardList, LuHistory, LuHome } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export function LoadingNav({
  state,
  label,
}: Readonly<{
  state?: "home" | "action" | "responses";
  label: string;
}>) {
  const NAVIGATION_CONST = [
    {
      icon: <LuHome className="w-full h-min-5 h-5 text-primary" />,
      label: label,
      isActive: state === "home",
    },
    {
      icon: <LuClipboardList className="w-full h-min-5 h-5 text-primary" />,
      label: label,
      isActive: state === "action",
    },
    {
      icon: <LuHistory className="w-full h-min-5 h-5 text-primary" />,
      label: label,
      isActive: state === "responses",
    },
  ];

  const buttonClass = `flex flex-col justify-start py-0 pb-2 px-2 gap-2 h-full w-full bg-background hover:bg-[#F3F8F9] text-[#324B4F] hover:text-[#324B4F]
  md:flex-row md:justify-between md:px-0 md:pb-0 rounded-none`;
  const buttonIndicatorClassSm = `md:hidden w-full h-0.5 bg-primary rounded-b-md`;
  const buttonIndicatorClassMd = `hidden w-1 h-full bg-primary rounded-l-md md:flex`;

  const renderButton = (
    icon: React.ReactNode,
    label: string,
    isActive: boolean
  ) => (
    <Button className={buttonClass}>
      {isActive ? (
        <span className={buttonIndicatorClassSm}></span>
      ) : (
        <span className={`${buttonIndicatorClassSm} bg-transparent`}></span>
      )}
      <div className="flex flex-col md:flex-row gap-0.5 md:gap-3 md:pl-5 md:py-3 md:pr-4 lg:pr-6  md:items-center">
        {icon}
        <div className="font-bold text-xs md:text-sm text-[#324B4F] text-wrap md:text-nowrap">
          {label}
        </div>
      </div>
      {isActive ? (
        <span className={buttonIndicatorClassMd}></span>
      ) : (
        <span className={`${buttonIndicatorClassMd} bg-transparent`}></span>
      )}
    </Button>
  );

  return (
    <div className={`flex p-4 md:p-0 `}>
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
                nav.isActive
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
