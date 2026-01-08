package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserContextService {

    private final UserRepository userRepository;
    private final FriendRequestRepository friendRequestRepository;
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

    public Set<User> getFriends() {
        User user = getCurrentUser();
        List<FriendRequest> friends = friendRequestRepository.findAllByUserAndStatus(user.getUsername(), FriendshipStatus.ACCEPTED);
        Set<User> allFriends = new HashSet<>();
        
        for (FriendRequest friend : friends) {
            allFriends.add(friend.getSender());
            allFriends.add(friend.getReceiver());
        }
        allFriends.remove(user);

        return allFriends;
        }

    }

