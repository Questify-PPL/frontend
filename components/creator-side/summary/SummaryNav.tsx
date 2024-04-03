import { SummaryNavigation } from "./SummaryNavigation";

export default function SummaryNav({
  className = "",
}: Readonly<{
  className?: string;
  state?: "summary" | "question" | "individual";
  homeChildren?: React.ReactNode;
}>) {
  return (
    <SummaryNavigation
      className={
        className +
        " fixed bottom-4 md:top-auto md:bottom-auto md:relative md:flex md:w-fit w-full !left-0"
      }
    ></SummaryNavigation>
  );
}
