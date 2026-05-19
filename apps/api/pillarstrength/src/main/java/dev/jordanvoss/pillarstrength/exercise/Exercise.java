package dev.jordanvoss.pillarstrength.exercise;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String category;

    @Column(name = "exercise_family", nullable = false)
    private String exerciseFamily;

    @Column(name = "movement_pattern", nullable = false)
    private String movementPattern;

    @Column(nullable = false)
    private String equipment;

    @Column(name = "is_bodyweight", nullable = false)
    private boolean bodyweight;

    @Column(name = "is_unilateral", nullable = false)
    private boolean unilateral;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY)
    private List<ExerciseMuscle> exerciseMuscles = new ArrayList<>();

    protected Exercise() {
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }

    public String getCategory() {
        return category;
    }

    public String getExerciseFamily() {
        return exerciseFamily;
    }

    public String getMovementPattern() {
        return movementPattern;
    }

    public String getEquipment() {
        return equipment;
    }

    public boolean isBodyweight() {
        return bodyweight;
    }

    public boolean isUnilateral() {
        return unilateral;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<ExerciseMuscle> getExerciseMuscles() {
        return exerciseMuscles.stream()
                .sorted(Comparator.comparingInt(ExerciseMuscle::getSortOrder))
                .toList();
    }
}