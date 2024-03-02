import { authenticate } from "@/lib/action";
import { signIn } from "@/auth";

jest.mock("@/auth", () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
  };
});

describe("Authenticate action", () => {
  it("should call signIn middleware", async () => {
    (signIn as jest.Mock).mockResolvedValue({});
    await authenticate(undefined, new FormData());
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("should return error for invalid credentials", async () => {
    const errorMessage = "error";
    (signIn as jest.Mock).mockRejectedValue(new Error(errorMessage));
    await expect(authenticate(undefined, new FormData())).rejects.toThrow(
      errorMessage,
    );
  });
});
