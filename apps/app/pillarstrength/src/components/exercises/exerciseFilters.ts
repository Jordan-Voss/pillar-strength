import type { ExerciseResponse } from '@/lib/api';
import type { FilterKey } from './ExerciseSearchPanel';

export function filterExercises(
  exercises: ExerciseResponse[],
  activeFilter: FilterKey,
): ExerciseResponse[] {
  return exercises.filter((exercise) => {
    if (activeFilter === 'all') {
      return true;
    }

    if (activeFilter === 'bodyweight') {
      return exercise.bodyweight;
    }

    return exercise.category.toLowerCase() === activeFilter;
  });
}

export function getResultText(
  count: number,
  query: string,
  activeFilter: FilterKey,
): string {
  const suffix = count === 1 ? 'exercise' : 'exercises';

  if (query.trim()) {
    return `${count} ${suffix} matching “${query.trim()}”`;
  }

  if (activeFilter !== 'all') {
    return `${count} ${suffix} in ${formatFilterLabel(activeFilter)}`;
  }

  return `${count} ${suffix}`;
}

function formatFilterLabel(filter: FilterKey): string {
  switch (filter) {
    case 'strength':
      return 'Strength';
    case 'accessory':
      return 'Accessory';
    case 'core':
      return 'Core';
    case 'bodyweight':
      return 'Bodyweight';
    case 'all':
    default:
      return 'All';
  }
}