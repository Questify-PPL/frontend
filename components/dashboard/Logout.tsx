import { logout } from "@/lib/action/authenticate";

export function Logout({ className }: Readonly<{ className?: string }>) {
  return (
    <form className="flex flex-1" action={logout}>
      <button type="submit" className="p-[6px] flex-1 text-left">
        Log out
      </button>
    </form>
  );
}
