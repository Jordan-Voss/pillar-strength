import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  ExerciseSearchPanel,
  type FilterKey,
} from '@/components/exercises/ExerciseSearchPanel';
import { ExerciseRow } from '@/components/exercises/ExerciseRow';
import {
  filterExercises,
  getResultText,
} from '@/components/exercises/exerciseFilters';
import { getExercises, type ExerciseResponse } from '@/lib/api';
import { lightTheme as theme } from '@/theme/theme';

export default function ExercisesScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadExercises() {
      setLoading(true);
      setMessage(null);

      try {
        const data = await getExercises(query);

        if (active) {
          setExercises(data);
        }
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : 'Failed to load exercises.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(loadExercises, query.trim() ? 300 : 0);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [query, reloadKey]);

  const filteredExercises = useMemo(
    () => filterExercises(exercises, activeFilter),
    [activeFilter, exercises],
  );

  const resultText = getResultText(filteredExercises.length, query, activeFilter);

  return (
    <View collapsable={false} style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            contentInsetAdjustmentBehavior="automatic"
            automaticallyAdjustContentInsets
          >
            <View style={styles.header}>
              <Text style={styles.eyebrow}>Exercise Library</Text>
              <Text style={styles.title}>Browse exercises</Text>
              <Text style={styles.subtitle}>
                Search movements, muscles, equipment, and training patterns.
              </Text>
            </View>

            <ExerciseSearchPanel
              query={query}
              onChangeQuery={setQuery}
              activeFilter={activeFilter}
              onChangeFilter={setActiveFilter}
              resultText={resultText}
            />

            {loading ? (
              <View style={styles.stateCard}>
                <ActivityIndicator color={theme.colors.interactive.primary} />
                <Text style={styles.stateText}>Loading exercises...</Text>
              </View>
            ) : null}

            {!loading && message ? (
              <View style={styles.stateCard}>
                <Text style={styles.errorText}>{message}</Text>
                <Pressable
                  style={styles.retryButton}
                  onPress={() => setReloadKey((current) => current + 1)}
                >
                  <Text style={styles.retryButtonText}>Try again</Text>
                </Pressable>
              </View>
            ) : null}

            {!loading && !message && filteredExercises.length === 0 ? (
              <View style={styles.stateCard}>
                <Text style={styles.stateTitle}>No exercises found</Text>
                <Text style={styles.stateText}>
                  Try a different search term or clear the current filter.
                </Text>
              </View>
            ) : null}

            {!loading && !message && filteredExercises.length > 0 ? (
              <View style={styles.exerciseList}>
                {filteredExercises.map((exercise) => (
                  <ExerciseRow key={exercise.id} exercise={exercise} />
                ))}
              </View>
            ) : null}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
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
    maxWidth: 720,
  },
  exerciseList: {
    gap: theme.spacing.sm,
  },
  stateCard: {
    minHeight: 112,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.card.background,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  stateTitle: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  stateText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.status.error,
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: theme.borderRadius.md,
    borderColor: theme.colors.border,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  retryButtonText: {
    color: theme.colors.text.primary,
    fontSize: 13,
    fontWeight: '800',
  },
});