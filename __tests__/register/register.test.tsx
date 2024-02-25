import Register from "@/app/register/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterLayout from "@/app/register/layout";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Register and RegisterForm", () => {
  it("renders without crashing", async () => {
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
    render(
      await Register({
        params: "",
        searchParams: { ticket: "asdasd" },
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

  it("renders RegisterLayout without crashing", async () => {
    render(
      <RegisterLayout>
        <div>asdasd</div>
      </RegisterLayout>,
    );
  });
});
