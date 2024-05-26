import AdminNav from "@/components/admin-side/AdminNav";
import { getReports } from "@/lib/action/admin";
import { ReportInfo } from "@/components/admin/ReportInfo";
import { Report } from "@/lib/types/admin/report";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Reports",
  description: "Questify - Admin Reports Page",
};

export default async function ReportPage() {
  let reports: Report[] = [];

  try {
    reports = await getReports();
  } catch (error) {}

  return (
    <div
      className="flex flex-col w-full h-full absolute"
      data-testid="admin-homepage"
    >
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <AdminNav />
        <ReportInfo reports={reports} />
      </div>
    </div>
  );
}
