package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserContextService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User) {
            String username = ((User) principal).getUsername();
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            if (principal instanceof String) {
                return userRepository.findByUsername((String) principal)
                        .orElseThrow(() -> new RuntimeException("User not found"));
            }
            throw new RuntimeException("User not authenticated");
        }
    }
}