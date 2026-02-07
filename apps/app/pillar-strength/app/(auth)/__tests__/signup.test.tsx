import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import Signup from "../signup";

describe("Signup screen", () => {
  it("shows validation error when passwords mismatch", () => {
    const { getByTestId, getByText } = render(<Signup />);

    fireEvent.changeText(getByTestId("signup-first-name"), "Jordan");
    fireEvent.changeText(getByTestId("signup-last-name"), "Voss");
    fireEvent.changeText(getByTestId("signup-email"), "a@b.com");

    fireEvent.changeText(getByTestId("signup-password"), "pass1234");
    fireEvent.changeText(
      getByTestId("signup-confirm-password"),
      "different123",
    );

    fireEvent.press(getByTestId("signup-submit"));

    expect(getByText("Passwords do not match.")).toBeTruthy();
  });
});
