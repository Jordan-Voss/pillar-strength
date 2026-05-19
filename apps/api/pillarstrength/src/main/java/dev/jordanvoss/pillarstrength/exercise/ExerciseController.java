package dev.jordanvoss.pillarstrength.exercise;

import dev.jordanvoss.pillarstrength.exercise.dto.ExerciseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseResponse> listExercises(
            @RequestParam(required = false) String q
    ) {
        return exerciseService.listExercises(q);
    }

    @GetMapping("/{id}")
    public ExerciseResponse getExercise(@PathVariable UUID id) {
        return exerciseService.getExercise(id);
    }

    @ExceptionHandler(ExerciseNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleExerciseNotFound(ExerciseNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    public record ErrorResponse(String message) {
    }
}