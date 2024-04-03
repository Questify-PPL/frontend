import { auth } from "@/auth";
import { Session } from "next-auth";

export async function getUserCredit() {
  const session = (await auth()) as Session;
  const user = session?.user;

  return user?.credit;
}
