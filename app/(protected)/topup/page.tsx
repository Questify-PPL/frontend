import { auth } from "@/auth";
import TopUpWrapper from "@/components/topup/TopUpWrapper";
import { getInvoiceCreator } from "@/lib/action/topup";
import { TopUpFetchResponse } from "@/lib/types/topup.type";

export default async function TopUp() {
  const session = await auth();
  const { data } = await fetchInvoices();

  async function fetchInvoices() {
    return (await getInvoiceCreator()) as TopUpFetchResponse;
  }

  return <TopUpWrapper invoiceItems={data} session={session} />;
}
