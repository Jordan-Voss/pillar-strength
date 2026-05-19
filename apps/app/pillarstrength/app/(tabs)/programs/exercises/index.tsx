import { router } from 'expo-router';

import { ExerciseLibraryView } from '@/components/exercises/ExerciseLibraryView';
import type { ExerciseResponse } from '@/lib/api';

export default function ProgramExercisesScreen() {
  return (
    <ExerciseLibraryView
      mode="select"
      title="Add exercise"
      subtitle="Choose an exercise for this program day."
      onSelectExercise={(_exercise: ExerciseResponse) => {
        // Later: add selected exercise to program day.
        router.back();
      }}
    />
  );
}