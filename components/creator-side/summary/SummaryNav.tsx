import { SummaryNavigation } from "./SummaryNavigation";

export default function SummaryNav({
  className = "",
  state = "summary",
}: Readonly<{
  className?: string;
  state?: "summary" | "question" | "individual";
  homeChildren?: React.ReactNode;
}>) {
  return (
    <SummaryNavigation
      className={
        className +
        " fixed bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:w-[29%] lg:w-[22%] xl:w-[18%] w-full !left-0"
      }
      state={state}
    ></SummaryNavigation>
  );
}
