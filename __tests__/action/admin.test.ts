import { getTopupInvoices, updateTopupInvoiceStatus } from "@/lib/action/admin";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
    unstable_update: jest.fn(),
  };
});

jest.mock("next/cache", () => {
  return {
    unstable_noStore: jest.fn(),
    revalidatePath: jest.fn(),
  };
});

describe("Invoices", () => {
  it("should return topup invoices", async () => {
    const response = {
      data: {
        statusCode: 200,
        message: "Successfully get all on validation invoice",
        data: [
          {
            id: "ca8e3433-b330-4790-a14e-ad113f13d027",
            creatorId: "UI210000000",
            amount: 10000,
            status: "Pending",
            buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
            createdAt: "2024-03-28T15:18:58.606Z",
            validatedAt: null,
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(response);
    const invoices = await getTopupInvoices();
    expect(invoices).toEqual(response.data.data);
  });

  it("should return error when get topup invoices failed", async () => {
    const response = {
      data: {
        statusCode: 500,
        message: "Internal Server Error",
      },
    };

    mockedAxios.get.mockResolvedValue(response);

    try {
      await getTopupInvoices();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch invoices"));
    }
  });

  it("should update topup invoices status succesfully", async () => {
    const response = {
      data: {
        statusCode: 200,
        message: "Successfully validate invoice",
        data: {
          id: "ca8e3433-b330-4790-a14e-ad113f13d027",
          creatorId: "UI210000000",
          amount: 10000,
          status: "Validated",
          buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
          createdAt: "2024-03-28T15:18:58.606Z",
          validatedAt: "2024-03-30T14:55:12.754Z",
        },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(response);

    const invoice = {
      id: "ca8e3433-b330-4790-a14e-ad113f13d027",
      amount: 10000,
      status: "Validated",
      buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
      createdAt: "2024-03-28T15:18:58.606Z",
      validatedAt: "2024-03-30T14:55:12.754Z",
      creatorName: "Lyz",
      exchange: "Top Up",
      payment: "Bank Transfer",
    };

    await updateTopupInvoiceStatus(invoice, "APPROVED");

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it("should return error message when update topup invoices failed", async () => {
    const response = {
      data: {
        statusCode: 500,
        message: "Internal Server Error",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(response);

    const invoice = {
      id: "ca8e3433-b330-4790-a14e-ad113f13d027",
      amount: 10000,
      status: "Validated",
      buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
      createdAt: "2024-03-28T15:18:58.606Z",
      validatedAt: "2024-03-30T14:55:12.754Z",
      creatorName: "Lyz",
      exchange: "Top Up",
      payment: "Bank Transfer",
    };

    const message = await updateTopupInvoiceStatus(invoice, "APPROVED");

    expect(message).toEqual({ message: "Failed to update payment status" });
  });
});
