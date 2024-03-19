import { Session } from "next-auth";
import { BareForm } from "./form.type";

export type FormsAsProps = {
  forms: BareForm[];
};

export type FormAsProps = {
  form: BareForm;
};

export type SessionAsProps = {
  session: Session | null;
};
