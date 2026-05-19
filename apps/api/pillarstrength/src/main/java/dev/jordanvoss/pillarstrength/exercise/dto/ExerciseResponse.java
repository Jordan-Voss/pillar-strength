package dev.jordanvoss.pillarstrength.exercise.dto;

import dev.jordanvoss.pillarstrength.exercise.Exercise;

import java.util.List;
import java.util.UUID;

public record ExerciseResponse(
        UUID id,
        String name,
        String slug,
        String category,
        String movementPattern,
        String equipment,
        boolean bodyweight,
        boolean unilateral,
        List<MuscleResponse> muscles
) {
    public static ExerciseResponse from(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getSlug(),
                exercise.getCategory(),
                exercise.getMovementPattern(),
                exercise.getEquipment(),
                exercise.isBodyweight(),
                exercise.isUnilateral(),
                exercise.getExerciseMuscles().stream()
                        .map(MuscleResponse::from)
                        .toList()
        );
    }
}