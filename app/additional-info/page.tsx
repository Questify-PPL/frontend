import React from "react";
import Form from "@/components/additional-info/Form";

export default async function UserInfo() {
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
