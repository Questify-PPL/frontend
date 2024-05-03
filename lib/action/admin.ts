"use server";
import { revalidatePath } from "next/cache";
import { Invoice, InvoiceStatus } from "../types/admin";
import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";
import { URL } from "../constant";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ApiResponse } from "../types";
import { mergeInvoicesByDate } from "./utils/mergeInvoice";

export async function getTopupInvoices() {
  noStore();
  const sesison = (await auth()) as Session;
  const admin = sesison?.user;

  const response = (
    await axios.get<ApiResponse<Invoice[]>>(URL.topUpInvoices, {
      headers: {
        Authorization: `Bearer ${admin?.accessToken}`,
      },
    })
  ).data;

  if (response.statusCode !== 200) throw Error("Failed to fetch invoices");

  return response.data;
}

export async function getWithdrawalInvoices() {
  noStore();
  const sesison = (await auth()) as Session;
  const admin = sesison?.user;

  const response = (
    await axios.get<ApiResponse<Invoice[]>>(URL.withdrawalInvoices, {
      headers: {
        Authorization: `Bearer ${admin?.accessToken}`,
      },
    })
  ).data;

  if (response.statusCode !== 200) throw Error("Failed to fetch invoices");

  return response.data;
}

export async function getInvoices(): Promise<Invoice[]> {
  noStore();
  const topupInvoicesPromise = getTopupInvoices();
  const withdrawalInvoicesPromise = getWithdrawalInvoices();

  const [topupInvoices, withdrawalInvoices] = await Promise.all([
    topupInvoicesPromise,
    withdrawalInvoicesPromise,
  ]);

  const invoices = mergeInvoicesByDate(topupInvoices, withdrawalInvoices);
  return invoices;
}

export async function updateTopupInvoiceStatus(
  invoice: Invoice,
  value: InvoiceStatus,
) {
  try {
    const sesison = (await auth()) as Session;
    const admin = sesison?.user;
    const response = (
      await axios.post<ApiResponse<Invoice>>(
        `${URL.validateTopupInvoices}?type=admin&invoiceId=${invoice.id}`,
        {
          isApproved: value === "APPROVED",
        },
        {
          headers: {
            Authorization: `Bearer ${admin?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      )
    ).data;
    if (response.statusCode !== 200)
      throw Error("Failed to update payment status");
  } catch (error) {
    return { message: "Failed to update payment status" };
  }

  revalidatePath("/home");
}

export async function updateWithdrawInvoiceStatus(
  invoice: Invoice,
  value: InvoiceStatus,
) {
  try {
    const sesison = (await auth()) as Session;
    const admin = sesison?.user;
    const response = (
      await axios.patch<ApiResponse<Invoice>>(
        `${URL.validateWithdrawalInvoices}/${invoice.id}`,
        {
          isApproved: value === "APPROVED",
        },
        {
          headers: {
            Authorization: `Bearer ${admin?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      )
    ).data;
    if (response.statusCode !== 200)
      throw Error("Failed to update payment status");
  } catch (error) {
    return { message: "Failed to update withdraw status" };
  }

  revalidatePath("/home");
}
