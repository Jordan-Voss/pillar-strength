package dev.jordanvoss.pillarstrength.user.auth;

import dev.jordanvoss.pillarstrength.user.auth.dto.LoginRequest;
import dev.jordanvoss.pillarstrength.user.auth.dto.LoginResponse;
import dev.jordanvoss.pillarstrength.user.auth.dto.UsernameAvailabilityResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserAuthController {

    private final UserAuthService userAuthService;

    public UserAuthController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userAuthService.login(request);
    }

    @ExceptionHandler(InvalidLoginException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleInvalidLogin(InvalidLoginException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    public record ErrorResponse(String message) {
    }

    @GetMapping("/username-availability")
    public UsernameAvailabilityResponse checkUsernameAvailability(
            @RequestParam String username
    ) {
        return userAuthService.checkUsernameAvailability(username);
    }
}