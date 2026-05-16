package dev.jordanvoss.pillarstrength.user.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SupabaseAdminUserResponse(
        SupabaseAdminUser user
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record SupabaseAdminUser(
            String id,
            String email
    ) {
    }
}