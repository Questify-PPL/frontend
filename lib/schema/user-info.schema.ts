import { z } from "zod";

export const question1Schema = z.object({
  name: z.string().min(1, "Name must not be empty").max(40, "Name must be less than 40 characters"),
});

export const question2Schema = z.object({
  gender: z.enum(["Male", "Female"]).refine(val => ["Male", "Female"].includes(val), {
    message: "Gender must be either Male or Female",
  }),
  birthDate: z.date().refine(val => val < new Date(), {
    message: "Birth date must be in the past",
  }),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
});