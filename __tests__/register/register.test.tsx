import Register from "@/app/register/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterLayout from "@/app/register/layout";

describe("Register and RegisterForm", () => {
  it("renders without crashing", () => {
    render(
      <RegisterLayout>
        <Register />
      </RegisterLayout>
    );
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    const headingElement = screen.getByRole("heading", { name: /Sign Up/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(
      /Sign Up to create an educationally optimal framework for diverse professional questionnaires together/i
    );

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up using SSO")).toBeInTheDocument();
  });
});
