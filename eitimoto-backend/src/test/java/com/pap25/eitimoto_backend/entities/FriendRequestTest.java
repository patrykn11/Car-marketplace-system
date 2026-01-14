package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FriendRequestTest {

    @Test
    void builder_ShouldConstructValidRequest() {
        User sender = User.builder().username("Sender").build();
        User receiver = User.builder().username("Receiver").build();

        FriendRequest request = FriendRequest.builder()
                .id(1L)
                .sender(sender)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .build();

        assertNotNull(request);
        assertEquals("Sender", request.getSender().getUsername());
        assertEquals("Receiver", request.getReceiver().getUsername());
        assertEquals(FriendshipStatus.PENDING, request.getStatus());
    }
}
