package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.mapper.FriendRequestMapper;
@Service
@RequiredArgsConstructor
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final UserRepository userRepository;
    private final UserContextService userContextService;
    private final FriendRequestMapper friendRequestMapper;

    public List<UserProfileResponseDto> getUserInvitations() {
        Long userId = userContextService.getCurrentUser().getId();

        List<FriendRequest> invitations =
                friendRequestRepository.findAllByReceiverIdAndStatus(userId, FriendshipStatus.PENDING);


        return invitations.stream()
                .map(invitation ->
                        UserProfileResponseDto.builder()
                                .username(invitation.getSender().getUsername())
                                .email(null)
                                .contactNumber(null)
                                .location(null)
                                .build()
                )
                .collect(Collectors.toList());
    }

    public List<UserProfileResponseDto> getUserFriends() {
        Set<User> friends = userContextService.getFriends();
        return friends.stream()
                .map(friend -> UserProfileResponseDto.builder()
                        .username(friend.getUsername())
                        .email(null)
                        .contactNumber(null)
                        .location(null)
                        .build())
                .collect(Collectors.toList());
    }

    public FriendRequestResponseDto createInvitation(String username) {
        User sender = userContextService.getCurrentUser();

        if (sender.getUsername().equals(username)) {
            throw new IllegalArgumentException("you can't send invitation to yourself");
        }

        User receiver = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("user does not exist"));

        boolean alreadyRequested = friendRequestRepository.existsBySenderAndReceiver(sender, receiver);
        boolean alreadyRequested2 = friendRequestRepository.existsBySenderAndReceiver(receiver, sender);
        if (alreadyRequested || alreadyRequested2) {
            throw new IllegalArgumentException("this invitation already exists");
        }

        boolean alreadyFriends = friendRequestRepository.existsBySenderAndReceiverAndStatus(sender, receiver, FriendshipStatus.ACCEPTED) ||
                friendRequestRepository.existsBySenderAndReceiverAndStatus(receiver, sender, FriendshipStatus.ACCEPTED);
        if (alreadyFriends) {
            throw new IllegalArgumentException("that person is your friend");
        }

        FriendRequest friendRequest = FriendRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .build();

        friendRequestRepository.save(friendRequest);

        return friendRequestMapper.toDto(friendRequest);
    }
    public FriendRequestResponseDto acceptInvitation(String senderUsername) {
        User receiver = userContextService.getCurrentUser();

        FriendRequest invitation = friendRequestRepository
                .findBySenderUsernameAndReceiverUsernameAndStatus(
                        senderUsername, receiver.getUsername(), FriendshipStatus.PENDING)
                .orElseThrow(() -> new IllegalArgumentException("Pending invitation not found from user: " + senderUsername));

        invitation.setStatus(FriendshipStatus.ACCEPTED);
        friendRequestRepository.save(invitation);

        return friendRequestMapper.toDto(invitation);
    }

    public void declineInvitation(String senderUsername) {
        User receiver = userContextService.getCurrentUser();

        FriendRequest invitation = friendRequestRepository
                .findBySenderUsernameAndReceiverUsernameAndStatus(
                        senderUsername, receiver.getUsername(), FriendshipStatus.PENDING)
                .orElseThrow(() -> new IllegalArgumentException("Pending invitation not found from user: " + senderUsername));

        friendRequestRepository.delete(invitation);
    }

    public boolean hasPendingInvitationFromUser(String senderUsername) {
        String currentUsername = userContextService.getCurrentUser().getUsername();

        return friendRequestRepository.existsBySenderUsernameAndReceiverUsernameAndStatus(
                senderUsername,
                currentUsername,
                FriendshipStatus.PENDING
        );
    }

    public boolean hasAcceptedInvitationFromUser(String senderUsername) {
        String currentUsername = userContextService.getCurrentUser().getUsername();
        boolean condition1 = friendRequestRepository.existsBySenderUsernameAndReceiverUsernameAndStatus(
                senderUsername,
                currentUsername,
                FriendshipStatus.ACCEPTED
        );
        boolean condition2 = friendRequestRepository.existsBySenderUsernameAndReceiverUsernameAndStatus(
                currentUsername,
                senderUsername,
                FriendshipStatus.ACCEPTED
        );
        return condition1 || condition2;
    }

    public boolean hasSentInvitationToUser(String targetUsername) {
        String currentUsername = userContextService.getCurrentUser().getUsername();

        return friendRequestRepository.existsBySenderUsernameAndReceiverUsernameAndStatus(
                currentUsername,
                targetUsername,
                FriendshipStatus.PENDING
        );
    }

}
