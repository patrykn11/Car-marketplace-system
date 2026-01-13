package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserContextServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private FriendRequestRepository friendRequestRepository;

    @InjectMocks
    private UserContextService userContextService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void getCurrentUser_ShouldReturnUser_WhenPrincipalIsUserObj() {
        // Arrange
        User principalUser = new User();
        principalUser.setUsername("testUser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(principalUser);
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(principalUser));

        // Act
        User result = userContextService.getCurrentUser();

        // Assert
        assertEquals("testUsesr", result.getUsername());
    }

    @Test
    void getCurrentUser_ShouldReturnUser_WhenPrincipalIsString() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn("testUser");

        User user = new User();
        user.setUsername("testUser");
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));

        // Act
        User result = userContextService.getCurrentUser();

        // Assert
        assertEquals("testUser", result.getUsername());
    }

    @Test
    void getCurrentUser_ShouldThrowException_WhenUserNotFound() {
        // Arrange
         when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn("unknownUser");
        when(userRepository.findByUsername("unknownUser")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> userContextService.getCurrentUser());
    }

    @Test
    void getFriends_ShouldReturnFlattenedSetOfFriends() {
        // Arrange
        // Mock getCurrentUser flow
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn("testUser");

        User me = new User();
        me.setUsername("testUser");
        me.setId(1L);
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(me));

        User friend1 = new User();
        friend1.setId(2L);
        User friend2 = new User();
        friend2.setId(3L);

        FriendRequest req1 = new FriendRequest();
        req1.setSender(me);
        req1.setReceiver(friend1);

        FriendRequest req2 = new FriendRequest();
        req2.setSender(friend2);
        req2.setReceiver(me);

        when(friendRequestRepository.findAllByUserAndStatus("testUser", FriendshipStatus.ACCEPTED))
                .thenReturn(List.of(req1, req2));

        // Act
        Set<User> friends = userContextService.getFriends();

        // Assert
        assertEquals(2, friends.size());
        assertTrue(friends.contains(friend1));
        assertTrue(friends.contains(friend2));
        assertFalse(friends.contains(me));
    }
}
