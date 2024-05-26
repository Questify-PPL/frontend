import ErrorPage from "@/app/register/error";
import Register from "@/app/register/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("@/app/register/page", () => {
  const originalModule = jest.requireActual("@/app/register/page");

  return {
    __esModule: true,
    ...originalModule,
    getUserSSOJWT: jest.fn(),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    useFormState: () => [undefined, jest.fn()],
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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("Register and RegisterForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  it("renders without crashing", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: undefined } }),
          status: 201,
        }) as Promise<Response>,
    );

    render(await Register({ params: "", searchParams: {} }));

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    const headingElement = screen.getByRole("heading", { name: /Sign Up/i });
    expect(headingElement).toBeInTheDocument();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up using SSO")).toBeInTheDocument();
  });

  it("renders register with search params", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: undefined } }),
          status: 201,
        }) as Promise<Response>,
    );

    render(
      await Register({
        params: "",
        searchParams: { ticket: "Token" },
      }),
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    const headingElement = screen.getByRole("heading", { name: /Sign Up/i });
    expect(headingElement).toBeInTheDocument();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up using SSO")).toBeInTheDocument();
  });

  it("renders register if fetch succeds", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "Token" } }),
          status: 201,
        }) as Promise<Response>,
    );

    render(
      await Register({
        params: "",
        searchParams: { ticket: "Token" },
      }),
    );

    const ssoLabel = screen.getByTestId("sso-label");
    expect(ssoLabel).toBeInTheDocument();

    const ssoInput = screen.getByTestId("sso-input");
    expect(ssoInput).toBeInTheDocument();

    const loginButton = screen.getByTestId("sso-button");
    expect(loginButton).toBeInTheDocument();
  });

  it("renders error if fetch fails", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: { accessToken: "Token" },
              message: "error",
            }),
          status: 400,
        }) as Promise<Response>,
    );

    expect.assertions(1);

    try {
      render(
        await Register({
          params: "",
          searchParams: { ticket: "Token" },
        }),
      );
    } catch (error) {
      // @ts-ignore
      expect(error?.message).toMatch("error");
    }
  });

  it("renders error.tsx without crashing", async () => {
    const error = new Error("error");
    render(ErrorPage({ error, reset: jest.fn() }));

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

    render(<ErrorPage error={error} reset={jest.fn()} />);
    const button = screen.getByTestId("reset");
    fireEvent.click(button);

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("it should be able to use callback URL in search params", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "11" } }),
          status: 200,
        }) as Promise<Response>,
    );

    render(
      await Register({ params: {}, searchParams: { callbackUrl: "url" } }),
    );
  });
});
