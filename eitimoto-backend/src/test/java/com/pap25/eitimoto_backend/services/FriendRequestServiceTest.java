package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.mapper.FriendRequestMapper;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FriendRequestServiceTest {

    @Mock
    private FriendRequestRepository friendRequestRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserContextService userContextService;
    @Mock
    private FriendRequestMapper friendRequestMapper;

    @InjectMocks
    private FriendRequestService service;

    @Test
    void createInvitation_ShouldSaveAndReturnDto_WhenValid() {
        // Arrange
        String targetUsername = "target";
        User sender = new User();
        sender.setUsername("sender");
        User receiver = new User();
        receiver.setUsername(targetUsername);

        when(userContextService.getCurrentUser()).thenReturn(sender);
        when(userRepository.findByUsername(targetUsername)).thenReturn(Optional.of(receiver));

        when(friendRequestRepository.existsBySenderAndReceiver(sender, receiver)).thenReturn(false);
        when(friendRequestRepository.existsBySenderAndReceiver(receiver, sender)).thenReturn(false);

        when(friendRequestMapper.toDto(any(FriendRequest.class))).thenReturn(new FriendRequestResponseDto());

        // Act
        FriendRequestResponseDto result = service.createInvitation(targetUsername);

        // Assert
        assertNotNull(result);
        verify(friendRequestRepository).save(any(FriendRequest.class));
    }

    @Test
    void createInvitation_ShouldThrowException_WhenSendingToSelf() {
        // Arrange
        User sender = new User();
        sender.setUsername("sender");
        when(userContextService.getCurrentUser()).thenReturn(sender);

        // Act & Assert
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
            () -> service.createInvitation("sender"));
        assertEquals("you can't send invitation to yourself", ex.getMessage());
    }

    @Test
    void acceptInvitation_ShouldUpdateStatus_WhenFound() {
        // Arrange
        String senderUsername = "sender";
        User receiver = new User();
        receiver.setUsername("receiver");

        FriendRequest request = new FriendRequest();
        request.setStatus(FriendshipStatus.PENDING);

        when(userContextService.getCurrentUser()).thenReturn(receiver);
        when(friendRequestRepository.findBySenderUsernameAndReceiverUsernameAndStatus(
                senderUsername, "receiver", FriendshipStatus.PENDING))
                .thenReturn(Optional.of(request));

        when(friendRequestMapper.toDto(any())).thenReturn(new FriendRequestResponseDto());

        // Act
        service.acceptInvitation(senderUsername);

        // Assert
        assertEquals(FriendshipStatus.ACCEPTED, request.getStatus());
        verify(friendRequestRepository).save(request);
    }
}
