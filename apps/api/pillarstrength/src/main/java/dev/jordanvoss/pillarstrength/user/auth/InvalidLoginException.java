package dev.jordanvoss.pillarstrength.user.auth;

public class InvalidLoginException extends RuntimeException {

    public InvalidLoginException() {
        super("Invalid email, username, or password.");
    }
}