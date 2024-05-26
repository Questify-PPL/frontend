import { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are blocked!",
  description: "Questify - Blocked Page",
};

export default function BlockedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">Blocked!</h1>
      <p className="text-lg text-center">
        You are blocked from accessing Questify. If you want to appeal, contact{" "}
        <span className="font-bold">questifyst.official@gmail.com</span>
      </p>
    </div>
  );
}
