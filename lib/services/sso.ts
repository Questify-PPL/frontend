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
