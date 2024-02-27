import Verify from "@/app/register/verification/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import React from "react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Verify Component", () => {
  it("renders without crashing", async () => {
    render(<Verify params={{}} searchParams={{}} />);

    const messageElement = await screen.findByText("Cannot access");
    expect(messageElement).toBeInTheDocument();
  });

  it("renders message with search params", async () => {
    render(<Verify params={{}} searchParams={{ token: "Token" }} />);

    const messageElement = await screen.findByText(
      "Email verification successful, your email has been successfully verified",
    );
    expect(messageElement).toBeInTheDocument();
  });

  it("renders message if fetch succeeds", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({
        message:
          "Email verification successful, your email has been successfully verified",
      }),
      status: 200,
    });

    render(<Verify params={{}} searchParams={{ token: "Token" }} />);

    const messageElement = await screen.findByText(
      "Email verification successful, your email has been successfully verified",
    );
    expect(messageElement).toBeInTheDocument();
  });

  it("renders message if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({ message: "Email already verified / invalid token" }),
      status: 400,
    });

    render(<Verify params={{}} searchParams={{ token: "Token" }} />);

    const messageElement = await screen.findByText(
      "Email already verified / invalid token",
    );
("Email already verified / invalid token");
("Email already verified / invalid token");
    expect(messageElement).toBeInTheDocument();
  });
});
