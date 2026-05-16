package dev.jordanvoss.pillarstrength.user.profile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "user_handles")
public class UserHandle {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;
}