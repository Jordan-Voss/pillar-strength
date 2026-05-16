package dev.jordanvoss.pillarstrength.user.auth.dto;

public record UsernameAvailabilityResponse(
        String username,
        boolean available,
        String reason
) {
}