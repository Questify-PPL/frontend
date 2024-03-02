import Register from "@/app/register/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterLayout from "@/app/register/layout";

jest.mock("@/app/register/page", () => {
  const originalModule = jest.requireActual("@/app/register/page");

  return {
    __esModule: true,
    ...originalModule,
    getUserSSOJWT: jest.fn(),
  };
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Register and RegisterForm", () => {
  it("renders without crashing", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ data: { accessToken: "Token" } }),
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

  it("renders RegisterLayout without crashing", async () => {
    render(
      <RegisterLayout>
        <div>Register</div>
      </RegisterLayout>,
    );

    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
