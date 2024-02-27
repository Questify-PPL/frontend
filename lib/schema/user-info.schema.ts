import { z } from "zod";

const userInfoSchema = z.object({
  question1: z.object({
    name: z.string().min(1).max(40),
  }),

  question2: z.object({
    gender: z.enum(["Male", "Female"]),
    birthDate: z.date(),
  }),
});

export type FormData = z.infer<typeof userInfoSchema>;

export default userInfoSchema;
