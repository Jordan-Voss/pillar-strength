import { router, useLocalSearchParams } from 'expo-router';

import { ExerciseDetailView } from '@/components/exercises/ExerciseDetailView';

export default function ProgramExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ExerciseDetailView exerciseId={id} onBack={() => router.back()} />;
}