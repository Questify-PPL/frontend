import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const triviaLiteral = z.union([
  z.literal("Basketball"),
  z.literal("Football"),
  z.literal("Baseball"),
  z.literal("Hockey"),
]);

export const TriviaSchema = z.object({
  answer: triviaLiteral,
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type TriviaSchema = z.infer<typeof TriviaSchema>;
