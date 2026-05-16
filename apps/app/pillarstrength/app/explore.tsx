import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export default function ExploreScreen() {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Explore</Text>
          <Text style={styles.title}>Exercise Library</Text>
          <Text style={styles.subtitle}>
            This is the next real product slice: seeded lifts, search, filters, and exercise details.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coming next</Text>
          <Text style={styles.cardText}>
            Start with a backend exercise table, seed core strength movements, then show them here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suggested first categories</Text>
          <Text style={styles.cardText}>
            Squat, bench, deadlift, overhead press, row, pull-up, accessories, and rehab/prehab.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
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
    fontWeight: '800',
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
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  cardTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  cardText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
});