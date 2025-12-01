package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JWTServiceTest {

    private JWTService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JWTService();
    }

    @Test
    void testGenerateAndExtractUsernameFromToken() {
        User user = User.builder().username("testuser").role(Role.USER).build();

        String token = jwtService.generateToken(user);
        String extractedUsername = jwtService.extractUsername(token);

        assertThat(token).isNotNull();
        assertThat(extractedUsername).isEqualTo("testuser");
    }

    @Test
    void testValidateTokenSuccessfully() {
        User user = User.builder().username("validUser").role(Role.USER).build();
        String token = jwtService.generateToken(user);

        boolean isValid = jwtService.isTokenValid(token, user);

        assertThat(isValid).isTrue();
    }

    @Test
    void testReturnFalseForInvalidUser() {
        User user1 = User.builder().username("user1").role(Role.USER).build();
        User user2 = User.builder().username("user2").role(Role.USER).build();
        String token = jwtService.generateToken(user1);

        boolean isValid = jwtService.isTokenValid(token, user2);

        assertThat(isValid).isFalse();
    }
}
