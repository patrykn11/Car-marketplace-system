package com.pap25.eitimoto_backend.auth;

import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public String register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        var user = new com.pap25.eitimoto_backend.entities.User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(AuthRequest request) {
        var authToken = new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword());

        authenticationManager.authenticate(authToken);

        return "User logged in successfully";
    }

}
