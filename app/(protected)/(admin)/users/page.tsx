import AdminNav from "@/components/admin-side/AdminNav";
import { User } from "@/lib/types";
import { getUsers } from "@/lib/action/admin";
import { UserInfo } from "@/components/admin/UserInfo";

export default async function UsersPage() {
  let users: User[] = [];

  try {
    users = await getUsers();
  } catch (error) {}

  return (
    <div
      className="flex flex-col w-full h-full absolute"
      data-testid="admin-users"
    >
      <div className="flex flex-col md:flex-row w-full flex-1 h-full gap-4 p-5 relative ">
        <AdminNav />
        <UserInfo users={users} />
      </div>
    </div>
  );
}
