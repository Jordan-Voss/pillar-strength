import React from "react";
import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Screen } from "./Screen";

export function AuthFormScreen({ children }: { children: React.ReactNode }) {
  return (
    <Screen variant="auth">
      <Pressable
        style={styles.flex}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            contentContainerStyle={styles.scrollContent}
          >
            {children}
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center" },
});
