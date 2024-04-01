export type WithdrawData = {
  amount: number;
  issuedAt: string;
  accountNumber: string;
  accountName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};
