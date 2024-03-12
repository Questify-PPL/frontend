import React from "react";
import { render, screen } from "@testing-library/react";
import MyParticipation from "@/app/questionnaire/my-participation/page";
import "@testing-library/jest-dom";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

describe("MyParticipation", () => {
  it("renders MPTHeader component correctly", () => {
    render(<MyParticipation />);

    const titleColumn = screen.getByText("Title");
    expect(titleColumn).toBeInTheDocument();

    const endDateColumn = screen.getByText("End Date");
    expect(endDateColumn).toBeInTheDocument();

    const prizeColumn = screen.getByText("Prize");
    expect(prizeColumn).toBeInTheDocument();

    const winningChanceColumn = screen.getByText("Winning Chance");
    expect(winningChanceColumn).toBeInTheDocument();

    const questionsColumn = screen.getByText("Questions");
    expect(questionsColumn).toBeInTheDocument();

    const statusColumn = screen.getByText("Status");
    expect(statusColumn).toBeInTheDocument();

    const earnedColumn = screen.getByText("Earned");
    expect(earnedColumn).toBeInTheDocument();

    const avgTime = screen.findByText("Avg Time");
    expect(avgTime).toBeNull;
  });
});
