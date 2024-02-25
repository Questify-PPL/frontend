import { RegisterForm, SSOButton } from "@/components/auth";
import { Props } from "@/lib/types";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

export default async function Register(props: Props) {
  const { accessToken } = await getServerSideProps(props);

  return (
    <main className="flex-1 flex min-h-screen h-fit flex-col items-center justify-start md:justify-center  py-8 px-8 gap-8">
      <div className="flex flex-col md:flex-row gap-[15px] justify-center items-center">
        <Image
          src={"/assets/Questify.svg"}
          alt="Logo"
          width={138}
          height={32}
        />
        <h2 className="font-medium text-base text-center md:text-start text-primary flex-wrap max-w-lg">
          <span className="font-bold">Sign Up</span> to create an educationally
          optimal framework for diverse professional questionnaires together
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="font-medium text-center px-2">
          If you&apos;re an academic member at Universitas Indonesia,{" "}
          <span className="font-bold">Sign Up</span> here.
        </div>
        <SSOButton />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="font-medium text-center px-2">
          Otherwise, feel free to complete the <span> form!</span>
        </div>
      </div>
      <RegisterForm />
      <div className="text-base font-medium flex gap-2">
        Already have an account?
        <Link className="font-bold text-[#C036A9]" href={"/login"}>
          Log In
        </Link>
      </div>
    </main>
  );
}

async function getServerSideProps(props: Props) {
  try {
    const { ticket } = props.searchParams;

    if (!ticket) {
      return {
        accessToken: getCookie("name", { cookies }),
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
