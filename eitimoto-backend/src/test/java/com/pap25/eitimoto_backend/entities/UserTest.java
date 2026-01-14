package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void builder_ShouldConstructValidUser() {
        User user = User.builder()
                .id(1L)
                .username("test_user")
                .email("test@example.com")
                .role(Role.USER)
                .build();

        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("test_user", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals(Role.USER, user.getRole());
    }
}
