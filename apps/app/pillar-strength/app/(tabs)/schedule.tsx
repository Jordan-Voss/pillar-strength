import React from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../src/theme/useTheme';
import { supabase } from '../../src/lib/supabase';
import { Screen } from "../../src/components/Screen";
import { useUser } from "../_layout";

export default function ScheduleScreen() {
  const t = useTheme();
  const userProfile = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Screen>
      <View style={[styles.container, { backgroundColor: t.background }]}>
        <Text style={[styles.title, { color: t.textPrimary }]}>Schedule</Text>
        
        {userProfile ? (
          <View style={styles.card}>
            <Text style={[styles.label, { color: t.textSecondary }]}>Settings</Text>
            <Text style={[styles.value, { color: t.textPrimary }]}>Units: {userProfile.units}</Text>
            <Text style={[styles.value, { color: t.textPrimary }]}>Formula: {userProfile.e1rmFormula}</Text>
            
            <Pressable 
              onPress={handleLogout} 
              style={[styles.logoutButton, { backgroundColor: t.error }]}
            >
              <Text style={[styles.logoutText, { color: t.white }]}>Logout</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.center}>
            <ActivityIndicator color={t.accent} />
            <Text style={{ color: t.textMuted, marginTop: 10 }}>Syncing profile...</Text>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 20 },
  card: { flex: 1, gap: 10 },
  label: { fontSize: 14, fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: 18, marginBottom: 5 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutText: { fontWeight: '700', fontSize: 16 },
});