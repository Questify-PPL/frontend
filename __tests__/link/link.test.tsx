import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getLinkMapping } from "@/lib/action";
import Link from "@/app/[link]/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/action", () => ({
  getLinkMapping: jest.fn(),
}));

describe("Link Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to the associated page when link has mapping", async () => {
    const link = "existing-link";
    const mockedResponse = { data: "f1" };

    (getLinkMapping as jest.Mock).mockResolvedValueOnce(mockedResponse);

    render(await Link({ params: { link } }));

    expect(getLinkMapping).toHaveBeenCalledWith(link);

    const redirectComponent = screen.queryByTestId("redirect");
    const notFoundPage = screen.queryByTestId("not-found");

    expect(redirectComponent).toBeInTheDocument();
    expect(notFoundPage).not.toBeInTheDocument();
  });

  it("renders NotFoundPage when link has no mapping", async () => {
    const link = "non-existing-link";

    (getLinkMapping as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to get link mapping"),
    );

    render(await Link({ params: { link } }));

    expect(getLinkMapping).toHaveBeenCalledWith(link);

    const redirectComponent = screen.queryByTestId("redirect");
    const notFoundPage = screen.queryByTestId("not-found");

    expect(redirectComponent).toBeInTheDocument();
    expect(notFoundPage).toBeInTheDocument();
  });
});
