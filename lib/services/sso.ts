import { Props } from "../types";

const SSO_UI_URL = "https://sso.ui.ac.id/cas2";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const loginUrl = `${SSO_UI_URL}/login?service=${BASE_URL}`;
const logoutUrl = `${SSO_UI_URL}/logout?url=${BASE_URL}`;

export function redirectLogin(path: string = "/") {
  window.location.replace(loginUrl + path);
}

export function redirectLogout() {
  window.location.replace(logoutUrl);
}

export async function getUserSSOJWT(props: Props, pathname: string) {
  try {
    const { ticket } = props.searchParams;

    if (!ticket) {
      return {
        accessToken: "",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login-sso`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket,
          serviceURL: process.env.NEXT_PUBLIC_BASE_URL + pathname,
        }),
      },
    );

    const data = await response.json();

    if (response.status !== 201) {
      console.log(data);

      throw Error(data.message);
    }

    return {
      accessToken: data.data.accessToken,
    };
  } catch (error) {
    throw error;
  }
}
