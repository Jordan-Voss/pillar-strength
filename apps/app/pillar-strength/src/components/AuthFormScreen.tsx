import React from "react";
import { Keyboard, Platform, KeyboardAvoidingView, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Screen } from "./Screen";

export function AuthFormScreen({ children }: { children: React.ReactNode }) {
  return (
    <Screen variant="auth">
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            {children}
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </Pressable>
    </Screen>
  );
}
