import { Props } from "@/lib/types";

export default async function Verify(props: Props) {
  const message = await getServerSideProps(props);
  console.log("message", message);

  return (
    <div>
      <p>{message.message as string}</p>
    </div>
  );
}

async function getServerSideProps(props: Props) {
  const { token } = props.searchParams;
  try {
    console.log("token", token);
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

    console.log("status", response.status);
    if (response.status < 400) {
      console.log("masuk sini");
      return {
        message:
          "Email verification successful, your email has been successfully verified",
      };
    }
    console.log(">400");
    return {
      message: "Email already verified / invalid token",
    };
  } catch (error) {
    return {
      message: error,
    };
  }
}
