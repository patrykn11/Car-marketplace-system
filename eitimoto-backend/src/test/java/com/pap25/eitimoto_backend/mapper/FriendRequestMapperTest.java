package com.pap25.eitimoto_backend.mapper;

import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FriendRequestMapperTest {

    private final FriendRequestMapper friendRequestMapper = new FriendRequestMapper();

    @Test
    void toDto_ShouldMapFieldsAndHidePrivateInfo() {
        User sender = User.builder()
                .username("sender")
                .email("s@example.com")
                .contactNumber("111")
                .location("Loc1")
                .build();

        User receiver = User.builder()
                .username("receiver")
                .email("r@example.com")
                .contactNumber("222")
                .location("Loc2")
                .build();

        FriendRequest request = FriendRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .build();

        FriendRequestResponseDto dto = friendRequestMapper.toDto(request);

        assertEquals(FriendshipStatus.PENDING, dto.getStatus());

        assertNotNull(dto.getSender());
        assertEquals("sender", dto.getSender().getUsername());
        assertNull(dto.getSender().getEmail());
        assertNull(dto.getSender().getContactNumber());
        assertNull(dto.getSender().getLocation());

        assertNotNull(dto.getReceiver());
        assertEquals("receiver", dto.getReceiver().getUsername());
        assertNull(dto.getReceiver().getEmail());
        assertNull(dto.getReceiver().getContactNumber());
        assertNull(dto.getReceiver().getLocation());
    }
}
