import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

import { supabase } from "../../../src/lib/supabase";
import Login from "../login";

jest.mock("../../../src/lib/supabase");

describe("Login screen", () => {
  it("logs in and navigates to schedule on success", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("you@example.com"), "a@b.com");
    fireEvent.changeText(getByPlaceholderText("••••••••"), "password123");

    fireEvent.press(getByText("Log in"));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith("/(tabs)/schedule");
    });
  });

  it("shows error banner on failure", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    const { getByText, getByPlaceholderText, findByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("you@example.com"), "a@b.com");
    fireEvent.changeText(getByPlaceholderText("••••••••"), "badpass");

    fireEvent.press(getByText("Log in"));

    expect(await findByText("Invalid login credentials")).toBeTruthy();
  });
});
