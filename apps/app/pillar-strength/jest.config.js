module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)", "**/?(*.)+(test|spec).(ts|tsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: [
    // Expo SDK 54 needs these transformed because some ship ESM/TS in node_modules
    "node_modules/(?!(expo|@expo|expo-router|react-native|@react-native|react-native-safe-area-context|@testing-library|expo-modules-core|@unimodules)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
