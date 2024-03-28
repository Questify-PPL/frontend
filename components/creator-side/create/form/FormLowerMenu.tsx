import { Button } from "@/components/ui/button";
import {
  LuPanelLeftClose,
  LuPanelRightClose,
  LuSmartphone,
  LuMonitor,
} from "react-icons/lu";
import { Card } from "@/components/ui/card";

interface FormLowerMenuProps {
  onChange?: () => void;
  isMobile?: boolean;
}

const activeLButton =
  "flex font-semibold text-sm rounded-r-none px-3.5 h-full items-center rounded-l-md bg-background text-primary hover:bg-background hover:text-primary gap-1 border border-[1px]";
const activeRButton =
  "flex font-semibold text-sm rounded-l-none px-3.5 h-full items-center rounded-r-md bg-background text-primary hover:bg-background hover:text-primary gap-1 border border-[1px]";
const inactiveButton =
  "flex font-semibold text-sm rounded-sm px-3.5 h-full items-center bg-transparent text-background hover:bg-transparent hover:text-background gap-1";

export function FormLowerMenu ({
  onChange = () => {},
  isMobile = true,
}: Readonly<FormLowerMenuProps>)  {
  return (
    <Card className="flex flex-row h-fit justify-between items-center bg-background p-2 w-full">
      <Button
        variant="outline"
        className="h-full text-primary hover:text-primary py-2.5"
      >
        <LuPanelLeftClose className="w-4 h-4" />
      </Button>

      <div className="flex flex-row bg-[#95B0B4] h-full rounded-md">
        <div
          className={isMobile ? activeLButton : inactiveButton}
          onClick={onChange}
        >
          <LuSmartphone className="w-4 h-4" />
          <span>Mobile</span>
        </div>
        <div
          className={!isMobile ? activeRButton : inactiveButton}
          onClick={onChange}
        >
          <LuMonitor className="w-4 h-4" />
          <span>Desktop</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="h-full text-primary hover:text-primary py-2.5"
      >
        <LuPanelRightClose className="w-4 h-4" />
      </Button>
    </Card>
  );
};
