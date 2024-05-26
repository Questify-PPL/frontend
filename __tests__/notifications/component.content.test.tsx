import NotificationCard from "@/components/notification/NotificationCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BareForm } from "@/lib/types";

describe("NotificationCard", () => {
  const form: BareForm = {
    id: "123",
    title: "Sample Form",
    winningStatus: true,
    endedAt: "2023-05-19T12:00:00Z",
    prize: 0,
    prizeType: "EVEN",
    maxWinner: 0,
    createdAt: "",
    updatedAt: "",
    ongoingParticipation: 0,
    completedParticipation: 0,
    formIsReported: false,
  };

  test("renders NotificationCard component", () => {
    render(<NotificationCard form={form} />);
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText("You have won on Questionnaire"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ended at")).toBeInTheDocument();
    expect(screen.getByText("2023-05-19")).toBeInTheDocument();
  });

  test("displays winning message when winningStatus is true", () => {
    render(<NotificationCard form={form} />);
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(
      screen.getByText("You have won on Questionnaire"),
    ).toBeInTheDocument();
  });

  test("displays losing message when winningStatus is false", () => {
    const losingForm = { ...form, winningStatus: false };
    render(<NotificationCard form={losingForm} />);
    expect(screen.getByText("Sorry")).toBeInTheDocument();
    expect(
      screen.getByText("You still lose on Questionnaire"),
    ).toBeInTheDocument();
  });

  test("displays correct end date", () => {
    render(<NotificationCard form={form} />);
    expect(screen.getByText("2023-05-19")).toBeInTheDocument();
    expect(screen.queryByText("TBA")).not.toBeInTheDocument();
  });

  test("displays TBA when end date is null", () => {
    render(
      <NotificationCard
        form={{ ...form, endedAt: null as unknown as string }}
      />,
    );
    expect(screen.getByText("TBA")).toBeInTheDocument();
  });
});
