import { Props } from "@/lib/types";

export default async function Verify(props: Readonly<Props>) {
  const message = await getServerSideProps(props);
  console.log("message", message);

  return (
    <div className="w-full flex justify-center items-center my-24">
      <p
        className="
      text=[#1D2425] font-bold text-[18px] leading-[24px] text-center
      "
      >
        {message.message as string}
      </p>
    </div>
  );
}

async function getServerSideProps(props: Props) {
  const { token } = props.searchParams;
  try {
    if (!token) {
      return {
        message: "Cannot access",
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/email/verify-email?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status < 400) {
      return {
        message:
          "Email verification successful, your email has been successfully verified",
      };
    }
    return {
      message: "Email already verified / invalid token",
    };
  } catch (error) {
    return {
      message: error,
    };
  }
}
