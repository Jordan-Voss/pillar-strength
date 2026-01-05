package com.jordanvoss.pillarstrength.user;

import com.jordanvoss.pillarstrength.profile.E1rmFormula;
import com.jordanvoss.pillarstrength.profile.Theme;
import com.jordanvoss.pillarstrength.profile.Units;

import java.util.UUID;

public record MeResponse(
        UUID userId,
        String firstName,
        String lastName,
        Units units,
        E1rmFormula e1rmFormula,
        Theme theme
) {}

