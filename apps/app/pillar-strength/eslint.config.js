import expo from "eslint-config-universe/native";
import reactNative from "eslint-plugin-react-native";

export default [
  ...expo,
  {
    plugins: {
      "react-native": reactNative,
    },
    rules: {
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "error",
      "react-native/no-unused-styles": "error",
    },
  },
];
