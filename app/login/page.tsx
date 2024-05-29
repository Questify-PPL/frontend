import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { TriviaForm } from "@/components/auth/TriviaForm";
import { SSOButton } from "@/components/auth";
import { Props } from "@/lib/types";
import { SSOForm } from "@/components/auth/SSOForm";
import { getUserSSOJWT } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Questify - Login Page",
};

export default async function Login(props: Props) {
  const loginUrl = props.searchParams.callbackUrl
    ? `/login?callbackUrl=${props.searchParams.callbackUrl}`
    : "/login";
  const registerUrl = props.searchParams.callbackUrl
    ? `/register?callbackUrl=${props.searchParams.callbackUrl}`
    : "/register";

  const { accessToken } = await getUserSSOJWT(props, loginUrl);

  return accessToken ? (
    <main
      className="flex justify-center items-center h-screen px-8 py-10 md:px-10"
      data-testid="sso-page"
    >
      <SSOForm accessToken={accessToken} />
    </main>
  ) : (
    <div className="font-medium md:flex">
      <div className="h-[25px] bg-login-pattern bg-cover md:w-[512px] md:h-screen bg-center md:flex md:justify-center md:items-center">
        <TriviaForm />
      </div>
      <main
        className="md:flex md:justify-center md:items-center flex-auto"
        aria-label="login"
      >
        <div className="py-10 px-8 max-w-96 mx-auto md:max-w-full md:px-10">
          <div className="mb-7 md:flex md:gap-[15px] md:mb-8 md:items-center">
            <Link href="/">
              <Image
                src={"/assets/Questify.svg"}
                alt="Questify Logo"
                width={138}
                height={32}
                className="mx-auto mb-[10px] md:mb-0"
              />
            </Link>
            <h1 className="text-center md:text-left text-primary text-[10px] md:text-base md:max-w-[400px]">
              <span className="font-bold">Log In</span> to continue your journey
              in contributing to the progress of today&#39;s academic
              enhancement.
            </h1>
          </div>
          <div className="mb-7 md:mb-8">
            <p className="mb-4 text-xs text-center md:text-sm">
              If you&#39;re an academic member at Universitas Indonesia,{" "}
              <span className="font-bold">Log In</span> here.
            </p>
            <SSOButton
              text="Log In using SSO"
              className="flex flex-row gap-2 border-primary border-[1px] border-solid w-full px-[14px] md:max-w-[330px] mx-auto"
              url={loginUrl}
            />
          </div>
          <LoginForm />
          <div className="text-xs text-center md:text-sm">
            Don&#39;t have any account?
            <Link
              className="font-bold text-[#C036A9] ml-[6px]"
              href={registerUrl}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
