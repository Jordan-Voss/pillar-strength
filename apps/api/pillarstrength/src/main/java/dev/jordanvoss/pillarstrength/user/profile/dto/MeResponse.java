package dev.jordanvoss.pillarstrength.user.profile.dto;

public record MeResponse(
        UserDto user,
        PreferencesDto preferences
) {
}