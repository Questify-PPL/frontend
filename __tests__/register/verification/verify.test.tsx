import Verify from "@/app/register/verification/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            message:
              "Email verification successful, your email has been successfully verified",
          }),
      }) as Promise<Response>,
  );
});

describe("Verify Component", () => {
  it("renders without crashing", async () => {
    render(
      await Verify({
        params: "",
        searchParams: { token: "Token" },
      }),
    );
    expect(
      await screen.findByText(
        "Email verification successful, your email has been successfully verified",
      ),
    ).toBeVisible();
  });

  it("renders error message if token is missing", async () => {
    render(
      await Verify({
        params: "",
        searchParams: {},
      }),
    );
    expect(await screen.findByText("Cannot access")).toBeVisible();
  });

  it("renders error message if API call fails", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          status: 400,
          json: () =>
            Promise.resolve({
              message: "Email already verified / invalid token",
            }),
        }) as Promise<Response>,
    );

    render(
      await Verify({
        params: "",
        searchParams: { token: "Token" },
      }),
    );
    expect(
      await screen.findByText("Email already verified / invalid token"),
    ).toBeVisible();
  });

  it("renders error message if API call throws an error", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error"));

    render(
      await Verify({
        params: "",
        searchParams: { token: "Token" },
      }),
    );
    expect(await screen.findByText("API Error")).toBeVisible();
  });
});
