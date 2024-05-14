export type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export type LoadingProps = {
  label: string;
  state: "home" | "action" | "responses";
  children?: React.ReactNode;
  className?: string;
};
