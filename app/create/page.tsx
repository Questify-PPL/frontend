import { auth } from "@/auth";
import { CreateWrapper } from "@/components/creator-side/create/CreateWrapper";

export default async function Create() {
  const forms = await getCreatedForm();

  return <CreateWrapper forms={forms} />;
}

async function getCreatedForm() {
  const session = await auth();

  const user = session?.user;

  if (!user) return [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/creator`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  const data = await res.json();

  return data.data;
}
