import { BackAndExport } from "@/components/dashboard/BackAndExport";
import { SummaryTitle } from "./SummaryTitle";
import { useSummaryContext } from "@/lib/context/SummaryContext";

export function SummaryDesktopHeader() {
  const { exportData, session } = useSummaryContext();

  return (
    <>
      <BackAndExport
        onExport={exportData}
        canExport={session.user.activeRole == "CREATOR"}
      />
      <SummaryTitle />
    </>
  );
}
