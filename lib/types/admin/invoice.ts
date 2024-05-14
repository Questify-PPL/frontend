export type Invoice = {
  id: string;
  creatorName?: string;
  userName?: string;
  exchange: string;
  amount: number;
  payment: string;
  status: string;
  buktiPembayaranUrl?: string;
  accountNumber?: string;
  createdAt: string;
};

export type InvoiceStatus = "APPROVED" | "PENDING" | "REJECTED";

export enum InvoiceStatusEnum {
  // eslint-disable-next-line no-unused-vars
  APPROVED = "APPROVED",
  // eslint-disable-next-line no-unused-vars
  PENDING = "PENDING",
  // eslint-disable-next-line no-unused-vars
  REJECTED = "REJECTED",
}

export enum InvoiceExchangeEnum {
  // eslint-disable-next-line no-unused-vars
  TOP_UP = "Top Up",
  // eslint-disable-next-line no-unused-vars
  WITHDRAW = "Withdraw",
}
