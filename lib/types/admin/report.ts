import { User } from "../auth";

export enum ReportStatus {
  // eslint-disable-next-line no-unused-vars
  PENDING = "PENDING",
  // eslint-disable-next-line no-unused-vars
  APPROVED = "APPROVED",
  // eslint-disable-next-line no-unused-vars
  REJECTED = "REJECTED",
}

export type Report = {
  id: string;
  toUserId: string;
  fromUserId: string;
  formId: string;
  message: string;
  status: ReportStatus;
  createdAt: string;
  fromUser: Pick<User, "id" | "firstName" | "lastName" | "email" | "roles">;
  toUser: Pick<User, "id" | "firstName" | "lastName" | "email" | "roles"> & {
    _count: {
      ReportTo: number;
    };
  };
};
