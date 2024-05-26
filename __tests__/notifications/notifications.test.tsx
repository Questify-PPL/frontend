import { queryByTestId, render, waitFor, screen } from "@testing-library/react";
import Notification from "@/app/(protected)/notification/page";
import Separator from "@/components/notification/Separator";
import { getQuestionnairesFilled, markAllAsRead } from "@/lib/action";
import { auth } from "@/auth";
import { UserRole } from "@/lib/types/auth";
import { Session } from "next-auth";
import { QUESTIONNAIRES_FILLED } from "@/lib/constant";
import "@testing-library/jest-dom";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/action", () => ({
  getQuestionnairesFilled: jest.fn(),
  markAllAsRead: jest.fn(),
}));

beforeEach(() => {
  const mockSession = {
    user: {
      email: "questify@gmail.com",
      id: "1",
      roles: ["RESPONDENT"] as UserRole[],
      ssoUsername: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      gender: null,
      companyName: null,
      birthDate: null,
      credit: 0,
      isVerified: true,
      isBlocked: false,
      hasCompletedProfile: false,
      activeRole: "RESPONDENT",
    },
    expires: new Date().toISOString(),
  } as Session;

  (auth as jest.Mock).mockResolvedValue(mockSession);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Notification component", () => {
  render(<Separator />);
  const separator = screen.getByTestId("separator");

  it("renders Notification component", async () => {
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalled());

    expect(getQuestionnairesFilled).toHaveBeenCalled();
  });

  it("handles error when fetching forms", async () => {
    (getQuestionnairesFilled as jest.Mock).mockRejectedValue(
      new Error("Failed to get questionnaires filled"),
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalled());

    expect(getQuestionnairesFilled).toHaveBeenCalled();
  });

  it("should mark all notification as read", async () => {
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalled());

    await waitFor(() => expect(markAllAsRead).toHaveBeenCalled());
  });

  it("renders Separator component when readForms.length > 0", async () => {
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalled());

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
  });
});
