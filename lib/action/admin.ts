"use server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { Invoice, InvoiceStatus } from "../types/admin";
import axios from "axios";
import { URL } from "../constant";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ApiResponse, User } from "../types";
import { mergeInvoicesByDate } from "./utils/mergeInvoice";
import { Report, ReportStatus } from "../types/admin/report";
import { UserAccessStatus } from "../types/admin/user";

export async function getTopupInvoices() {
  noStore();
  const session = (await auth()) as Session;
  const admin = session?.user;

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

export async function getReports() {
  noStore();
  const session = (await auth()) as Session;
  const admin = session?.user;

  const response = await axios.get<Report[]>(URL.report.all, {
    headers: {
      Authorization: `Bearer ${admin?.accessToken}`,
    },
  });

  if (response.status !== 200) throw Error("Failed to fetch reports");

  return response.data;
}

export async function updateReport(report: Report, status: ReportStatus) {
  try {
    const session = await auth();
    const user = session?.user;

    const response = await axios.patch(
      URL.report.update(report.id),
      {
        isApproved: status === ReportStatus.APPROVED,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to update report");
    }
  } catch (error) {
    return { message: "Failed to update report" };
  }
  revalidatePath("/reports");
}

export async function getUsers() {
  noStore();
  const session = (await auth()) as Session;
  const admin = session?.user;

  const response = await axios.get<User[]>(URL.user.all, {
    headers: {
      Authorization: `Bearer ${admin?.accessToken}`,
    },
  });

  if (response.status !== 200) throw Error("Failed to fetch users");

  return response.data;
}

export async function updateUserBlockedStatus(
  userId: string,
  value: UserAccessStatus,
) {
  try {
    const sesison = (await auth()) as Session;
    const admin = sesison?.user;

    const response = await axios.patch<Partial<User>>(
      URL.user.update(userId),
      {
        isBlocked: value === UserAccessStatus.BLOCKED,
      },
      {
        headers: {
          Authorization: `Bearer ${admin?.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) throw Error("Failed to update user status");
  } catch (error) {
    return { message: "Failed to update user status" };
  }

  revalidatePath("/users");
}
