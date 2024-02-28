import { z } from "zod";

const userInfoSchema = z
  .object({
    question1: z.object({
      name: z.string().min(1).max(40),
    }),

    question2: z.object({
      gender: z.enum(["Male", "Female"]),
      birthDate: z.date(),
      phoneNumber: z.string().min(10).max(15),
    }),
  })
  .refine((data) => {
    if (
      data.question1 &&
      typeof data.question1.name === "string" &&
      data.question1.name.trim() === ""
    ) {
      return [
        { message: "Name cannot be an empty string or a string of spaces" },
      ];
    }

    if (
      data.question2 &&
      data.question2.birthDate instanceof Date &&
      (new Date().getFullYear() - data.question2.birthDate.getFullYear() < 18 ||
        new Date().getFullYear() - data.question2.birthDate.getFullYear() >=
          100)
    ) {
      return [{ message: "Invalid birthDate. Age must be between 18 and 99." }];
    }

    if (
      data.question2 &&
      data.question2.phoneNumber &&
      !/^\d+$/.test(data.question2.phoneNumber)
    ) {
      return [{ message: "Invalid phoneNumber. Must contain only numbers." }];
    }

    return true;
  });

export type FormData = z.infer<typeof userInfoSchema>;

export default userInfoSchema;
