import Register from "@/app/register/page";
import { render, screen } from "@testing-library/react";

describe("Register and RegisterForm", () => {
  it("renders without crashing", () => {
    render(<Register />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });
});
