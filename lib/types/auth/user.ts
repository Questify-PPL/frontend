export type User = {
  id: string;
  email: string;
  roles: UserRole[];
  ssoUsername: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  companyName: string | null;
  birthDate: string | null;
  credit: number | null;
  isVerified: boolean;
  isBlocked: boolean;
  hasCompletedProfile: boolean;
  accessToken: string;
  activeRole?: UserRole;
  Admin?: {
    userId: string;
  };
  Creator?: {
    userId: string;
    emailNotificationActive: boolean;
  };
  Respondent?: {
    pity: number;
  };
};

export type UserRole = "CREATOR" | "RESPONDENT" | "ADMIN";

export enum UserRoleEnum {
  Creator = "CREATOR",
  Respondent = "RESPONDENT",
  Admin = "ADMIN",
}
