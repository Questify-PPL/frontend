import {
  RegisterForm,
  SSOButton,
  SSOForm,
  TriviaForm,
} from "@/components/auth";
import { Props } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { getUserSSOJWT } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Questify - Register Page",
};

export default async function Register(props: Readonly<Props>) {
  const registerUrl = props.searchParams.callbackUrl
    ? `/register?callbackUrl=${props.searchParams.callbackUrl}`
    : "/register";

  const { accessToken } = await getUserSSOJWT(props, registerUrl);

  return (
    <>
      {accessToken ? (
        <main
          className="flex justify-center items-center h-screen px-8 py-10 md:px-10"
          data-testid="sso-page"
        >
          <SSOForm accessToken={accessToken} />
        </main>
      ) : (
        <div className="w-full flex flex-col md:flex-row items-center justify-center h-full min-h-fit">
          <div className="flex flex-col px-[20px] md:w-fit w-full py-[30px] md:py-[0px] md:min-h-screen self-stretch items-center justify-center md:px-[48px] bg-register-pattern bg-cover bg-no-repeat">
            <TriviaForm />
          </div>
          <main
            className="flex-1 flex min-h-screen h-fit flex-col items-center justify-start md:justify-center  py-8 px-8 gap-8"
            aria-label="register"
          >
            <div className="flex flex-col md:flex-row gap-[15px] justify-center items-center">
              <Link href={"/"} className="min-w-fit h-full">
                <Image
                  src={"/assets/Questify.svg"}
                  alt="Questify Logo"
                  width={138}
                  height={32}
                />
              </Link>
              <h1 className="font-medium text-base text-center md:text-start text-primary flex-wrap max-w-lg">
                <span className="font-bold">Sign Up</span> to create an
                educationally optimal framework for diverse professional
                questionnaires together
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="font-medium text-center px-2">
                If you&apos;re an academic member at Universitas Indonesia,{" "}
                <span className="font-bold">Sign Up</span> here.
              </div>
              <SSOButton
                text="Sign Up using SSO"
                className="flex flex-row gap-2 border-primary w-3/5 border-[1px] border-solid"
                url={registerUrl}
              />
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
        </div>
      )}
    </>
  );
}
