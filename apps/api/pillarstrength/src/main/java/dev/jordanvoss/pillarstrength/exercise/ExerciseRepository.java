package dev.jordanvoss.pillarstrength.exercise;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {

    @EntityGraph(attributePaths = {"exerciseMuscles", "exerciseMuscles.muscle"})
    List<Exercise> findAllByOrderByNameAsc();

    @EntityGraph(attributePaths = {"exerciseMuscles", "exerciseMuscles.muscle"})
    List<Exercise> findByNameContainingIgnoreCaseOrSlugContainingIgnoreCaseOrderByNameAsc(
            String name,
            String slug
    );

    @EntityGraph(attributePaths = {"exerciseMuscles", "exerciseMuscles.muscle"})
    Optional<Exercise> findWithExerciseMusclesById(UUID id);
}