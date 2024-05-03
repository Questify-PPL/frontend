import { z } from "zod";

export const UpdateReport = z.object({
  reportId: z.string().uuid(),
  isApproved: z.boolean(),
});

export type UpdateReport = Zod.infer<typeof UpdateReport>;
