import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getExercise,
  type ExerciseResponse,
  type MuscleRole,
} from '@/lib/api';
import { lightTheme as theme } from '@/theme/theme';

export function ExerciseDetailView({
  exerciseId,
  onBack,
}: {
  exerciseId: string;
  onBack: () => void;
}) {
  const [exercise, setExercise] = useState<ExerciseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadExercise() {
      setLoading(true);
      setMessage(null);

      try {
        const data = await getExercise(exerciseId);

        if (active) {
          setExercise(data);
        }
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : 'Failed to load exercise.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadExercise();

    return () => {
      active = false;
    };
  }, [exerciseId]);

  const primaryMuscles = useMemo(
    () => exercise?.muscles.filter((muscle) => muscle.role === 'PRIMARY') ?? [],
    [exercise],
  );

  const secondaryMuscles = useMemo(
    () => exercise?.muscles.filter((muscle) => muscle.role === 'SECONDARY') ?? [],
    [exercise],
  );

  const supportingMuscles = useMemo(
    () => exercise?.muscles.filter((muscle) => muscle.role === 'SUPPORTING') ?? [],
    [exercise],
  );

  if (loading) {
    return (
      <View style={styles.screen}>
        <View style={styles.stateCenter}>
          <ActivityIndicator color={theme.colors.interactive.primary} />
          <Text style={styles.stateText}>Loading exercise...</Text>
        </View>
      </View>
    );
  }

  if (message || !exercise) {
    return (
      <View style={styles.screen}>
        <View style={styles.stateCenter}>
          <Text style={styles.errorText}>{message ?? 'Exercise not found.'}</Text>
          <Pressable style={styles.secondaryButton} onPress={onBack}>
            <Text style={styles.secondaryButtonText}>Go back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View collapsable={false} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets
      >
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>

        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>Exercise</Text>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.subtitle}>
            {exercise.category} · {exercise.movementPattern} · {exercise.equipment}
          </Text>

          <View style={styles.flagRow}>
            <InfoPill label={formatExerciseFamily(exercise.exerciseFamily)} />
            {exercise.bodyweight ? <InfoPill label="Bodyweight" /> : null}
            {exercise.unilateral ? <InfoPill label="Unilateral" /> : null}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Muscles worked</Text>
          <MuscleSection title="Primary" role="PRIMARY" muscles={primaryMuscles} />
          <MuscleSection title="Secondary" role="SECONDARY" muscles={secondaryMuscles} />
          <MuscleSection title="Supporting" role="SUPPORTING" muscles={supportingMuscles} />
        </View>

        <View style={styles.diagramPlaceholder}>
          <Text style={styles.cardTitle}>Body diagram</Text>
          <Text style={styles.cardText}>
            Muscle highlighting will be added here later using the diagram region keys.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progressions and alternatives</Text>
          <Text style={styles.cardText}>
            Variations, regressions, and substitutions will be added after the core program and workout logging flow.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function MuscleSection({
  title,
  role,
  muscles,
}: {
  title: string;
  role: MuscleRole;
  muscles: ExerciseResponse['muscles'];
}) {
  if (muscles.length === 0) {
    return null;
  }

  return (
    <View style={styles.muscleSection}>
      <Text style={styles.muscleSectionTitle}>{title}</Text>
      <View style={styles.chipRow}>
        {muscles.map((muscle) => (
          <View
            key={`${role}-${muscle.code}`}
            style={[
              styles.muscleChip,
              role === 'PRIMARY' && styles.muscleChipPrimary,
              role === 'SECONDARY' && styles.muscleChipSecondary,
            ]}
          >
            <Text
              style={[
                styles.muscleChipText,
                role === 'PRIMARY' && styles.muscleChipTextPrimary,
              ]}
            >
              {muscle.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function InfoPill({ label }: { label: string }) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.infoPillText}>{label}</Text>
    </View>
  );
}

function formatExerciseFamily(value: string): string {
  return value
    .split('_')
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ');
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
  stateCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  stateText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
  },
  errorText: {
    color: theme.colors.status.error,
    fontSize: 15,
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
  },
  backButtonText: {
    color: theme.colors.text.link,
    fontSize: 15,
    fontWeight: '900',
  },
  headerCard: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.md,
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
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  flagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
  },
  infoPill: {
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.bg.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
  },
  infoPillText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '900',
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  diagramPlaceholder: {
    minHeight: 180,
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  cardTitle: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  cardText: {
    color: theme.colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  muscleSection: {
    gap: theme.spacing.sm,
  },
  muscleSectionTitle: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  muscleChip: {
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.bg.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
  },
  muscleChipPrimary: {
    backgroundColor: 'rgba(215, 38, 61, 0.12)',
  },
  muscleChipSecondary: {
    backgroundColor: 'rgba(14, 29, 61, 0.08)',
  },
  muscleChipText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '800',
  },
  muscleChipTextPrimary: {
    color: theme.colors.interactive.primary,
  },
  secondaryButton: {
    minHeight: 52,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
    fontSize: 15,
    fontWeight: '900',
  },
});