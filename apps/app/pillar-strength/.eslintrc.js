module.exports = {
  extends: ["universe/native"],
  plugins: ["react-native"],
  rules: {
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "error",
    "react-native/no-unused-styles": "error",
  },
};
