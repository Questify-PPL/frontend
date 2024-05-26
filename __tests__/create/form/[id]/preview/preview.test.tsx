import Preview, {
  generateMetadata,
} from "@/app/(protected)/create/form/[id]/preview/page";
import { auth } from "@/auth";
import { getQuestionnaire } from "@/lib/action/form";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Session } from "next-auth";

// Mock the entire module containing convertToCSV
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"), // Keep the real implementation for other functions
  convertToCSV: jest.fn(), // Mock convertToCSV as a Jest mock function
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnaire: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn(), notFound: jest.fn() };
});

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
    unstable_update: jest.fn(),
  };
});

const mockedDispact = jest.fn();

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    useFormState: (action: unknown, initialState: unknown) => [
      undefined,
      mockedDispact,
    ],
    useFormStatus: jest.fn().mockReturnValue({
      pending: true,
      data: null,
      method: null,
      action: null,
    }),
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      Events: [],
    },
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Preview Page", () => {
  const session = {
    user: {
      email: "questify@gmail.com",
      id: "UI2100000000",
      roles: ["CREATOR", "RESPONDENT"],
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
      accessToken: "token",
      activeRole: "CREATOR",
    },
    expires: new Date().toISOString(),
  } as Session;

  const mockedResponse = {
    statusCode: 200,
    message: "Successfully get form",
    data: {
      id: "46f864f1-3531-4f02-b697-fdfb5339cc6e",
      creatorId: "56b2748f-0693-4171-8793-eb17bf0f0213",
      title: "Oreo Official: Exploring Consumer Insights on Oreo Products",
      prize: 1000000,
      isDraft: true,
      isPublished: false,
      maxParticipant: null,
      prizeType: "EVEN",
      maxWinner: null,
      createdAt: "2024-05-08T02:29:16.435Z",
      updatedAt: "2024-05-26T13:25:00.694Z",
      endedAt: null,
      isWinnerProcessed: false,
      totalPity: 0,
      questions: [
        {
          sectionId: 26,
          number: 0,
          name: "Opening",
          description:
            "Hello! I’m Ruben. I’m a Scientist at Oreo. Through this questionnaire I’d like to know consumer’s preferences for Oreo flavors and packaging.",
          questions: [],
        },
        {
          sectionId: 29,
          number: 0,
          name: "Preferences for Oreo Flavor Innovations",
          description: "Let’s talk about Oreo flavor innovations.",
          questions: [
            {
              sectionId: 29,
              questionId: 36,
              number: 0,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "Which new Oreo flavor would you be most excited to try?",
              description:
                "Considering potential future flavor innovations such as Matcha Green Tea, Salted Caramel, or Spicy Chili, please share which one appeals to you the most and why.",
            },
            {
              sectionId: 29,
              questionId: 37,
              number: 0,
              questionType: "RADIO",
              questionTypeName: "Radio",
              isRequired: true,
              question: "Which of the following Oreo flavors have you tried?",
              description:
                "Please select all the Oreo flavors you have tasted in the past.",
              choice: [],
            },
          ],
        },
        {
          sectionId: 27,
          number: 0,
          name: "Oreo Special Edition Motivation",
          description: "Let's talk about the Oreo Special Edition.",
          questions: [
            {
              sectionId: 27,
              questionId: 31,
              number: 0,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "What motivated your purchase of the Oreo Special Edition?",
              description:
                "Please share what factors influenced your decision to buy the Oreo Special Edition, such as flavor, packaging, advertising, or other reasons",
            },
            {
              sectionId: 27,
              questionId: 32,
              number: 0,
              questionType: "RADIO",
              questionTypeName: "Radio",
              isRequired: true,
              question:
                "How likely are you to recommend the Oreo Special Edition to a friend or family member?",
              description:
                'On a scale of 1 to 10, with 1 being "Not Likely" and 10 being "Very Likely," how likely are you to recommend the Oreo Special Edition to someone you know?',
              choice: [],
            },
          ],
        },
        {
          sectionId: 28,
          number: 0,
          name: "Feedback on Oreo's Online Advertising Campaigns",
          description: "Let’s talk about Oreo’s online advertising campaigns.",
          questions: [
            {
              sectionId: 28,
              questionId: 33,
              number: 0,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "How frequently do you recall seeing Oreo's advertisements online?",
              description:
                "Consider the past month and indicate how often you encountered Oreo's online ads, whether on social media, websites, or video platforms.",
            },
            {
              sectionId: 28,
              questionId: 34,
              number: 0,
              questionType: "TEXT",
              questionTypeName: "Long Text",
              isRequired: true,
              question:
                "Which element of Oreo's online advertisements caught your attention the most?",
              description:
                "Please describe the features (such as visual design, message, special offers, or product showcased) of the online ads that made the most significant impression on you.",
            },
            {
              sectionId: 28,
              questionId: 35,
              number: 0,
              questionType: "CHECKBOX",
              questionTypeName: "Checkbox",
              isRequired: true,
              question:
                "Which of the following online platforms have you seen Oreo ads on?",
              description:
                "Please select all the online platforms where you have encountered Oreo advertisements.",
              choice: [],
            },
          ],
        },
        {
          sectionId: 30,
          number: 0,
          name: "Ending",
          description:
            "Thank you for participating in this survey. Your feedback is valuable to us. We appreciate your time and insights.",
          questions: [],
        },
      ],
      questionAmount: 7,
      link: "vb.O14p",
    },
  };

  it("should render preview", async () => {
    (auth as jest.Mock).mockResolvedValue(session);

    (getQuestionnaire as jest.Mock).mockResolvedValue(mockedResponse);

    await generateMetadata({
      params: {
        id: "46f864f1-3531-4f02-b697-fdfb5339cc6e",
      },
    });

    render(
      await Preview({
        params: {
          id: "46f864f1-3531-4f02-b697-fdfb5339cc6e",
        },
      }),
    );
  });

  it("should render preview with error", async () => {
    (auth as jest.Mock).mockResolvedValue(session);

    (getQuestionnaire as jest.Mock).mockRejectedValueOnce(new Error("error"));

    await generateMetadata({
      params: {
        id: "46f864f1-3531-4f02-b697-fdfb5339cc6e",
      },
    });
  });

  it("should use empty string if title is undefined", async () => {
    (auth as jest.Mock).mockResolvedValue(session);

    (getQuestionnaire as jest.Mock).mockResolvedValue({
      ...mockedResponse,
      data: {
        ...mockedResponse.data,
        title: undefined,
      },
    });

    await generateMetadata({
      params: {
        id: "46f864f1-3531-4f02-b697-fdfb5339cc6e",
      },
    });
  });
});
