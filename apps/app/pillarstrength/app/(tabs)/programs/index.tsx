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
          <Text style={styles.title}>Programs and templates</Text>
          <Text style={styles.subtitle}>
            Choose a template or create your own program. This is an internal setup screen, not a main tab.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Program templates</Text>
          <Text style={styles.cardText}>
            Seeded templates will be added next: strength, powerlifting, rugby, and upper/lower.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Exercise Library</Text>
          <Text style={styles.cardText}>
            Browse exercises before adding them to templates and custom programs.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => router.push('/exercises')}>
            <Text style={styles.primaryButtonText}>Browse Exercises</Text>
          </Pressable>
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
});