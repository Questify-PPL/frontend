import { Invoice } from "@/lib/types";

export function mergeInvoicesByDate(
  topupInvoices: Invoice[],
  withdrawalInvoices: Invoice[],
) {
  const mergedInvoices: Invoice[] = [];
  let topupIndex = 0;
  let withdrawalIndex = 0;

  while (
    topupIndex < topupInvoices.length ||
    withdrawalIndex < withdrawalInvoices.length
  ) {
    const currentTopupInvoice = topupInvoices[topupIndex];
    const currentTopupDate = new Date(currentTopupInvoice?.createdAt || 0);

    const currentWithdrawalInvoice = withdrawalInvoices[withdrawalIndex];
    const currentWithdrawDate = new Date(
      currentWithdrawalInvoice?.createdAt || 0,
    );

    if (currentTopupDate > currentWithdrawDate) {
      mergedInvoices.push(currentTopupInvoice);
      topupIndex++;
    } else {
      mergedInvoices.push(currentWithdrawalInvoice);
      withdrawalIndex++;
    }
  }

  return mergedInvoices;
}
