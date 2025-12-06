package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User; // <--- TEGO BRAKOWAŁO!
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    Optional<FriendRequest> findBySenderAndReceiver(User sender, User receiver);
    boolean existsBySenderAndReceiver(User sender, User receiver);
    boolean existsBySenderAndReceiverAndStatus(User sender, User receiver, FriendshipStatus status);
    Optional<FriendRequest> findBySenderUsernameAndReceiverUsernameAndStatus(
            String senderUsername, String receiverUsername, FriendshipStatus status);
    List<FriendRequest> findAllByReceiverId(Long Id);
    List<FriendRequest> findAllBySender_Username(String username);

}