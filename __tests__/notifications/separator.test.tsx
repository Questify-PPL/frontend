import Separator from "@/components/notification/Separator";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Separator component", () => {
  it("renders with correct content", () => {
    const { getByText } = render(<Separator />);
    expect(getByText("You Have New Notifications")).toBeInTheDocument();
  });
});
