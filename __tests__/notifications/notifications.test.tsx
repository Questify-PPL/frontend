import { render, waitFor } from "@testing-library/react";
import Notification from "@/app/(protected)/notification/page";
import { getQuestionnairesFilled } from "@/lib/action";
import { auth } from "@/auth";
import { UserRole } from "@/lib/types/auth";
import { Session } from "next-auth";
import { QUESTIONNAIRES_FILLED } from "@/lib/constant";
import "@testing-library/jest-dom";

jest.mock("@/lib/action", () => ({
  getQuestionnairesFilled: jest.fn(),
}));

describe("Notification component", () => {
  it("renders Notification component", async () => {
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

    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));


    expect(getQuestionnairesFilled).toHaveBeenCalled();
  });

  it("handles error when fetching forms", async () => {
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

    (getQuestionnairesFilled as jest.Mock).mockRejectedValue(
      new Error("Failed to get questionnaires filled")
    );

    render(await Notification());

    await waitFor(() => expect(auth).toHaveBeenCalledTimes(2));

    expect(getQuestionnairesFilled).toHaveBeenCalled();
  });
});
