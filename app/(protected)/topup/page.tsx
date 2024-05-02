import { auth } from "@/auth";
import TopUpWrapper from "@/components/topup/TopUpWrapper";
import { getInvoiceCreator } from "@/lib/action/topup";
import { TopUpFetchResponse } from "@/lib/types/topup.type";

export default async function TopUp() {
  const session = await auth();
  const { statusCode, message, data } = await fetchInvoices();

  async function fetchInvoices() {
    let res = {} as TopUpFetchResponse;

    res = await getInvoiceCreator();

    return res;
  }

  console.log("invoices:", data);
  return <TopUpWrapper invoiceItems={data} session={session} />;
}
