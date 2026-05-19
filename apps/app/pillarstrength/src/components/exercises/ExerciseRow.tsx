import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  type ExerciseResponse,
  type MuscleRole,
} from '@/lib/api';
import { lightTheme as theme } from '@/theme/theme';

export function ExerciseRow({ exercise }: { exercise: ExerciseResponse }) {
  const primaryMuscles = exercise.muscles.filter((muscle) => muscle.role === 'PRIMARY');
  const secondaryMuscles = exercise.muscles.filter((muscle) => muscle.role === 'SECONDARY');

  const supportingCount = exercise.muscles.filter(
    (muscle) => muscle.role === 'SUPPORTING',
  ).length;

  return (
    <Pressable style={({ pressed }) => [styles.exerciseRow, pressed && styles.pressed]}>
      <View style={styles.exerciseTopRow}>
        <View style={styles.exerciseTitleBlock}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseMeta}>
            {exercise.category} · {exercise.movementPattern} · {exercise.equipment}
          </Text>
        </View>

        <View style={styles.exerciseFamilyPill}>
          <Text style={styles.exerciseFamilyText}>
            {formatExerciseFamily(exercise.exerciseFamily)}
          </Text>
        </View>
      </View>

      <MusclePreview label="Primary" muscles={primaryMuscles} role="PRIMARY" />
      <MusclePreview label="Secondary" muscles={secondaryMuscles} role="SECONDARY" />

      <View style={styles.exerciseFooter}>
        {exercise.bodyweight ? <Text style={styles.flagText}>Bodyweight</Text> : null}
        {exercise.unilateral ? <Text style={styles.flagText}>Unilateral</Text> : null}
        {supportingCount > 0 ? (
          <Text style={styles.supportingText}>{supportingCount} supporting</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

function MusclePreview({
  label,
  muscles,
  role,
}: {
  label: string;
  muscles: ExerciseResponse['muscles'];
  role: MuscleRole;
}) {
  if (muscles.length === 0) {
    return null;
  }

  const visibleMuscles = muscles.slice(0, 4);
  const hiddenCount = muscles.length - visibleMuscles.length;

  return (
    <View style={styles.musclePreview}>
      <Text style={styles.muscleLabel}>{label}</Text>
      <View style={styles.muscleChipRow}>
        {visibleMuscles.map((muscle) => (
          <MuscleChip key={`${role}-${muscle.code}`} label={muscle.name} role={role} />
        ))}

        {hiddenCount > 0 ? (
          <View style={styles.moreChip}>
            <Text style={styles.moreChipText}>+{hiddenCount}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function MuscleChip({ label, role }: { label: string; role: MuscleRole }) {
  return (
    <View
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
        {label}
      </Text>
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
  exerciseRow: {
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  exerciseTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  exerciseTitleBlock: {
    flex: 1,
    gap: 3,
  },
  exerciseName: {
    color: theme.colors.text.primary,
    fontSize: 17,
    fontWeight: '900',
  },
  exerciseMeta: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  exerciseFamilyPill: {
    maxWidth: 132,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.bg.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
  },
  exerciseFamilyText: {
    color: theme.colors.text.secondary,
    fontSize: 11,
    fontWeight: '900',
  },
  musclePreview: {
    gap: 6,
  },
  muscleLabel: {
    color: theme.colors.text.secondary,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  muscleChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  muscleChip: {
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.bg.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
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
  moreChip: {
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.bg.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
  },
  moreChipText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '900',
  },
  exerciseFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingTop: 2,
  },
  flagText: {
    color: theme.colors.interactive.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  supportingText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.82,
  },
});