import Summary, {
  generateMetadata,
} from "@/app/(protected)/summary/form/[id]/page";
import { auth } from "@/auth";
import {
  getCompletedQuestionnaireForRespondent,
  getInitialActiveTab,
  getSummaries,
} from "@/lib/action/form";
import { BareForm } from "@/lib/types";
import { UserRole } from "@/lib/types/auth";
import * as utils from "@/lib/utils";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  getSummaries: jest.fn(),
  getCompletedQuestionnaireForRespondent: jest.fn(),
  getInitialActiveTab: jest.fn(),
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

describe("Summary Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const session = {
    user: {
      email: "questify@gmail.com",
      id: "UI2100000000",
      roles: ["CREATOR", "RESPONDENT"] as UserRole[],
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

  const formStatistics = {
    id: "8bb53ce4-0aa5-4ed4-a109-5b99b51e796e",
    creatorId: "4ec14456-88ed-41b0-b961-164e23506335",
    title: "Form 1",
    prize: 20000,
    isDraft: false,
    isPublished: true,
    maxParticipant: null,
    prizeType: "EVEN",
    maxWinner: null,
    createdAt: "2024-03-12T16:00:29.167Z",
    updatedAt: "2024-03-31T08:05:08.662Z",
    endedAt: null,
    questionsStatistics: [
      {
        sectionId: 60,
        name: "ASOKDKOASDOKSADOKSAD",
        description: "Austin",
        questions: [
          {
            sectionId: 60,
            questionId: 161,
            questionType: "TEXT",
            questionTypeName: "Short Text",
            isRequired: true,
            question: "Question 2",
            description: "Bebek",
            statistics: ["Hi Bas"],
          },
          {
            sectionId: 60,
            questionId: 162,
            questionType: "RADIO",
            questionTypeName: "Radio",
            isRequired: true,
            question: "Question 2",
            description: "Bebek",
            statistics: {
              choices: ["A", "B", "C", "D"],
              amounts: [1, 0, 0, 0],
            },
          },
        ],
      },
      {
        sectionId: null,
        questionId: 163,
        questionType: "CHECKBOX",
        questionTypeName: "Radio",
        isRequired: true,
        question: "Question 4",
        description: "Bebek",
        statistics: {
          choices: ["A", "B", "C", "D", "E"],
          amounts: [1, 1, 1, 0, 0],
        },
      },
    ],
  };

  const questionsWithAnswers = [
    {
      sectionId: 60,
      questions: [
        {
          questionId: 161,
          questionType: "TEXT",
          questionTypeName: "Short Text",
          isRequired: true,
          question: "Question 2",
          description: "Bebek",
          occurence: {
            "Hi Bas": 1,
          },
        },
        {
          questionId: 162,
          questionType: "RADIO",
          questionTypeName: "Radio",
          isRequired: true,
          question: "Question 2",
          description: "Bebek",
          occurence: {
            A: 1,
          },
        },
      ],
    },
    {
      sectionId: null,
      questionId: 163,
      questionType: "CHECKBOX",
      questionTypeName: "Radio",
      isRequired: true,
      question: "Question 4",
      description: "Bebek",
      occurence: {
        A: 1,
        B: 1,
        C: 1,
      },
    },
  ];

  test("renders with no problems as creator", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics: formStatistics,
      questionsWithAnswers: [],
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);
    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  test("renders metadata as creator", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics: formStatistics,
      questionsWithAnswers: [],
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);
    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("renders metadata as respondent", async () => {
    const newSession = {
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    const mockedForms: BareForm = {
      id: "1",
      title: "Mocked Form 1",
      prize: 100,
      prizeType: "EVEN",
      maxWinner: 1,
      createdAt: "2024-03-17T12:00:00Z",
      updatedAt: "2024-03-17T12:00:00Z",
      endedAt: "2024-03-18T12:00:00Z",
      ongoingParticipation: 10,
      completedParticipation: 5,
      formIsReported: false,
    };

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockResolvedValue(
      mockedForms
    );

    (auth as jest.Mock).mockResolvedValue(newSession);

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("renders metadata as creator with error", async () => {
    (getSummaries as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    (auth as jest.Mock).mockResolvedValue(session);

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("renders metadata as respondent with error", async () => {
    const newSession = {
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    (auth as jest.Mock).mockResolvedValue(newSession);

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("metadata has but title is undefined as creator", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics: {
        ...formStatistics,
        title: undefined,
      },
      questionsWithAnswers: [],
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);
    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("metadata has but title is undefined as respondent", async () => {
    const newSession = {
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    const mockedForms = {
      id: "1",
      title: undefined,
      prize: 100,
      prizeType: "EVEN",
      maxWinner: 1,
      createdAt: "2024-03-17T12:00:00Z",
      updatedAt: "2024-03-17T12:00:00Z",
      endedAt: "2024-03-18T12:00:00Z",
      ongoingParticipation: 10,
      completedParticipation: 5,
      formIsReported: false,
    };

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockResolvedValue(
      mockedForms
    );

    (auth as jest.Mock).mockResolvedValue(newSession);

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("it should throw error when metadata fetch failed", async () => {
    (getSummaries as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    (auth as jest.Mock).mockResolvedValue(session);

    await generateMetadata({
      params: {
        id: "1",
      },
    });
  });

  test("renders with no problems as respondent", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["RESPONDENT", "CREATOR"] as UserRole[],
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

    const mockedForms: BareForm = {
      id: "1",
      title: "Mocked Form 1",
      prize: 100,
      prizeType: "EVEN",
      maxWinner: 1,
      createdAt: "2024-03-17T12:00:00Z",
      updatedAt: "2024-03-17T12:00:00Z",
      endedAt: "2024-03-18T12:00:00Z",
      ongoingParticipation: 10,
      completedParticipation: 5,
      formIsReported: false,
    };

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockResolvedValue(
      mockedForms
    );

    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    (auth as jest.Mock).mockResolvedValue(session);

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  it("should return empty object if fetch failed", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["RESPONDENT", "CREATOR"] as UserRole[],
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

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    (auth as jest.Mock).mockResolvedValue(session);

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  it("should show bar graph when there is data", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);
    (getInitialActiveTab as jest.Mock).mockReturnValue("summary");

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    expect(screen.getAllByText("Question 2")[0]).toBeInTheDocument();

    expect(screen.getAllByText("Question 4")[0]).toBeInTheDocument();
  });

  it("should show questions and answers when there is data", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);
    (getInitialActiveTab as jest.Mock).mockReturnValue("question");

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  it("should show individual data when there is individual to be shown", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [
        {
          respondentId: "1",
          respondentName: "John Doe",
        },
      ],
    });

    (auth as jest.Mock).mockResolvedValue(session);

    (getInitialActiveTab as jest.Mock).mockReturnValue("individual");

    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: [
                {
                  sectionId: 61,
                  name: "ASOKDKOASDOKSADOKSAD",
                  description: "Austin",
                  questions: [
                    {
                      sectionId: 61,
                      questionId: 164,
                      questionType: "TEXT",
                      questionTypeName: "Short Text",
                      isRequired: true,
                      question: "Question 2",
                      description: "Bebek",
                      answer: null,
                    },
                    {
                      sectionId: 61,
                      questionId: 165,
                      questionType: "RADIO",
                      questionTypeName: "Radio",
                      isRequired: true,
                      question: "Question 2",
                      description: "Bebek",
                      choice: ["A", "B", "C", "D"],
                      answer: null,
                    },
                  ],
                },
                {
                  sectionId: null,
                  questionId: 163,
                  questionType: "CHECKBOX",
                  questionTypeName: "Radio",
                  isRequired: true,
                  question: "Question 4",
                  description: "Bebek",
                  choice: ["A", "B", "C", "D", "E"],
                  answer: ["A", "B", "C"],
                },
              ],
            }),
          status: 200,
        }) as Promise<Response>
    );

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    const tab = screen.getByText("Choose an individual to view their response");
    expect(tab).toBeInTheDocument();
  });

  it("should show error message when individual fetch failed", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [
        {
          respondentId: "userId",
          respondentName: "John Doe",
        },
      ],
    });

    (auth as jest.Mock).mockResolvedValue(session);

    (getInitialActiveTab as jest.Mock).mockReturnValue("individual");

    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              message: "error",
            }),
          status: 400,
        }) as Promise<Response>
    );

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  it("should show error message when form fetch failed", async () => {
    const session = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["CREATOR"] as UserRole[],
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
        activeRole: "CREATOR",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getSummaries as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    (auth as jest.Mock).mockResolvedValue(session);

    // activeTab to question
    mockedDispact.mockImplementation((state) => {
      expect(state).toBe("question");
    });

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );
  });

  it("should export to csv when button clicked", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);

    (utils.convertToCSV as jest.Mock).mockResolvedValueOnce(undefined);

    // Click export button
    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    const exportButton = await screen.findAllByTestId("export-button");

    expect(exportButton[1]).toBeInTheDocument();

    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          blob: () => Promise.resolve(new Blob()),
        }) as Promise<Response>
    );

    fireEvent.click(exportButton[1] as Element);
    // Mock fetch exportData function

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("should throw error when export csv failed", async () => {
    (getSummaries as jest.Mock).mockResolvedValue({
      formStatistics,
      questionsWithAnswers,
      allIndividuals: [],
    });

    (auth as jest.Mock).mockResolvedValue(session);

    (utils.convertToCSV as jest.Mock).mockRejectedValueOnce(undefined);

    // Click export button
    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    const exportButton = await screen.findAllByTestId("export-button");

    expect(exportButton[1]).toBeInTheDocument();

    // mock error fetch

    global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));

    fireEvent.click(exportButton[1] as Element);

    await waitFor(() => {
      // Assert that fetch was called
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).rejects.toThrow("Failed to fetch");
    });
  });

  it('should show respondent summary page when active role is "RESPONDENT"', async () => {
    const newSession = {
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockResolvedValue({
      id: "2452fdc0-2b2a-4e2d-b373-612fb323017f",
      creatorId: "4ec14456-88ed-41b0-b961-164e23506335",
      title: "Oreo Official: Exploring Consumer Insights on Oreo Products",
      prize: 1000000,
      isDraft: true,
      isPublished: true,
      maxParticipant: null,
      prizeType: "EVEN",
      maxWinner: null,
      createdAt: "2024-04-21T11:45:29.688Z",
      updatedAt: "2024-04-21T11:45:29.688Z",
      endedAt: null,
      isWinnerProcessed: false,
      totalPity: 0,
      questions: [
        {
          sectionId: 112,
          name: "Opening",
          description:
            "Hello! I’m Ruben. I’m a Scientist at Oreo. Through this questionnaire I’d like to know consumer’s preferences for Oreo flavors and packaging.",
          questions: [],
        },
        {
          sectionId: 113,
          name: "Oreo Special Edition Motivation",
          description: "Let's talk about the Oreo Special Edition.",
          questions: [
            {
              sectionId: 113,
              questionId: 221,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "What motivated your purchase of the Oreo Special Edition?",
              description:
                "Please share what factors influenced your decision to buy the Oreo Special Edition, such as flavor, packaging, advertising, or other reasons",
              answer:
                "I bought the Oreo Special Edition because I saw an advertisement on Instagram that featured a new flavor I wanted to try. The packaging design also caught my eye, and I was curious about the limited edition release.",
            },
            {
              sectionId: 113,
              questionId: 222,
              questionType: "RADIO",
              questionTypeName: "Radio",
              isRequired: true,
              question:
                "How likely are you to recommend the Oreo Special Edition to a friend or family member?",
              description:
                'On a scale of 1 to 10, with 1 being "Not Likely" and 10 being "Very Likely," how likely are you to recommend the Oreo Special Edition to someone you know?',
              choice: ["1", "2", "3", "4", "5"],
              answer: ["5"],
            },
          ],
        },
        {
          sectionId: 114,
          name: "Feedback on Oreo's Online Advertising Campaigns",
          description: "Let’s talk about Oreo’s online advertising campaigns.",
          questions: [
            {
              sectionId: 114,
              questionId: 223,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "How frequently do you recall seeing Oreo's advertisements online?",
              description:
                "Consider the past month and indicate how often you encountered Oreo's online ads, whether on social media, websites, or video platforms.",
              answer: "I saw Oreo ads online about once a week.",
            },
            {
              sectionId: 114,
              questionId: 224,
              questionType: "TEXT",
              questionTypeName: "Long Text",
              isRequired: true,
              question:
                "Which element of Oreo's online advertisements caught your attention the most?",
              description:
                "Please describe the features (such as visual design, message, special offers, or product showcased) of the online ads that made the most significant impression on you.",
              answer:
                "The vibrant colors and playful animations in Oreo ads always grab my attention. The ads are visually appealing and make me want to learn more about the product.",
            },
            {
              sectionId: 114,
              questionId: 225,
              questionType: "CHECKBOX",
              questionTypeName: "Checkbox",
              isRequired: true,
              question:
                "Which of the following online platforms have you seen Oreo ads on?",
              description:
                "Please select all the online platforms where you have encountered Oreo advertisements.",
              choice: [
                "Facebook",
                "Instagram",
                "YouTube",
                "Twitter",
                "TikTok",
                "Snapchat",
              ],
              answer: ["Instagram", "YouTube"],
            },
          ],
        },
        {
          sectionId: 115,
          name: "Preferences for Oreo Flavor Innovations",
          description: "Let’s talk about Oreo flavor innovations.",
          questions: [
            {
              sectionId: 115,
              questionId: 226,
              questionType: "TEXT",
              questionTypeName: "Short Text",
              isRequired: true,
              question:
                "Which new Oreo flavor would you be most excited to try?",
              description:
                "Considering potential future flavor innovations such as Matcha Green Tea, Salted Caramel, or Spicy Chili, please share which one appeals to you the most and why.",
              answer:
                "I would love to try the Salted Caramel Oreo flavor. The combination of sweet and salty flavors sounds delicious, and I think it would be a unique addition to the Oreo lineup.",
            },
            {
              sectionId: 115,
              questionId: 227,
              questionType: "RADIO",
              questionTypeName: "Radio",
              isRequired: true,
              question: "Which of the following Oreo flavors have you tried?",
              description:
                "Please select all the Oreo flavors you have tasted in the past.",
              choice: [
                "Original",
                "Double Stuf",
                "Golden",
                "Mint",
                "Peanut Butter",
              ],
              answer: ["Original"],
            },
          ],
        },
        {
          sectionId: 116,
          name: "Ending",
          description:
            "Thank you for participating in this survey. Your feedback is valuable to us. We appreciate your time and insights.",
          questions: [],
        },
      ],
      canRespond: false,
      questionAmount: 7,
    });

    (auth as jest.Mock).mockResolvedValue(newSession);

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    expect(
      screen.getByText(
        "Oreo Official: Exploring Consumer Insights on Oreo Products"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "What motivated your purchase of the Oreo Special Edition?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "How likely are you to recommend the Oreo Special Edition to a friend or family member?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "How frequently do you recall seeing Oreo's advertisements online?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Which element of Oreo's online advertisements caught your attention the most?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "The vibrant colors and playful animations in Oreo ads always grab my attention. The ads are visually appealing and make me want to learn more about the product."
      )
    ).toBeInTheDocument();
  });

  it("should show error if fetch as respondent failed", async () => {
    const newSession = {
      user: {
        ...session.user,
        activeRole: "RESPONDENT",
      },
      expires: new Date().toISOString(),
    } as Session;

    (getCompletedQuestionnaireForRespondent as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    (auth as jest.Mock).mockResolvedValue(newSession);

    render(
      await Summary({
        params: {
          id: "1",
        },
      })
    );

    expect(
      screen.getByText("There's an issue with fetching the data")
    ).toBeInTheDocument();
  });
});
