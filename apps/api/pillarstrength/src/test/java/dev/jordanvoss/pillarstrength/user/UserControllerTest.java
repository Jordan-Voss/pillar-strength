package dev.jordanvoss.pillarstrength.user;

import dev.jordanvoss.pillarstrength.config.SecurityConfig;
import dev.jordanvoss.pillarstrength.user.profile.dto.MeResponse;
import dev.jordanvoss.pillarstrength.user.profile.dto.PreferencesDto;
import dev.jordanvoss.pillarstrength.user.profile.dto.UserDto;
import dev.jordanvoss.pillarstrength.user.profile.E1rmFormula;
import dev.jordanvoss.pillarstrength.user.profile.Units;
import dev.jordanvoss.pillarstrength.user.profile.UserController;
import dev.jordanvoss.pillarstrength.user.profile.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Test
    void meReturnsUser() throws Exception {
        UUID userId = UUID.randomUUID();

        when(userService.getOrCreateMe(any(Jwt.class)))
                .thenReturn(new MeResponse(
                        new UserDto(userId, "test@example.com", null, false),
                        new PreferencesDto("system", "Europe/Dublin", Units.METRIC, E1rmFormula.EPLEY)
                ));

        mockMvc.perform(get("/api/v1/me").with(jwt().jwt(jwt -> jwt
                        .subject(userId.toString())
                        .claim("email", "test@example.com")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(3600))
                        .headers(headers -> headers.put("alg", "ES256"))
                )))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.id").value(userId.toString()))
                .andExpect(jsonPath("$.user.email").value("test@example.com"));
    }
}