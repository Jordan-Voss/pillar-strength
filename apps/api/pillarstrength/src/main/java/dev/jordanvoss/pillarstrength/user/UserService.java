package dev.jordanvoss.pillarstrength.user;

import dev.jordanvoss.pillarstrength.user.dto.MeResponse;
import dev.jordanvoss.pillarstrength.user.dto.PreferencesDto;
import dev.jordanvoss.pillarstrength.user.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
@Service
public class UserService {

    private final UserProfileRepository userProfileRepository;

    public UserService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
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

        if (profile.getEmail() == null && email != null) {
            profile.setEmail(email);
        }

        UserProfile savedProfile = userProfileRepository.save(profile);

        return new MeResponse(
                new UserDto(
                        savedProfile.getId(),
                        savedProfile.getEmail(),
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
}