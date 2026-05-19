package dev.jordanvoss.pillarstrength.exercise;

import dev.jordanvoss.pillarstrength.exercise.dto.ExerciseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}