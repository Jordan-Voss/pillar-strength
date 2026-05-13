package dev.jordanvoss.pillarstrength.user.dto;

public record MeResponse(
        UserDto user,
        PreferencesDto preferences
) {
}