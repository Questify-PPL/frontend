import { z } from "zod";

export const CreateQuestionnaire = z.object({
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(200, "Title must be less than 200 characters"),
  prize: z.number().min(10000, "Prize must be at least 10000 Credits"),
  prizeType: z
    .enum(["EVEN", "LUCKY"])
    .refine((val) => ["EVEN", "LUCKY"].includes(val), {
      message: "Prize type must be either 'for each' or 'for certain'",
    }),
  maxWinner: z
    .number()
    .nullable()
    .transform((val) => val ?? null),
});

export type CreateQuestionnaire = z.infer<typeof CreateQuestionnaire>;
