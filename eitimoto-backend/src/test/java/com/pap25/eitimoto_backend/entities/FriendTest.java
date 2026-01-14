package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FriendTest {

    @Test
    void builder_ShouldConstructValidFriend() {
        User u1 = User.builder().username("User1").build();
        User u2 = User.builder().username("User2").build();

        Friend friend = Friend.builder()
                .id(1L)
                .user(u1)
                .friend(u2)
                .status(FriendshipStatus.ACCEPTED)
                .build();

        assertNotNull(friend);
        assertEquals("User1", friend.getUser().getUsername());
        assertEquals("User2", friend.getFriend().getUsername());
        assertEquals(FriendshipStatus.ACCEPTED, friend.getStatus());
    }
}
