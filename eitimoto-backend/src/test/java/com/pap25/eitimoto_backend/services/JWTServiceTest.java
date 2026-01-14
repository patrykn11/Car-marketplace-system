package com.pap25.eitimoto_backend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JWTServiceTest {

    private JWTService jwtService;

    @Mock
    private UserDetails userDetails;

    // Must match the secret in JWTService
    private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    @BeforeEach
    void setUp() {
        jwtService = new JWTService();
    }

    @Test
    void generateToken_ShouldGenerateValidToken() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");

        // Act
        String token = jwtService.generateToken(userDetails);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void extractUsername_ShouldReturnCorrectUsername() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");
        String token = jwtService.generateToken(userDetails);

        // Act
        String username = jwtService.extractUsername(token);

        // Assert
        assertEquals("testUser", username);
    }

    @Test
    void isTokenValid_ShouldReturnTrueForValidToken() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");
        String token = jwtService.generateToken(userDetails);

        // Act
        boolean isValid = jwtService.isTokenValid(token, userDetails);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void isTokenValid_ShouldReturnFalseForInvalidUser() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");
        String token = jwtService.generateToken(userDetails);

        UserDetails otherUser = org.mockito.Mockito.mock(UserDetails.class);
        when(otherUser.getUsername()).thenReturn("otherUser");

        // Act
        boolean isValid = jwtService.isTokenValid(token, otherUser);

        // Assert
        assertFalse(isValid);
    }
}
