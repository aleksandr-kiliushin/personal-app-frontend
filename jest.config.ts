const config = {
  moduleNameMapper: {
    "^#components(.*)$": "<rootDir>/src/components$1",
    "^#models(.*)$": "<rootDir>/src/models$1",
    "^#src(.*)$": "<rootDir>/src$1",
    "^#styles(.*)$": "<rootDir>/src/styles$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
    "^#views(.*)$": "<rootDir>/src/views$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
}

export default config
