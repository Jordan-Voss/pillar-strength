package dev.jordanvoss.pillarstrength.user.profile.dto;

import dev.jordanvoss.pillarstrength.user.profile.E1rmFormula;
import dev.jordanvoss.pillarstrength.user.profile.Units;

public record PreferencesDto(
        String theme,
        String timezone,
        Units units,
        E1rmFormula e1rmFormula
) {
}