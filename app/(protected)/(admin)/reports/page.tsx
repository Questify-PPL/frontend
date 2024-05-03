import AdminNav from "@/components/admin-side/AdminNav";
import { getReports } from "@/lib/action/admin";
import { ReportInfo } from "@/components/admin/ReportInfo";

export default async function ReportPage() {
  const reports = await getReports();
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
