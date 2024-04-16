import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "@/app/help/page";
import { UserRole } from "@/lib/types/auth";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { sendContactForm } from "@/lib/action/contact";

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    auth: jest.fn(),
  };
});

jest.mock("@/lib/action/contact", () => ({
  sendContactForm: jest.fn(),
}));

const mockSession = {
  user: {
    email: "questify@gmail.com",
    id: "1",
    roles: ["CREATOR", "RESPONDENT"] as UserRole[],
    ssoUsername: null,
    firstName: "John",
    lastName: "Doe",
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

const mockResponse = {
  statusCode: 201,
  message: "Email successfully sent to Questify",
};

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn(), usePathname: jest.fn() };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Contact Modal", () => {
  it("renders contact modal correctly", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    expect(contactButton).toBeInTheDocument();

    const contactModal = screen.getByTestId("contact-modal");
    expect(contactModal).toBeInTheDocument();
    expect(contactModal).toHaveClass("hidden");

    fireEvent.click(contactButton);
    expect(contactModal).not.toHaveClass("hidden");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("questify@gmail.com")).toBeInTheDocument();

    const inputSubject = screen.getByTestId("subject") as HTMLTextAreaElement;
    expect(inputSubject).toBeInTheDocument();
    expect(inputSubject.value).toBe("");

    const inputMessage = screen.getByTestId("message") as HTMLTextAreaElement;
    expect(inputMessage).toBeInTheDocument();
    expect(inputMessage.value).toBe("");
  });

  it("validates contact form fields", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    expect(contactButton).toBeInTheDocument();
    fireEvent.click(contactButton);

    const inputSubject = screen.getByTestId("subject");
    fireEvent.blur(inputSubject);
    expect(screen.getByTestId("error-subject")).toBeInTheDocument();

    const inputMessage = screen.getByTestId("message");
    fireEvent.blur(inputMessage);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it('should not enable "Send" button when there are errors', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const inputSubject = screen.getByTestId("subject");
    fireEvent.blur(inputSubject);
    expect(screen.getByTestId("error-subject")).toBeInTheDocument();

    const sendButton = screen.getByText("Send");
    expect(sendButton).toBeDisabled();

    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });

    const inputMessage = screen.getByTestId("message");
    fireEvent.blur(inputMessage);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('validates form fields and should not submit when "Send" button is clicked initially', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const sendButton = screen.getByText("Send");
    expect(sendButton).toBeEnabled();

    fireEvent.click(sendButton);
    expect(screen.getByTestId("error-subject")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('should not submit when name is empty and "Send" button is clicked', async () => {
    const modifiedMockSession = {
      user: {
        email: "questify@gmail.com",
        id: "1",
        roles: ["CREATOR", "RESPONDENT"] as UserRole[],
        ssoUsername: null,
        firstName: "",
        lastName: "",
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
    (auth as jest.Mock).mockResolvedValue(modifiedMockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    expect(
      screen.getByText("Please set your name in your profile"),
    ).toBeInTheDocument();

    const inputSubject = screen.getByTestId("subject");
    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });

    const inputMessage = screen.getByTestId("message");
    fireEvent.change(inputMessage, { target: { value: "Test Message" } });

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);
    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    expect(screen.queryByTestId("error-subject")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('resets form fields and closes modal when "X" icon is clicked', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const contactModal = screen.getByTestId("contact-modal");
    expect(contactModal).not.toHaveClass("hidden");

    const inputSubject = screen.getByTestId("subject") as HTMLTextAreaElement;
    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });
    expect(inputSubject.value).toBe("Test Subject");

    const inputMessage = screen.getByTestId("message") as HTMLTextAreaElement;
    fireEvent.change(inputMessage, { target: { value: "Test Message" } });
    expect(inputMessage.value).toBe("Test Message");

    const iconX = screen.getByTestId("icon-x");
    expect(iconX).toBeInTheDocument();

    fireEvent.click(iconX);
    expect(contactModal).toHaveClass("hidden");

    fireEvent.click(contactButton);
    expect(contactModal).not.toHaveClass("hidden");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("questify@gmail.com")).toBeInTheDocument();
    expect(inputSubject.value).toBe("");
    expect(inputMessage.value).toBe("");
  });

  it('resets form fields and closes modal when "Cancel" button is clicked', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const contactModal = screen.getByTestId("contact-modal");
    expect(contactModal).not.toHaveClass("hidden");

    const inputSubject = screen.getByTestId("subject") as HTMLTextAreaElement;
    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });
    expect(inputSubject.value).toBe("Test Subject");

    const inputMessage = screen.getByTestId("message") as HTMLTextAreaElement;
    fireEvent.change(inputMessage, { target: { value: "Test Message" } });
    expect(inputMessage.value).toBe("Test Message");

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(contactModal).toHaveClass("hidden");

    fireEvent.click(contactButton);
    expect(contactModal).not.toHaveClass("hidden");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("questify@gmail.com")).toBeInTheDocument();
    expect(inputSubject.value).toBe("");
    expect(inputMessage.value).toBe("");
  });

  it("resets and closes modal upon successful email sending", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (sendContactForm as jest.Mock).mockResolvedValue(mockResponse);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const contactModal = screen.getByTestId("contact-modal");
    expect(contactModal).not.toHaveClass("hidden");

    const inputSubject = screen.getByTestId("subject") as HTMLTextAreaElement;
    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });
    expect(inputSubject.value).toBe("Test Subject");

    const inputMessage = screen.getByTestId("message") as HTMLTextAreaElement;
    fireEvent.change(inputMessage, { target: { value: "Test Message" } });
    expect(inputMessage.value).toBe("Test Message");

    const submitButton = screen.getByText("Send");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sendContactForm).toHaveBeenCalledTimes(1);
      expect(sendContactForm).toHaveBeenCalledWith({
        subject: "Test Subject",
        message: "Test Message",
      });
    });
    expect(contactModal).toHaveClass("hidden");

    fireEvent.click(contactButton);
    expect(contactModal).not.toHaveClass("hidden");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("questify@gmail.com")).toBeInTheDocument();
    expect(inputSubject.value).toBe("");
    expect(inputMessage.value).toBe("");
  });

  it("should not reset or close modal upon failed email sending", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (sendContactForm as jest.Mock).mockRejectedValue(
      new Error("Internal server error"),
    );

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const contactButton = screen.getByTestId("button-contact");
    fireEvent.click(contactButton);

    const contactModal = screen.getByTestId("contact-modal");
    expect(contactModal).not.toHaveClass("hidden");

    const inputSubject = screen.getByTestId("subject") as HTMLTextAreaElement;
    fireEvent.change(inputSubject, { target: { value: "Test Subject" } });
    expect(inputSubject.value).toBe("Test Subject");

    const inputMessage = screen.getByTestId("message") as HTMLTextAreaElement;
    fireEvent.change(inputMessage, { target: { value: "Test Message" } });
    expect(inputMessage.value).toBe("Test Message");

    const submitButton = screen.getByText("Send");
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sendContactForm).toHaveBeenCalledTimes(1);
      expect(sendContactForm).toHaveBeenCalledWith({
        subject: "Test Subject",
        message: "Test Message",
      });
    });

    expect(contactModal).not.toHaveClass("hidden");
    expect(inputSubject.value).toBe("Test Subject");
    expect(inputMessage.value).toBe("Test Message");
  });
});

describe("FAQ Section", () => {
  it("should render FAQ section", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByTestId("faq-1")).toBeInTheDocument();
    expect(screen.getByTestId("faq-trigger-1")).toBeInTheDocument();
    expect(screen.getByTestId("faq-content-1")).toBeInTheDocument();
  });

  it("expands FAQ content when clicked", async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);

    render(await Help());
    await waitFor(() => expect(auth).toHaveBeenCalledTimes(1));

    const firstTrigger = screen.getByTestId("faq-trigger-1");

    expect(await screen.findByTestId("faq-content-1")).not.toBeVisible();

    firstTrigger.click();

    expect(await screen.findByTestId("faq-content-1")).toBeVisible();
  });
});
