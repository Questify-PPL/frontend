import AdminNav from "@/components/admin-side/AdminNav";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col w-full h-full absolute">
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <AdminNav />
        <div>Review</div>
      </div>
    </div>
  );
}
