import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**app/*.{js,jsx,ts,tsx}",
    "**app/**/*.{js,jsx,ts,tsx}",
    "!**app/layout.tsx",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
  automock: false,
  setupFiles: ["./setupJest.ts", "jest-canvas-mock"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
    "next-auth": "<rootDir>/__tests__/mocks/next-auth.ts",
  },
  testPathIgnorePatterns: ["next-auth.ts"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
