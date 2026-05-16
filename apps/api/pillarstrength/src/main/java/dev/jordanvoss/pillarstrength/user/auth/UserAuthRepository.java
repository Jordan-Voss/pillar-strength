package dev.jordanvoss.pillarstrength.user.auth;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class UserAuthRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserAuthRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<UUID> findUserIdByUsername(String username) {
        String sql = """
                select id
                from public.user_handles
                where username_search = lower(?)
                limit 1
                """;

        var results = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> UUID.fromString(rs.getString("id")),
                username
        );

        return results.stream().findFirst();
    }

    public boolean usernameExists(String username) {
        String sql = """
                select exists (
                    select 1
                    from public.user_handles
                    where username_search = lower(?)
                )
                """;

        Boolean exists = jdbcTemplate.queryForObject(sql, Boolean.class, username);
        return Boolean.TRUE.equals(exists);
    }
}