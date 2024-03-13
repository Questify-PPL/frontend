import { z } from "zod";

export const UpdateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name must not be empty")
    .max(20, "First Name must be less than 20 characters"),
  lastName: z
    .string()
    .min(1, "Name must not be empty")
    .max(20, "Name must be less than 20 characters"),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => val < new Date(), {
      message: "Birth date must be in the past",
    }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  companyName: z.string().min(2),
});

export type FlattenedUpdateErrors = z.inferFlattenedErrors<
  typeof UpdateProfileSchema
>;
