import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Session } from "next-auth";
import { UserRole, UserRoleEnum } from "@/lib/types/auth";
import { auth } from "@/auth";
import Response from "@/app/(protected)/response/page";
import { QUESTIONNAIRES_FILLED } from "@/lib/constant";
import {
  getQuestionnairesFilled,
  getQuestionnairesOwned,
} from "@/lib/action/form";
import { isEnded } from "@/lib/utils";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("@/lib/action/form", () => ({
  getQuestionnairesFilled: jest.fn(),
  getQuestionnairesOwned: jest.fn(),
}));

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn() };
});

const mockedDispact = jest.fn();
let mockedMatchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockedMatchMedia,
});

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

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    auth: jest.fn(),
  };
});

describe("Responder Response", () => {
  const mockSession = {
    user: {
      email: "questify@gmail.com",
      id: "1",
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
      activeRole: "RESPONDENT",
    },
    expires: new Date().toISOString(),
  } as Session;

  const mockCreatorSession = {
    user: {
      email: "questify@gmail.com",
      id: "1",
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
      activeRole: "CREATOR",
    },
    expires: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ResponsesWrapper with form data when user is a creator with forms", async () => {
    (auth as jest.Mock).mockResolvedValue(mockCreatorSession);
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("response-wrapper")).toBeInTheDocument();
  });

  it("should not render ResponsesWrapper when user is not a creator", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("response-wrapper")).not.toBeInTheDocument();
  });

  it("renders ResponsesWrapper without form data when user is a creator with empty forms", async () => {
    (auth as jest.Mock).mockResolvedValue(mockCreatorSession);
    (getQuestionnairesOwned as jest.Mock).mockResolvedValue([]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("response-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("response-table")).toBeInTheDocument();
  });

  it("renders MPWrapper with form data when user is a respondent with forms", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).toBeInTheDocument();
    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });
  });

  it("should not render MPWrapper when user is not a respondent", async () => {
    const modifiedMockSession = {
      ...mockSession,
      user: {
        ...mockSession.user,
        activeRole: UserRoleEnum.Creator,
      },
    };
    (auth as jest.Mock).mockResolvedValue(modifiedMockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).not.toBeInTheDocument();
    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(
        screen.queryByTestId(`mp-content-${form.id}`),
      ).not.toBeInTheDocument();
    });
  });

  it("renders MPWrapper without form data when user is a respondent with empty forms", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).toBeInTheDocument();

    const formData = screen.queryAllByTestId((id) =>
      id.startsWith("mp-content-"),
    );

    expect(formData.length).toBe(0);
  });

  it('renders the "luckily" span when the form has ended, prizeType is "LUCKY", and winningStatus is true', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
      prizeType: "LUCKY",
      winningStatus: true,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("luckily")).toBeInTheDocument();
  });

  it('renders the "alas, not" span when the form has ended, prizeType is "LUCKY", and winningStatus is false', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
      prizeType: "LUCKY",
      winningStatus: false,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("alas-not")).toBeInTheDocument();
  });

  it('renders the "each" span when the form has ended, prizeType is "EVEN", and winningStatus is true', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
      prizeType: "EVEN",
      winningStatus: true,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("each")).toBeInTheDocument();
  });

  it('renders "started on" when the form is ongoing', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2200-03-31T12:00:00",
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("started on 15/")).toBeInTheDocument();
  });

  it('renders "prized on" when the form has ended', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("prized on 20/")).toBeInTheDocument();
  });

  it('renders "Done" when the form is complete', async () => {
    const form = { ...QUESTIONNAIRES_FILLED[0], isCompleted: true };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("Done")).toBeInTheDocument();
  });

  it("renders the number of questions filled when the form is incomplete", async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      questionFilled: 5,
      questionAmount: 15,
      isCompleted: false,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("5/15")).toBeInTheDocument();
  });

  it('renders "On Going" when the form is ongoing', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2200-03-31T12:00:00",
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("status-ongoing")).toBeInTheDocument();
  });

  it('renders "Ended" when the form has ended', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("status-ended")).toBeInTheDocument();
  });

  it('renders "?" as prize amount when the form is ongoing', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2200-03-31T12:00:00",
      prize: 100000,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("?")).toBeInTheDocument();
  });

  it("renders the prize amount when the form has ended and winningStatus is true", async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
      winningStatus: true,
      prize: 100,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const formData = screen.queryAllByTestId((id) =>
      id.startsWith("prize-amount-"),
    );

    expect(formData.length).toBeGreaterThan(0);
  });

  it('renders "0" as prize amount when the form has ended and winningStatus is false', async () => {
    const form = {
      ...QUESTIONNAIRES_FILLED[0],
      createdAt: "2024-03-15T12:00:00",
      endedAt: "2024-03-20T12:00:00",
      winningStatus: false,
      prize: 100000,
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue([form]);

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByText("0")).toBeInTheDocument();
  });

  it('filters forms when "All" filter is selected', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    let filterButton = screen.getByTestId("filter-ended");
    filterButton.click();
    await waitFor(() => {});

    filterButton = screen.getByTestId("filter-all");
    filterButton.click();
    await waitFor(() => {});

    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });
  });

  it('filters forms when "On Going" filter is selected', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const filterButton = screen.getByTestId("filter-ongoing");
    filterButton.click();
    await waitFor(() => {});

    const onGoingForms = QUESTIONNAIRES_FILLED.filter(
      (form) => !isEnded(form.endedAt),
    );
    onGoingForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });
    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!onGoingForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });
  });

  it('filters forms when "Ended" filter is selected', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const filterButton = screen.getByTestId("filter-ended");
    filterButton.click();
    await waitFor(() => {});

    const endedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      isEnded(form.endedAt),
    );
    endedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });
    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!endedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });
  });

  it('filters forms based on query when "All" filter is selected', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const filterButton = screen.getByTestId("filter-all");
    filterButton.click();
    await waitFor(() => {});

    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search title(s)");
    fireEvent.change(searchInput, { target: { value: "Sample Form 1" } });
    searchInput.dispatchEvent(new Event("input"));

    const queriedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      form.title.startsWith("Sample Form 1"),
    );

    queriedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!queriedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });
  });

  it('filters forms by "All", then by query, then by "Ended", then by query again, then by "On Going"', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    // Filter forms by "All"
    let filterButton = screen.getByTestId("filter-all");
    filterButton.click();
    await waitFor(() => {});

    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    // Then by query
    let searchInput = screen.getByPlaceholderText("Search title(s)");
    fireEvent.change(searchInput, { target: { value: "Sample Form" } });
    searchInput.dispatchEvent(new Event("input"));

    let queriedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      form.title.startsWith("Sample Form"),
    );

    queriedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!queriedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });

    // Then by "Ended"
    filterButton = screen.getByTestId("filter-ended");
    filterButton.click();
    await waitFor(() => {});

    let endedForms = queriedForms.filter((form) => isEnded(form.endedAt));

    endedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!endedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });

    // Then by query
    fireEvent.change(searchInput, { target: { value: "Sample Form 3" } });
    searchInput.dispatchEvent(new Event("input"));

    queriedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      form.title.startsWith("Sample Form 3"),
    );

    endedForms = queriedForms.filter((form) => isEnded(form.endedAt));

    endedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!endedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });

    // Then by "On Going"
    filterButton = screen.getByTestId("filter-ongoing");
    filterButton.click();
    await waitFor(() => {});

    queriedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      form.title.startsWith("Sample Form 3"),
    );

    const onGoingForms = queriedForms.filter((form) => !isEnded(form.endedAt));
    onGoingForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-content-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!onGoingForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-content-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });
  });

  it("renders mobile view when media query mets", async () => {
    mockedMatchMedia.mockImplementationOnce((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-mobile-${form.id}`)).toBeInTheDocument();
    });
    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(
        screen.queryByTestId(`mp-content-${form.id}`),
      ).not.toBeInTheDocument();
    });
  });

  it("filters forms based on query in mobile view", async () => {
    mockedMatchMedia.mockImplementationOnce((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    QUESTIONNAIRES_FILLED.forEach((form) => {
      expect(screen.queryByTestId(`mp-mobile-${form.id}`)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search title(s)");
    fireEvent.change(searchInput, { target: { value: "Sample Form 1" } });
    searchInput.dispatchEvent(new Event("input"));

    const queriedForms = QUESTIONNAIRES_FILLED.filter((form) =>
      form.title.startsWith("Sample Form 1"),
    );

    queriedForms.forEach((form) => {
      expect(screen.queryByTestId(`mp-mobile-${form.id}`)).toBeInTheDocument();
    });

    QUESTIONNAIRES_FILLED.forEach((form) => {
      if (!queriedForms.includes(form)) {
        expect(
          screen.queryByTestId(`mp-mobile-${form.id}`),
        ).not.toBeInTheDocument();
      }
    });
  });

  it('should not render "All", "On Going", and "Ended" filter button in mobile view', async () => {
    mockedMatchMedia.mockImplementationOnce((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockResolvedValue(
      QUESTIONNAIRES_FILLED,
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const webContent = screen.queryAllByTestId((id) =>
      id.startsWith("mp-content-"),
    );
    const mobileContent = screen.queryAllByTestId((id) =>
      id.startsWith("mp-mobile-"),
    );

    expect(webContent.length).toBe(0);
    expect(mobileContent.length).toBe(QUESTIONNAIRES_FILLED.length);

    expect(screen.queryByTestId("filter-all")).not.toBeInTheDocument();
    expect(screen.queryByTestId("filter-ongoing")).not.toBeInTheDocument();
    expect(screen.queryByTestId("filter-ended")).not.toBeInTheDocument();
  });

  it("should not error when failed to fetch", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockRejectedValue(
      new Error("Failed to get questionnaires filled"),
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).toBeInTheDocument();
  });

  it("shows message when failed to fetch in web view", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockRejectedValue(
      new Error("Failed to get questionnaires filled"),
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).toBeInTheDocument();

    const errorMessage = screen.queryAllByText(
      "There's an issue with fetching the data",
    );
    expect(errorMessage.length).toBe(1);
  });

  it("shows messages when failed to fetch in mobile view", async () => {
    mockedMatchMedia.mockImplementationOnce((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getQuestionnairesFilled as jest.Mock).mockRejectedValue(
      new Error("Failed to get questionnaires filled"),
    );

    render(await Response());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("mp-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("mp-table")).not.toBeInTheDocument();

    const errorMessage = screen.queryAllByText(
      "There's an issue with fetching the data",
    );
    expect(errorMessage.length).toBe(2);
  });
});
