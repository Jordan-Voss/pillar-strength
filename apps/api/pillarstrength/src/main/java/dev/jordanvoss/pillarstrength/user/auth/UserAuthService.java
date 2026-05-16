package dev.jordanvoss.pillarstrength.user.auth;

import dev.jordanvoss.pillarstrength.user.auth.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Locale;
import java.util.UUID;

@Service
public class UserAuthService {

    private final RestClient restClient;
    private final UserAuthRepository userAuthRepository;
    private final String supabaseAnonKey;
    private final String supabaseServiceRoleKey;
    private static final String USERNAME_REGEX = "^[A-Za-z0-9_]{3,20}$";

    public UserAuthService(
            @Value("${supabase.project-url}") String supabaseProjectUrl,
            @Value("${supabase.anon-key}") String supabaseAnonKey,
            @Value("${supabase.service-role-key}") String supabaseServiceRoleKey,
            UserAuthRepository userAuthRepository
    ) {
        this.restClient = RestClient.builder()
                .baseUrl(supabaseProjectUrl)
                .build();
        this.supabaseAnonKey = supabaseAnonKey;
        this.supabaseServiceRoleKey = supabaseServiceRoleKey;
        this.userAuthRepository = userAuthRepository;
    }

    public LoginResponse login(LoginRequest request) {
        String identifier = normaliseIdentifier(request.identifier());

        String email = identifier.contains("@")
                ? identifier.toLowerCase(Locale.ROOT)
                : resolveEmailFromUsername(identifier);

        SupabaseTokenResponse tokenResponse = passwordGrant(email, request.password());

        if (tokenResponse == null || tokenResponse.accessToken() == null || tokenResponse.refreshToken() == null) {
            throw new InvalidLoginException();
        }

        return new LoginResponse(
                tokenResponse.accessToken(),
                tokenResponse.refreshToken(),
                tokenResponse.expiresIn(),
                tokenResponse.tokenType()
        );
    }

    private String resolveEmailFromUsername(String username) {
        validateUsername(username);

        UUID userId = userAuthRepository.findUserIdByUsername(username)
                .orElseThrow(InvalidLoginException::new);

        SupabaseAdminUserResponse response = restClient
                .get()
                .uri("/auth/v1/admin/users/{userId}", userId)
                .header("apikey", supabaseServiceRoleKey)
                .header("Authorization", "Bearer " + supabaseServiceRoleKey)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw new InvalidLoginException();
                })
                .body(SupabaseAdminUserResponse.class);

        String email = response != null && response.user() != null
                ? response.user().email()
                : null;

        if (email == null || email.isBlank()) {
            throw new InvalidLoginException();
        }

        return email;
    }

    private SupabaseTokenResponse passwordGrant(String email, String password) {
        PasswordGrantRequest body = new PasswordGrantRequest(email, password);

        return restClient
                .post()
                .uri("/auth/v1/token?grant_type=password")
                .header("apikey", supabaseAnonKey)
                .header("Content-Type", "application/json")
                .body(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw new InvalidLoginException();
                })
                .body(SupabaseTokenResponse.class);
    }

    private String normaliseIdentifier(String identifier) {
        if (identifier == null) {
            throw new InvalidLoginException();
        }

        String cleaned = identifier.trim();

        if (cleaned.isBlank()) {
            throw new InvalidLoginException();
        }

        return cleaned;
    }

    private void validateUsername(String username) {
        if (!username.matches(USERNAME_REGEX)) {
            throw new InvalidLoginException();
        }
    }

    private record PasswordGrantRequest(
            String email,
            String password
    ) {
    }

    public UsernameAvailabilityResponse checkUsernameAvailability(String username) {
        String cleaned = username == null ? "" : username.trim();

        if (cleaned.isBlank()) {
            return new UsernameAvailabilityResponse(cleaned, false, "Username is required.");
        }

        if (!cleaned.matches(USERNAME_REGEX)) {
            return new UsernameAvailabilityResponse(
                    cleaned,
                    false,
                    "Use 3–20 letters, numbers, or underscores."
            );
        }

        boolean exists = userAuthRepository.usernameExists(cleaned);

        if (exists) {
            return new UsernameAvailabilityResponse(cleaned, false, "Username is already taken.");
        }

        return new UsernameAvailabilityResponse(cleaned, true, "Username is available.");
    }
}