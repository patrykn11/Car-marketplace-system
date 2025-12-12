package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.User; // <--- TEGO BRAKOWAŁO!
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    boolean existsBySenderUsernameAndReceiverUsernameAndStatus(String senderUsername, String receiverUsername, FriendshipStatus status);
    boolean existsBySenderAndReceiver(User sender, User receiver);
    boolean existsBySenderAndReceiverAndStatus(User sender, User receiver, FriendshipStatus status);
    Optional<FriendRequest> findBySenderUsernameAndReceiverUsernameAndStatus(
            String senderUsername, String receiverUsername, FriendshipStatus status);
    List<FriendRequest> findAllByReceiverIdAndStatus(Long Id, FriendshipStatus status);
    @Query("SELECT fr FROM FriendRequest fr WHERE " +
            "(fr.sender.username = :username OR fr.receiver.username = :username) " +
            "AND fr.status = :status")
    List<FriendRequest> findAllByUserAndStatus(@Param("username") String username,
                                               @Param("status") FriendshipStatus status);

}