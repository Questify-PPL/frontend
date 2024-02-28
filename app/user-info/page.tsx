import React from "react";
import Form from "@/components/user-info/Form";
import { Props } from "@/lib/types";

export default async function UserInfo(props: Props) {
  const backgroundImageUrl = "/assets/user-info-bg.png";

  return (
    <main
      className="flex bg-cover bg-center h-screen w-screen justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Form />
    </main>
  );
}
