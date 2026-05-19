import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export default function LogScreen() {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Log</Text>
          <Text style={styles.title}>Record training</Text>
          <Text style={styles.subtitle}>
            Start a planned workout, create a blank session, or browse exercises.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Planned workout</Text>
          <Text style={styles.cardText}>
            Once you start a program, your next planned workout will appear here.
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/programs')}>
            <Text style={styles.primaryButtonText}>Choose a Program</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Blank workout</Text>
          <Text style={styles.cardText}>
            Ad-hoc workout logging will be added after program templates and sessions are wired in.
          </Text>
          <Pressable style={styles.secondaryButton} onPress={() => router.push('/exercises')}>
            <Text style={styles.secondaryButtonText}>Browse Exercise Library</Text>
          </Pressable>
        </View>

        <View style={styles.cardMuted}>
          <Text style={styles.cardTitle}>Future logs</Text>
          <Text style={styles.cardText}>
            Bodyweight, sleep, recovery, food notes, and pain/injury notes can live here later.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.bg.primary },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 140,
    gap: theme.spacing.lg,
  },
  header: { gap: theme.spacing.xs },
  eyebrow: {
    color: theme.colors.interactive.primary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: { color: theme.colors.text.primary, fontSize: 32, fontWeight: '900' },
  subtitle: { color: theme.colors.text.secondary, fontSize: 15, lineHeight: 22 },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardMuted: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    opacity: 0.78,
    ...theme.shadows.sm,
  },
  cardTitle: { color: theme.colors.text.primary, fontSize: 22, fontWeight: '900' },
  cardText: { color: theme.colors.text.secondary, fontSize: 15, lineHeight: 22 },
  primaryButton: {
    minHeight: 52,
    backgroundColor: theme.colors.interactive.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  primaryButtonText: { color: theme.colors.text.inverse, fontSize: 16, fontWeight: '900' },
  secondaryButton: {
    minHeight: 52,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  secondaryButtonText: { color: theme.colors.text.primary, fontSize: 15, fontWeight: '900' },
});