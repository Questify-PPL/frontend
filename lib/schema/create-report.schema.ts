import { z } from "zod";

export const CreateReport = z.object({
  reportToId: z.string().uuid(),
  formId: z.string().uuid(),
  message: z
    .string()
    .max(200, "message can't be longer than 200 characters"),
});

export type CreateReport = Zod.infer<typeof CreateReport>
