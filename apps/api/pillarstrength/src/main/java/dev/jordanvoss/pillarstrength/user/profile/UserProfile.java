package dev.jordanvoss.pillarstrength.user.profile;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "onboarding_complete", nullable = false)
    private boolean onboardingComplete;

    @Column(nullable = false)
    private String theme;

    @Column(nullable = false)
    private String timezone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Units units;

    @Enumerated(EnumType.STRING)
    @Column(name = "e1rm_formula", nullable = false)
    private E1rmFormula e1rmFormula;
}