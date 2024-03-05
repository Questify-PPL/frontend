import { getUserJwt, getUserProfile, authCredentials } from "@/auth";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getUserJwt", () => {
  it("should return valid user JWT", async () => {
    const jwt = {
      accessToken: "token",
    };
    const expectedResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        data: jwt,
      },
    };

    mockedAxios.post.mockResolvedValue(expectedResponse);

    const returnedJwt = await getUserJwt("questify@gmail.com", "password");
    expect(returnedJwt.accessToken).toBe(jwt.accessToken);
  });

  it("should return error on non-valid user", async () => {
    const expectedResponse = {
      data: {
        message: "User not found",
        error: "Not Found",
        statusCode: 404,
      },
    };

    mockedAxios.post.mockResolvedValue(expectedResponse);
    await expect(getUserJwt("questify@gmail.com", "password")).rejects.toThrow(
      "Failed to fetch user",
    );
  });
});

describe("getUserProfile", () => {
  it("should return user profile with valid JWT", async () => {
    const user = {
      email: "questify@gmail.com",
    };
    const expectedResponse = {
      status: 200,
      data: user,
    };

    mockedAxios.get.mockResolvedValue(expectedResponse);

    const returnedUser = await getUserProfile("token");
    expect(returnedUser.email).toBe(user.email);
  });

  it("should return error with invalid JWT", async () => {
    const expectedResponse = {
      status: 400,
      data: {},
    };

    mockedAxios.get.mockResolvedValue(expectedResponse);

    await expect(getUserProfile("token")).rejects.toThrow(
      "Failed to fetch user's profile",
    );
  });
});

describe("authorize user login", () => {
  it("should return null with invalid credentials", async () => {
    const credentials = {
      email: "questify",
      password: "no",
    };

    const user = await authCredentials.authorize(credentials);

    // @ts-ignore
    expect(user).toBeNull();
  });

  it("should return user info with valid credentials", async () => {
    const credentials = {
      email: "questify@gmail.com",
      password: "password",
    };

    const profileResponse = {
      status: 200,
      data: {
        email: credentials.email,
      },
    };

    const jwt = {
      accessToken: "token",
    };
    const jwtResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        data: jwt,
      },
    };

    mockedAxios.post.mockResolvedValue(jwtResponse);
    mockedAxios.get.mockResolvedValue(profileResponse);

    const returnedUser = await authCredentials.authorize(credentials);

    // @ts-ignore
    expect(returnedUser.email).toBe(credentials.email);
  });

  it("should return user info with valid SSO credentials", async () => {
    const credentials = {
      email: "questify@gmail.com",
      SSO: "TOKEN",
    };

    const profileResponse = {
      status: 200,
      data: {
        email: credentials.email,
      },
    };

    const jwt = {
      accessToken: "token",
    };
    const jwtResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        data: jwt,
      },
    };

    mockedAxios.post.mockResolvedValue(jwtResponse);
    mockedAxios.get.mockResolvedValue(profileResponse);

    const returnedUser = await authCredentials.authorize(credentials);

    // @ts-ignore
    expect(returnedUser.email).toBe(credentials.email);
  });

  it("should return null when error happens", async () => {
    const credentials = {
      email: "questify@gmail.com",
      SSO: "TOKEN",
    };

    const profileResponse = {
      status: 400,
    };
    const jwtResponse = {
      data: {
        statusCode: 400,
      },
    };

    mockedAxios.post.mockResolvedValue(jwtResponse);
    mockedAxios.get.mockResolvedValue(profileResponse);

    const returnedUser = await authCredentials.authorize(credentials);

    // @ts-ignore
    expect(returnedUser).toBeNull();
  });
});
