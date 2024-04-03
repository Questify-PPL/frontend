import { WithdrawWrapper } from "@/components/credit-withdraw";

export default async function Create() {
  return (
    <section className="flex flex-col h-full w-full absolute">
      <WithdrawWrapper></WithdrawWrapper>
    </section>
  );
}
