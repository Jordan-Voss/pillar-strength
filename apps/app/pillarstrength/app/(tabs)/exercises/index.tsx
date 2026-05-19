import { router } from 'expo-router';

import { ExerciseLibraryView } from '@/components/exercises/ExerciseLibraryView';
import type { ExerciseResponse } from '@/lib/api';

export default function HomeExercisesScreen() {
  return (
    <ExerciseLibraryView
      mode="browse"
      onSelectExercise={(exercise: ExerciseResponse) =>
        router.push({
          pathname: '/exercises/[id]',
          params: { id: exercise.id },
        })
      }
    />
  );
}