import { auth } from "@/auth";

export default async function Page() {
  // @ts-ignore
  const { user } = await auth();
  return (
    <div>
      <h1>Profile</h1>
      <ul>
        {Object.entries(user).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
}
