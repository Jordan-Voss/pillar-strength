import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export default function ProgressScreen() {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Progress</Text>
          <Text style={styles.title}>History and stats</Text>
          <Text style={styles.subtitle}>
            Review completed workouts, exercise history, e1RM trends, and weekly summaries.
          </Text>
        </View>

        <ProgressCard title="Workout history" text="Completed sessions will appear here once workout logging is added." />
        <ProgressCard title="Strength trends" text="Estimated 1RM and top-set history will be calculated from logged sets." />
        <ProgressCard title="Volume" text="Weekly sets and training volume by movement or muscle group can live here later." />
      </ScrollView>
    </View>
  );
}

function ProgressCard({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
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
    ...theme.shadows.sm,
  },
  cardTitle: { color: theme.colors.text.primary, fontSize: 20, fontWeight: '900' },
  cardText: { color: theme.colors.text.secondary, fontSize: 15, lineHeight: 22 },
});