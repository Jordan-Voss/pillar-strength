import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export default function ProgramsScreen() {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Programs</Text>
          <Text style={styles.title}>Plan your training</Text>
          <Text style={styles.subtitle}>
            Build programs, manage templates, and add exercises from the shared Exercise Library.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEyebrow}>First building block</Text>
          <Text style={styles.cardTitle}>Exercise Library</Text>
          <Text style={styles.cardText}>
            Browse the exercise catalogue before we wire it into templates and program days.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => router.push('/exercises')}>
            <Text style={styles.primaryButtonText}>Browse Exercise Library</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming to Programs</Text>

          <ComingSoonRow title="Program Templates" subtitle="Reusable strength blocks and coaching templates." />
          <ComingSoonRow title="Program Builder" subtitle="Create days, add exercises, and define set schemes." />
          <ComingSoonRow title="Current Program" subtitle="See your active training block and schedule." />
        </View>
      </ScrollView>
    </View>
  );
}

function ComingSoonRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.rowBadge}>Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 140,
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
  },
  eyebrow: {
    color: theme.colors.interactive.primary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardEyebrow: {
    color: theme.colors.interactive.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardTitle: {
    color: theme.colors.text.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  cardText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    minHeight: 52,
    backgroundColor: theme.colors.interactive.primary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  primaryButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '900',
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    color: theme.colors.text.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  rowSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 18,
  },
  rowBadge: {
    color: theme.colors.text.secondary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});