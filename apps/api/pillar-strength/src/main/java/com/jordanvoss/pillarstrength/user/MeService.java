package com.jordanvoss.pillarstrength.user;

import com.jordanvoss.pillarstrength.profile.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MeService {

    private final UserProfileRepository repo;

    public MeService(UserProfileRepository repo) {
        this.repo = repo;
    }

    public MeResponse getMe(UUID userId) {
        var profile = repo.findByUserId(userId)
                .orElseThrow(() -> new IllegalStateException("Profile not found for user"));

        return new MeResponse(
                profile.getUserId(),
                profile.getFirstName(),
                profile.getLastName(),
                profile.getUnits(),
                profile.getE1rmFormula(),
                profile.getTheme()
        );
    }
}
