import { Session } from "next-auth";
import { BareForm } from "./form.type";
import { WithdrawData } from "./withdraw.type";

export type FormsAsProps = {
  forms: BareForm[];
};

export type FormAsProps = {
  form: BareForm;
};

export type SessionAsProps = {
  session: Session;
};

export type WithdrawInfos = {
  infos: WithdrawData[];
};

export type WithdrawInfo = {
  info: WithdrawData;
};
