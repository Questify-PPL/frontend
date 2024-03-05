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
};

export type UserRole = "CREATOR" | "RESPONDENT" | "ADMIN";
