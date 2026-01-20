package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.auth.AuthRequest;
import com.pap25.eitimoto_backend.auth.AuthResponse;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service responsible for user authentication and registration.
 * Handles user registration with password encoding and login
 * with JWT token generation.
 */
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    /**
     * Register a new user in the system.
     * Encodes the password and generates a JWT token upon successful registration.
     *
     * @param request the authentication request containing user details
     * @return authentication response with JWT token and user info
     * @throws RuntimeException if username is already taken
     */
    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setContactNumber(request.getContactNumber());
        user.setLocation(request.getLocation());

        user.setRole(Role.USER);

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .email(user.getEmail())
                .contactNumber(user.getContactNumber())
                .location(user.getLocation())
                .build();
    }

    /**
     * Authenticate a user and generate a JWT token.
     * Validates credentials using Spring Security's AuthenticationManager.
     *
     * @param request the authentication request containing username and password
     * @return authentication response with JWT token and user info
     * @throws RuntimeException if user is not found or credentials are invalid
     */
    public AuthResponse login(AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .email(user.getEmail())
                .contactNumber(user.getContactNumber())
                .location(user.getLocation())
                .build();
    }
}
