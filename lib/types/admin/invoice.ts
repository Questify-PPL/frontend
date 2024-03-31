export type Invoice = {
  id: string;
  creatorName: string;
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
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
