package com.jordanvoss.pillarstrength.me;

import com.jordanvoss.pillarstrength.profile.*;
import com.jordanvoss.pillarstrength.user.MeController;
import com.jordanvoss.pillarstrength.user.MeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MeController.class)
@Import({MeService.class, MeSecurityTestConfig.class})
class MeControllerTest {

    @Autowired MockMvc mvc;

    @MockitoBean
    UserProfileRepository repo;

    @Test
    void me_returns401_whenNoToken() throws Exception {
        mvc.perform(get("/v1/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void me_returns200_whenJwtPresent() throws Exception {
        var id = UUID.randomUUID();

        var profile = new UserProfileEntity(
                id, "Jordan", "Voss", Units.METRIC, E1rmFormula.EPLEY, Theme.SYSTEM
        );

        when(repo.findByUserId(id)).thenReturn(Optional.of(profile));

        mvc.perform(get("/v1/me")
                        .with(jwt().jwt(j -> j.subject(id.toString()))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(id.toString()))
                .andExpect(jsonPath("$.units").value("METRIC"))
                .andExpect(jsonPath("$.e1rmFormula").value("EPLEY"));
    }
}
