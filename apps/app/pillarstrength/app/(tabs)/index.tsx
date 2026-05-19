import { router } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { lightTheme as theme } from '@/theme/theme';

export default function HomeScreen() {
  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <View style={styles.hero}>
          <Image
            source={require('../../assets/brand/horizontal-nobg-navy-writing.png')}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>
            Your current program, next workout, and recent training will appear here.
          </Text>
        </View>

        <View style={styles.primaryCard}>
          <Text style={styles.cardEyebrow}>Next workout</Text>
          <Text style={styles.cardTitle}>No active program yet</Text>
          <Text style={styles.cardText}>
            Choose a template or create your own program to see what to train next.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => router.push('/programs')}>
            <Text style={styles.primaryButtonText}>Browse Programs</Text>
          </Pressable>
        </View>

        <View style={styles.quickGrid}>
          <QuickAction title="Log workout" subtitle="Planned or blank session" onPress={() => router.push('/log')} />
          <QuickAction title="Programs" subtitle="Templates and custom plans" onPress={() => router.push('/programs')} />
          <QuickAction title="Exercises" subtitle="Browse movement library" onPress={() => router.push('/exercises')} />
          <QuickAction title="Progress" subtitle="History and stats" onPress={() => router.push('/progress')} />
        </View>
      </ScrollView>
    </View>
  );
}

function QuickAction({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </Pressable>
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
  hero: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.md,
  },
  logo: {
    width: 220,
    height: 70,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  primaryCard: {
    backgroundColor: theme.colors.surface.header,
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
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  actionCard: {
    width: '47%',
    minHeight: 112,
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    ...theme.shadows.sm,
  },
  actionTitle: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  actionSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.84,
  },
});