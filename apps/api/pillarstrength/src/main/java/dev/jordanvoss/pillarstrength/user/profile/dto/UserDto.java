package dev.jordanvoss.pillarstrength.user.profile.dto;

import java.util.UUID;

public record UserDto(
        UUID id,
        String email,
        String username,
        String firstName,
        String lastName,
        String displayName,
        boolean onboardingComplete
) {
}