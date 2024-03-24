"use server";
import { revalidatePath } from "next/cache";
import { Invoice, InvoiceStatus } from "../types/admin";
import { unstable_noStore as noStore } from "next/cache";

export async function getInvoices(): Promise<Invoice[]> {
  noStore();
  const invoices: Invoice[] = [
    {
      id: 1,
      name: "WR Supratman",
      exchange: "Top Up",
      amount: 100000,
      payment: "Debit BCA",
      proof: "www.cloudinary.com/Integerfinibusnam",
      status: "Rejected",
    },
    {
      id: 2,
      name: "WR Supratman",
      exchange: "Top Up",
      amount: 100000,
      payment: "Debit BCA",
      proof: "www.cloudinary.com/Integerfinibusnam",
      status: "Pending",
    },
    {
      id: 3,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 4,
      name: "WR Supratman",
      exchange: "Top Up",
      amount: 100000,
      payment: "Debit BCA",
      proof: "www.cloudinary.com/Integerfinibusnam",
      status: "Pending",
    },
    {
      id: 5,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 6,
      name: "Deny",
      exchange: "Top Up",
      amount: 100000,
      payment: "Debit BCA",
      proof: "www.cloudinary.com/Integerfinibusnam",
      status: "Pending",
    },
    {
      id: 7,
      name: "Budy",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 8,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 9,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 10,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 11,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 12,
      name: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
    {
      id: 13,
      name: "Supermen",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      accountNumber: "00890897262",
      status: "Approved",
    },
  ];

  return invoices;
}

export async function updatePaymentStatus(
  invoice: Invoice,
  value: InvoiceStatus,
) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Updating payment status", invoice, value);
  } catch (error) {
    return { message: "Failed to update payment status" };
  }

  revalidatePath("/home");
}
