package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.auth.AuthRequest;
import com.pap25.eitimoto_backend.auth.AuthResponse;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JWTService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @Test
    void testRegister() {
        AuthRequest request = new AuthRequest();
        request.setUsername("testuser");
        request.setPassword("password");

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        AuthResponse response = authService.register(request);

        assertThat(response.getToken()).isEqualTo("jwtToken");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_UserAlreadyExists() {
        AuthRequest request = new AuthRequest();
        request.setUsername("existinguser");
        request.setPassword("password");

        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Username already taken");

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLogin() {
        AuthRequest request = new AuthRequest();
        request.setUsername("testuser");
        request.setPassword("password");

        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsername("testuser")).thenReturn(java.util.Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwtToken");

        AuthResponse response = authService.login(request);

        assertThat(response.getToken()).isEqualTo("jwtToken");
    }

    @Test
    void testLogin_InvalidCredentials() {
        AuthRequest request = new AuthRequest();
        request.setUsername("mockusr");
        request.setPassword("wrongpassword");

        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("User not found");
    }

    @Test
    void testGenerateToken() {
        User user = new User();
        user.setUsername("testuser");

        when(jwtService.generateToken(user)).thenReturn("jwtToken");

        String token = jwtService.generateToken(user);

        assertThat(token).isEqualTo("jwtToken");
    }

    @Test
    void testEncodePassword() {
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        String encoded = passwordEncoder.encode("password");

        assertThat(encoded).isEqualTo("encodedPassword");
    }

    @Test
    void testPasswordMatches() {
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(true);

        boolean matches = passwordEncoder.matches("rawPassword", "encodedPassword");

        assertThat(matches).isTrue();
    }

    @Test
    void testPasswordDoesNotMatch() {
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(false);

        boolean matches = passwordEncoder.matches("rawPassword", "encodedPassword");

        assertThat(matches).isFalse();
    }
}
