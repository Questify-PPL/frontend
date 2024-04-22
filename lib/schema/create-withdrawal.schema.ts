import { z } from "zod";

export const CreateWithdrawal = z.object({
  payment: z.string(),
  accountNumber: z.string(),
});

export type CreateWithdrawal = z.infer<typeof CreateWithdrawal>;
