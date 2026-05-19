package dev.jordanvoss.pillarstrength.exercise.dto;

import dev.jordanvoss.pillarstrength.exercise.ExerciseMuscle;
import dev.jordanvoss.pillarstrength.exercise.ExerciseMuscleRole;
import dev.jordanvoss.pillarstrength.exercise.Muscle;

import java.util.UUID;

public record MuscleResponse(
        UUID id,
        String code,
        String name,
        String muscleGroup,
        String bodyRegion,
        String diagramRegionKey,
        ExerciseMuscleRole role
) {
    public static MuscleResponse from(ExerciseMuscle exerciseMuscle) {
        Muscle muscle = exerciseMuscle.getMuscle();

        return new MuscleResponse(
                muscle.getId(),
                muscle.getCode(),
                muscle.getName(),
                muscle.getMuscleGroup(),
                muscle.getBodyRegion(),
                muscle.getDiagramRegionKey(),
                exerciseMuscle.getRole()
        );
    }
}