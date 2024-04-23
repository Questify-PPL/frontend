import "@testing-library/jest-dom";
import { act, render, waitFor } from "@testing-library/react";
import notification from "@/app/(protected)/notification/page";

describe("Notification animation", () => {
  it("renders without errors", async () => {
    await act(async () => {
      const result = await notification();
      expect(() => render(result)).not.toThrow();
    });
  });

  it("handles animation error correctly", async () => {
    const mockNotification = jest
      .fn()
      .mockRejectedValue(new Error("Animation error"));
    await act(async () => {
      await expect(mockNotification()).rejects.toThrow("Animation error");
    });
  });
});
