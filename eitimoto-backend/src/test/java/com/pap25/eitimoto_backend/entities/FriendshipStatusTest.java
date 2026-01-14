package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FriendshipStatusTest {
    @Test
    void enumValues_ShouldBeCorrect() {
        assertEquals("PENDING", FriendshipStatus.PENDING.name());
        assertEquals("ACCEPTED", FriendshipStatus.ACCEPTED.name());
    }
}
