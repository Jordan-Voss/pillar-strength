package dev.jordanvoss.pillarstrength.user.profile;

import dev.jordanvoss.pillarstrength.user.profile.dto.MeResponse;
import dev.jordanvoss.pillarstrength.user.profile.dto.PreferencesDto;
import dev.jordanvoss.pillarstrength.user.profile.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class UserService {

    private final UserProfileRepository userProfileRepository;
    private final UserHandleRepository userHandleRepository;

    public UserService(
            UserProfileRepository userProfileRepository,
            UserHandleRepository userHandleRepository
    ) {
        this.userProfileRepository = userProfileRepository;
        this.userHandleRepository = userHandleRepository;
    }

    @Transactional
    public MeResponse getOrCreateMe(Jwt jwt) {
        if (jwt == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Missing JWT"
            );
        }

        UUID userId = UUID.fromString(jwt.getSubject());
        String email = jwt.getClaimAsString("email");

        UserProfile profile = userProfileRepository.findById(userId)
                .orElseGet(() -> {
                    UserProfile newProfile = new UserProfile();
                    newProfile.setId(userId);
                    newProfile.setEmail(email);
                    newProfile.setOnboardingComplete(false);
                    newProfile.setTheme("system");
                    newProfile.setTimezone("Europe/Dublin");
                    newProfile.setUnits(Units.METRIC);
                    newProfile.setE1rmFormula(E1rmFormula.EPLEY);
                    return newProfile;
                });

        if (email != null && !email.equals(profile.getEmail())) {
            profile.setEmail(email);
        }

        if (profile.getDisplayName() == null || profile.getDisplayName().isBlank()) {
            profile.setDisplayName(resolveDisplayName(profile, email));
        }

        UserProfile savedProfile = userProfileRepository.save(profile);

        String username = userHandleRepository.findById(userId)
                .map(UserHandle::getUsername)
                .orElse(null);

        return new MeResponse(
                new UserDto(
                        savedProfile.getId(),
                        savedProfile.getEmail(),
                        username,
                        savedProfile.getFirstName(),
                        savedProfile.getLastName(),
                        savedProfile.getDisplayName(),
                        savedProfile.isOnboardingComplete()
                ),
                new PreferencesDto(
                        savedProfile.getTheme(),
                        savedProfile.getTimezone(),
                        savedProfile.getUnits(),
                        savedProfile.getE1rmFormula()
                )
        );
    }

    private String resolveDisplayName(UserProfile profile, String email) {
        String fullName = joinName(profile.getFirstName(), profile.getLastName());

        if (!fullName.isBlank()) {
            return fullName;
        }

        if (email != null && email.contains("@")) {
            return email.substring(0, email.indexOf("@"));
        }

        return "Athlete";
    }

    private String joinName(String firstName, String lastName) {
        String safeFirstName = firstName == null ? "" : firstName.trim();
        String safeLastName = lastName == null ? "" : lastName.trim();

        return (safeFirstName + " " + safeLastName).trim();
    }
}