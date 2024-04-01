import { WithdrawWrapper } from "@/components/credit-withdraw";

const infos = [
  {
    amount: 100000,
    issuedAt: "2021-10-10",
    accountNumber: "1234567890",
    accountName: "John Doe",
    status: "PENDING" as const,
  },
  {
    amount: 2000,
    issuedAt: "2021-10-10",
    accountNumber: "1234567890",
    accountName: "John Doe",
    status: "APPROVED" as const,
  },
];

export default async function Create() {
  return (
    <section className="flex flex-col h-full w-full absolute">
      <WithdrawWrapper infos={infos}></WithdrawWrapper>
    </section>
  );
}
