package dev.jordanvoss.pillarstrength.exercise;

import dev.jordanvoss.pillarstrength.exercise.dto.ExerciseResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}