import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";

export function ProfileSectionLoading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="mb-8 text-xs sm:text-[14px]">
      <h2 className="font-bold mb-1 sm:mb-2 text-[14px] sm:text-base">
        {title}
      </h2>{" "}
      <div className="text-gray-500 mb-3">{subtitle}</div>
      <div className="grid grid-cols-[125px_1fr] sm:grid-cols-[repeat(2,125px_minmax(100px,400px))] gap-1 sm:gap-y-2 sm:gap-x-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Fragment key={i}>
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
