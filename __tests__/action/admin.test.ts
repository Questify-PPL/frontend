import {
  getReports,
  getTopupInvoices,
  getWithdrawalInvoices,
  updateReport,
  updateTopupInvoiceStatus,
  updateWithdrawInvoiceStatus,
} from "@/lib/action/admin";
import { mergeInvoicesByDate } from "@/lib/action/utils/mergeInvoice";
import { ReportStatus } from "@/lib/types/admin/report";
import { UserRole } from "@/lib/types/auth";
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

  it("should return withdrawal invoices", async () => {
    const response = {
      data: {
        statusCode: 200,
        message: "Successfully get all on validation invoice",
        data: [
          {
            id: "7fb11a47-8c91-4ccd-b585-c634e9d10bbe",
            userId: "bad10865-9798-4b6a-98b7-f2f95e20bb38",
            userName: "",
            status: "PENDING",
            createdAt: "2024-04-02T10:54:22.197Z",
            validatedAt: null,
            exchange: "Withdraw",
            amount: 0,
            payment: "",
            accountNumber: "",
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(response);
    const invoices = await getWithdrawalInvoices();
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
      await getWithdrawalInvoices();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch invoices"));
    }
  });

  it("should update withdraw invoices status succesfully", async () => {
    const response = {
      data: {
        statusCode: 200,
        message: "Successfully validate the withdrawal",
        data: {
          id: "b8779b26-191d-4150-b088-4c7853830b20",
          userId: "5c336d64-4324-476b-98cf-78b001bb097b",
          userName: "Test",
          status: "APPROVED",
          createdAt: "2024-04-02T11:08:07.672Z",
          validatedAt: "2024-04-02T11:10:27.178Z",
          exchange: "Withdraw",
          amount: 0,
          payment: "",
          accountNumber: "",
        },
      },
    };

    mockedAxios.patch.mockResolvedValueOnce(response);

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

    await updateWithdrawInvoiceStatus(invoice, "APPROVED");

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
  });

  it("should return error message when update topup invoices failed", async () => {
    const response = {
      data: {
        statusCode: 500,
        message: "Internal Server Error",
      },
    };

    mockedAxios.patch.mockResolvedValueOnce(response);

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

    const message = await updateWithdrawInvoiceStatus(invoice, "APPROVED");

    expect(message).toEqual({ message: "Failed to update withdraw status" });
  });

  it("should merge topup invoice and withdraw invoice by date", () => {
    const topupInvoice = [
      {
        id: "ca8e3433-b330-4790-a14e-ad113f13d027",
        amount: 10000,
        status: "Validated",
        buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
        createdAt: "2024-04-05T00:00:00.000Z",
        validatedAt: "2024-04-05T00:00:00.000Z",
        creatorName: "Lyz",
        exchange: "Top Up",
        payment: "Bank Transfer",
      },
      {
        id: "ca8e3433-b330-4790-a14e-ad113f13d027",
        amount: 10000,
        status: "Validated",
        buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
        createdAt: "2024-04-02T00:00:00.000Z",
        validatedAt: "2024-04-02T00:00:00.000Z",
        creatorName: "Lyz",
        exchange: "Top Up",
        payment: "Bank Transfer",
      },
    ];

    const withdrawInvoice = [
      {
        id: "b8779b26-191d-4150-b088-4c7853830b20",
        userId: "5c336d64-4324-476b-98cf-78b001bb097b",
        userName: "Test",
        status: "APPROVED",
        createdAt: "2024-04-04T00:00:00.000Z",
        validatedAt: "2024-04-04T00:00:00.000Z",
        exchange: "Withdraw",
        amount: 0,
        payment: "",
        accountNumber: "",
      },
      {
        id: "b8779b26-191d-4150-b088-4c7853830b20",
        userId: "5c336d64-4324-476b-98cf-78b001bb097b",
        userName: "Test",
        status: "APPROVED",
        createdAt: "2024-04-03T00:00:00.000Z",
        validatedAt: "2024-04-03T00:00:00.000Z",
        exchange: "Withdraw",
        amount: 0,
        payment: "",
        accountNumber: "",
      },
    ];

    const mergedInvoices = mergeInvoicesByDate(topupInvoice, withdrawInvoice);

    expect(mergedInvoices).toEqual([
      {
        id: "ca8e3433-b330-4790-a14e-ad113f13d027",
        amount: 10000,
        status: "Validated",
        buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
        createdAt: "2024-04-05T00:00:00.000Z",
        validatedAt: "2024-04-05T00:00:00.000Z",
        creatorName: "Lyz",
        exchange: "Top Up",
        payment: "Bank Transfer",
      },
      {
        id: "b8779b26-191d-4150-b088-4c7853830b20",
        userId: "5c336d64-4324-476b-98cf-78b001bb097b",
        userName: "Test",
        status: "APPROVED",
        createdAt: "2024-04-04T00:00:00.000Z",
        validatedAt: "2024-04-04T00:00:00.000Z",
        exchange: "Withdraw",
        amount: 0,
        payment: "",
        accountNumber: "",
      },
      {
        id: "b8779b26-191d-4150-b088-4c7853830b20",
        userId: "5c336d64-4324-476b-98cf-78b001bb097b",
        userName: "Test",
        status: "APPROVED",
        createdAt: "2024-04-03T00:00:00.000Z",
        validatedAt: "2024-04-03T00:00:00.000Z",
        exchange: "Withdraw",
        amount: 0,
        payment: "",
        accountNumber: "",
      },
      {
        id: "ca8e3433-b330-4790-a14e-ad113f13d027",
        amount: 10000,
        status: "Validated",
        buktiPembayaranUrl: "\twww.cloudinary.com/Integerfinibusnam",
        createdAt: "2024-04-02T00:00:00.000Z",
        validatedAt: "2024-04-02T00:00:00.000Z",
        creatorName: "Lyz",
        exchange: "Top Up",
        payment: "Bank Transfer",
      },
    ]);
  });
});

describe("Reports", () => {
  beforeEach(() => {
    mockedAxios.patch.mockClear();
  });

  it("should return reports", async () => {
    const response = {
      status: 200,
      data: [
        {
          id: "a56396b9-86bf-4174-bed2-ad4401bcb785",
          toUserId: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
          fromUserId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
          formId: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
          message: "creatornya gk jelas",
          status: "REJECTED",
          createdAt: "2024-04-30T07:41:34.806Z",
          fromUser: {
            id: "08312d19-51d1-45cc-a4f6-e93786efa59a",
            firstName: "Creator",
            lastName: "",
            email: "creator@questify.com",
            roles: ["CREATOR"],
          },
          toUser: {
            id: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
            firstName: "Respondent",
            lastName: "Questify 2",
            email: "respondent2@questify.com",
            roles: ["RESPONDENT"],
          },
          form: {
            id: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
            creatorId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
          },
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce(response);
    const invoices = await getReports();

    expect(invoices).toEqual(response.data);
  });

  it("should throw error when request failed", async () => {
    const response = {
      status: 400,
      data: [],
    };

    mockedAxios.get.mockResolvedValueOnce(response);

    await expect(getReports()).rejects.toThrow(
      new Error("Failed to fetch reports"),
    );
  });

  it("should update report status succesfully", async () => {
    const report = {
      id: "a56396b9-86bf-4174-bed2-ad4401bcb785",
      toUserId: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
      fromUserId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
      formId: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
      message: "creatornya gk jelas",
      status: ReportStatus.PENDING,
      createdAt: "2024-04-30T07:41:34.806Z",
      fromUser: {
        id: "08312d19-51d1-45cc-a4f6-e93786efa59a",
        firstName: "Creator",
        lastName: "",
        email: "creator@questify.com",
        roles: ["CREATOR"] as UserRole[],
      },
      toUser: {
        id: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
        firstName: "Respondent",
        lastName: "Questify 2",
        email: "respondent2@questify.com",
        roles: ["RESPONDENT"] as UserRole[],
        _count: {
          ReportTo: 4,
        },
      },
      form: {
        id: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
        creatorId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
      },
    };

    const response = {
      data: {
        statusCode: 200,
      },
    };

    mockedAxios.patch.mockResolvedValueOnce(response);

    await updateReport(report, ReportStatus.APPROVED);

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
  });

  it("should return error message when update report failed", async () => {
    const report = {
      id: "a56396b9-86bf-4174-bed2-ad4401bcb785",
      toUserId: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
      fromUserId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
      formId: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
      message: "creatornya gk jelas",
      status: ReportStatus.PENDING,
      createdAt: "2024-04-30T07:41:34.806Z",
      fromUser: {
        id: "08312d19-51d1-45cc-a4f6-e93786efa59a",
        firstName: "Creator",
        lastName: "",
        email: "creator@questify.com",
        roles: ["CREATOR"] as UserRole[],
      },
      toUser: {
        id: "2dfe14d5-85a8-45d3-8e69-a9955e98dd09",
        firstName: "Respondent",
        lastName: "Questify 2",
        email: "respondent2@questify.com",
        roles: ["RESPONDENT"] as UserRole[],
        _count: {
          ReportTo: 4,
        },
      },
      form: {
        id: "6ab1a40b-2713-4cba-ada2-56e09c0c9dda",
        creatorId: "08312d19-51d1-45cc-a4f6-e93786efa59a",
      },
    };

    const response = {
      data: {
        statusCode: 500,
      },
    };

    mockedAxios.patch.mockResolvedValueOnce(response);

    await expect(updateReport(report, ReportStatus.APPROVED)).resolves.toEqual({
      message: "Failed to update report",
    });
  });
});
