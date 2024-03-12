import { logout } from "@/lib/action/user";

export function Logout() {
  return (
    <form className="flex flex-1" action={logout}>
      <button type="submit" className="p-[6px] flex-1 text-left">
        Log out
      </button>
    </form>
  );
}
