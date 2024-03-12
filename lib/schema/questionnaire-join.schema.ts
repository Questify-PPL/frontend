import { z } from "zod";

export const QuestionnaireJoin = z.object({
  section1No1: z
    .enum(["Yes", "No"])
    .refine((val) => ["Yes", "No"].includes(val), {
      message: "Answer must be either Yes or No",
    }),
  section1No2: z
    .string()
    .min(1, "Answer must not be empty")
    .max(40, "Answer must be less than 40 characters"),
  oreoEditions: z.array(z.string()).refine(
    (val) => {
      // Assuming the edition names are unique identifiers for the checkboxes
      const availableEditions = [
        "Oreo Chinese New Year Edition",
        "Oreo Eid Edition",
        "Oreo President Election Edition",
        "Oreo Valentine's Day Edition",
      ];
      return val.every((edition) => availableEditions.includes(edition));
    },
    {
      message: "Invalid Oreo edition selection",
    },
  ),
});

export type QuestionnaireJoin = z.infer<typeof QuestionnaireJoin>;

export type FieldName = keyof QuestionnaireJoin;
