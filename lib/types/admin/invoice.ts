export type Invoice = {
  id: number;
  name: string;
  exchange: string;
  amount: number;
  payment: string;
  status: string;
  proof?: string;
  accountNumber?: string;
};

export type InvoiceStatus = "Approved" | "Pending" | "Rejected";
