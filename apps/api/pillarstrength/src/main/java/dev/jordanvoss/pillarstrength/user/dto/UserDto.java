package dev.jordanvoss.pillarstrength.user.dto;

import java.util.UUID;

public record UserDto(
        UUID id,
        String email,
        String displayName,
        boolean onboardingComplete
) {
}