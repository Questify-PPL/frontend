import Login from "@/app/login/page";
import { LoginForm } from "@/components/auth/LoginForm";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import { SSOForm } from "@/components/auth/SSOForm";
import ErrorPage from "@/app/login/error";
import { useRouter } from "next/navigation";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockedDispact = jest.fn();

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    useFormState: (action: unknown, initialState: unknown) => [
      undefined,
      mockedDispact,
    ],
    useFormStatus: jest.fn().mockReturnValue({
      pending: true,
      data: null,
      method: null,
      action: null,
    }),
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      Events: [],
    },
  };
});

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

describe("Login", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("renders without crashing", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "" } }),
          status: 201,
        }) as Promise<Response>,
    );
    const props = {
      params: {},
      searchParams: {},
    };

    render(await Login(props));

    const headingElement = screen.getByRole("heading", { name: /Log In/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Log In");

    const SSOButtonElement = screen.getByTestId("sso-login");
    expect(SSOButtonElement).toBeInTheDocument();
    expect(SSOButtonElement).toHaveTextContent("Log In using SSO");

    const linkElement = screen.getByText("Sign Up");
    expect(linkElement).toBeInTheDocument();
  });

  it("conditional renders based on ticket searchParams", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "token" } }),
          status: 201,
        }) as Promise<Response>,
    );

    const props = {
      params: {},
      searchParams: { ticket: "token" },
    };

    render(await Login(props));

    const ssoForm = screen.getByTestId("sso-page");
    expect(ssoForm).toBeInTheDocument();
  });
});

describe("LoginForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("renders without crashing", () => {
    render(LoginForm());

    const headingElement = screen.getByRole("heading", { name: /Login Form/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Login Form");

    const email = screen.getByLabelText("Email");
    expect(email).toBeInTheDocument();

    const emailPlaceholder = screen.getByPlaceholderText("Email");
    expect(emailPlaceholder).toBeInTheDocument();

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();

    const passwordPlaceHolder = screen.getByPlaceholderText("Password");
    expect(passwordPlaceHolder).toBeInTheDocument();

    const loginButton = screen.getByTestId("login");
    expect(loginButton).toBeInTheDocument();
  });

  it("should disable form when form is in pending state", () => {
    render(LoginForm());

    (useFormStatus as jest.Mock).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    });

    const email = screen.getByLabelText("Email");
    expect(email).toBeDisabled();

    const password = screen.getByLabelText("Password");
    expect(password).toBeDisabled();

    const loginButton = screen.getByTestId("login");
    expect(loginButton).toBeDisabled();
  });
});

describe("SSOForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("should renders without crashing", () => {
    render(SSOForm({ accessToken: "token" }));

    const ssoLabel = screen.getByTestId("sso-label");
    expect(ssoLabel).toBeInTheDocument();

    const ssoInput = screen.getByTestId("sso-input");
    expect(ssoInput).toBeInTheDocument();

    const loginButton = screen.getByTestId("sso-button");
    expect(loginButton).toBeInTheDocument();
  });
});

describe("Error Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("should renders without crashing", () => {
    const error = new Error("error");
    render(ErrorPage({ error }));

    const message = screen.getByRole("heading", {
      name: "Something went wrong!",
    });
    expect(message).toBeInTheDocument();
  });

  it("calls router.replace on button click", () => {
    const error = new Error("error");
    const mockReplace = jest.fn();
    mockedUseRouter.mockImplementation(() => ({
      replace: mockReplace,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      push: jest.fn(),
      prefetch: jest.fn(),
    }));

    render(<ErrorPage error={error} />);
    const button = screen.getByTestId("reset");
    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
