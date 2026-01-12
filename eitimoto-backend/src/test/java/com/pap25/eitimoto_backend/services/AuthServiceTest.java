package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.auth.AuthRequest;
import com.pap25.eitimoto_backend.auth.AuthResponse;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JWTService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_ShouldReturnAuthResponse_WhenRequestIsValid() {
        // Arrange
        AuthRequest request = new AuthRequest("user", "password", "email@test.com", "123", "City");
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPass");
        when(jwtService.generateToken(any(User.class))).thenReturn("jwt-token");

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("user", response.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenUsernameTaken() {
        // Arrange
        AuthRequest request = new AuthRequest("user", "password", "email@test.com", "123", "City");
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(true);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_ShouldReturnAuthResponse_WhenCredentialsAreCorrect() {
        // Arrange
        AuthRequest request = new AuthRequest("user", "password", null, null, null);
        User user = new User();
        user.setUsername("user");
        user.setEmail("email@test.com");

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");

        // Act
        AuthResponse response = authService.login(request);

        // Assert
        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }
}
