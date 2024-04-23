import NotificationCard from "@/components/notification/NotificationCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("NotificationCard", () => {
  it("renders correctly with valid title and message props", () => {
    render(
      <NotificationCard
        title="Congratulations!"
        message="You have won questionnaire A. We have added the price to your credit."
      />
    );

    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have won questionnaire A. We have added the price to your credit."
      )
    ).toBeInTheDocument();
  });

  it("does not render text content when title or message props are missing", () => {
    render(<NotificationCard title={""} message={""} />);

    expect(screen.queryByText("Congratulations!")).toBeNull();
    expect(
      screen.queryByText(
        "You have won questionnaire A. We have added the price to your credit."
      )
    ).toBeNull();
  });
});
