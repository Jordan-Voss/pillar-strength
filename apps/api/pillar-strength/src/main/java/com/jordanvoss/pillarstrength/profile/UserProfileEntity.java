package com.jordanvoss.pillarstrength.profile;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserProfileEntity {

    @Id
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "units", nullable = false)
    private Units units;

    @Enumerated(EnumType.STRING)
    @Column(name = "e1rm_formula", nullable = false)
    private E1rmFormula e1rmFormula;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme", nullable = false)
    private Theme theme;

    public UUID getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Units getUnits() { return units; }
    public E1rmFormula getE1rmFormula() { return e1rmFormula; }
    public Theme getTheme() { return theme; }
}
