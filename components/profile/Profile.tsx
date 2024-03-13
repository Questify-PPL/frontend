import { User } from "@/lib/types";
import { LuUserCircle2 } from "react-icons/lu";
import { Fragment } from "react";

export function Profile({ user }: Readonly<{ user: User }>) {
  return (
    <>
      <LuUserCircle2 className="w-28 h-28 sm:w-36 sm:h-36 mx-auto relative -top-12 bg-white rounded-full -mb-10 sm:mx-0 sm:-mb-32" />

      <div className="mb-8 text-center sm:text-left sm:ml-40 sm:mb-12">
        <div className="font-bold text-base mb-1 sm:mb-2 sm:text-xl">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xs text-gray-500 text-[14px]">{user.email}</div>
      </div>
    </>
  );
}

export function ProfileSection({
  title,
  subtitle,
  data,
}: Readonly<{
  title: string;
  subtitle: string;
  data: Record<string, string>;
}>) {
  return (
    <section className="mb-8 text-xs sm:text-[14px]">
      <h2 className="font-bold mb-1 sm:mb-2 text-[14px] sm:text-base">
        {title}
      </h2>
      <div className="text-gray-500 mb-3">{subtitle}</div>
      <div className="grid grid-cols-[125px_1fr] sm:grid-cols-[repeat(2,125px_minmax(100px,400px))] gap-1 sm:gap-y-2 sm:gap-x-6">
        {Object.entries(data).map(([key, value]) => (
          <Fragment key={value}>
            <span>{key}</span>
            <span>{value}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
