export type WithdrawData = {
  amount: number;
  createdAt: string;
  accountNumber: string;
  payment: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};
