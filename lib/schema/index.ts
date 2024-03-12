import { LoginSchema, SSOSchema } from "./login.schema";
import {
  UpdateProfileSchema,
  FlattenedUpdateErrors,
} from "./updateProfile.schema";

export * from "./register.schema";
export { LoginSchema, SSOSchema, UpdateProfileSchema };
export type { FlattenedUpdateErrors };
