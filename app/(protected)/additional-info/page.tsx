import React from "react";
import Form from "@/components/additional-info/Form";
import BackgroundImage from "@/public/assets/user-info-bg.png";

export default function AdditionalInfo() {
  return (
    <main
      className="flex bg-cover bg-center h-screen justify-center items-center"
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
    >
      <Form />
    </main>
  );
}
