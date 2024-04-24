import { Session } from "next-auth";

export type TopUpProps = {
  invoiceItems: InvoiceItem[];
  session: Session | null;
};

export type InvoiceItem = {
  id: number;
  creatorId: string;
  creatorName: string;
  amount: number;
  status: string;
  buktiPembayaranUrl: string;
  createdAt: string;
  validatedAt: string | null;
  payment: string;
  exchange: string;
  accountNumber: string | null;
};

export type TopUpFetchResponse = {
  statusCode: number;
  message: string;
  data: InvoiceItem[];
};

export type UpdateTopUpState =
  | {
      error: string;
    }
  | undefined;
