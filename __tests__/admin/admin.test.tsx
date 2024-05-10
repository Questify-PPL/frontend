import ReportsPage from "@/app/(protected)/(admin)/reports/page";
import ReviewsPage from "@/app/(protected)/(admin)/reviews/page";
import { PaymentInfo } from "@/components/admin-side/AdminHomePage";
import { Invoice } from "@/lib/types/admin";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { getReports } from "@/lib/action/admin";

jest.mock("@/lib/action/admin", () => {
  return {
    getReports: jest.fn(),
  };
});

describe("PaymentInfo Component", () => {
  const invoices: Invoice[] = [
    {
      id: "1",
      creatorName: "Deny",
      exchange: "Top Up",
      amount: 100000,
      payment: "Debit BCA",
      buktiPembayaranUrl: "www.cloudinary.com/Integerfinibusnam",
      status: "Pending",
      createdAt: "2024-03-28T15:18:58.606Z",
    },
    {
      id: "2",
      creatorName: "Budy",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      buktiPembayaranUrl: "www.cloudinary.com/Integerfinibusnam",
      accountNumber: "00890897262",
      status: "Approved",
      createdAt: "2024-03-28T15:18:58.606Z",
    },
    {
      id: "3",
      creatorName: "WR Supratman",
      exchange: "Withdraw",
      amount: 100000,
      payment: "Debit BCA",
      buktiPembayaranUrl: "www.cloudinary.com/Integerfinibusnam",
      accountNumber: "00890897262",
      status: "Approved",
      createdAt: "2024-03-28T15:18:58.606Z",
    },
  ];

  test("renders search input", async () => {
    render(<PaymentInfo invoices={await Promise.resolve(invoices)} />);
    const searchInput = screen.getByPlaceholderText("Search name");
    expect(searchInput).toBeInTheDocument();
  });

  test("searches for items based on query", async () => {
    render(<PaymentInfo invoices={await Promise.resolve(invoices)} />);
    const searchInput = screen.getByPlaceholderText("Search name");

    fireEvent.change(searchInput, { target: { value: "Budy" } });

    const searchResult = await screen.findByText("Budy");
    expect(searchResult).toBeInTheDocument();
  });

  test("show all items when query is empty", async () => {
    render(<PaymentInfo invoices={await Promise.resolve(invoices)} />);
    const searchInput = screen.getByPlaceholderText("Search name");

    fireEvent.change(searchInput, { target: { value: "" } });

    const denyCell = await screen.findByText("Deny");
    const buddyCell = await screen.findByText("Budy");
    const supratmanCell = await screen.findByText("WR Supratman");

    await Promise.all(
      [denyCell, buddyCell, supratmanCell].map((cell) =>
        expect(cell).toBeInTheDocument(),
      ),
    );
  });

  test("show filtered items", async () => {
    render(<PaymentInfo invoices={await Promise.resolve(invoices)} />);
    const topUpButtonFilter = screen.getByRole("button", {
      name: "Top Up",
    });

    fireEvent.click(topUpButtonFilter);

    const searchResult = await screen.findByText("Deny");
    expect(searchResult).toBeInTheDocument();
  });
});

describe("Reports Page", () => {
  test("renders the Reports page without any issues", async () => {
    (getReports as jest.Mock).mockResolvedValue([]);
    render(await ReportsPage());
    expect(screen.getByTestId("admin-homepage")).toBeInTheDocument();
  });

  test("renders the reports page with issues", async () => {
    (getReports as jest.Mock).mockRejectedValue(new Error("error"));
    render(await ReportsPage());
    expect(screen.getByTestId("admin-homepage")).toBeInTheDocument();
  });
});

describe("Review Page", () => {
  test("renders the Reviews page without any issues", () => {
    render(<ReviewsPage />);

    expect(screen.getByText("Review")).toBeInTheDocument();
  });
});
