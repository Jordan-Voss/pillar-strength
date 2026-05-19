package dev.jordanvoss.pillarstrength.exercise;

import dev.jordanvoss.pillarstrength.exercise.dto.ExerciseResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Transactional(readOnly = true)
    public List<ExerciseResponse> listExercises(String query) {
        String cleanedQuery = query == null ? "" : query.trim();

        List<Exercise> exercises = cleanedQuery.isBlank()
                ? exerciseRepository.findAllByOrderByNameAsc()
                : exerciseRepository.findByNameContainingIgnoreCaseOrSlugContainingIgnoreCaseOrderByNameAsc(
                cleanedQuery,
                cleanedQuery
        );

        return exercises.stream()
                .map(ExerciseResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExerciseResponse getExercise(UUID id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ExerciseNotFoundException(id));

        return ExerciseResponse.from(exercise);
    }
}