package dev.jordanvoss.pillarstrength.user.dto;

import dev.jordanvoss.pillarstrength.user.E1rmFormula;
import dev.jordanvoss.pillarstrength.user.Units;

public record PreferencesDto(
        String theme,
        String timezone,
        Units units,
        E1rmFormula e1rmFormula
) {
}