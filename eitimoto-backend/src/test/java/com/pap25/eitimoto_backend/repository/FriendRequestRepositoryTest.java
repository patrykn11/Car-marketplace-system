package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class FriendRequestRepositoryTest {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void existsBySenderUsernameAndReceiverUsernameAndStatus_ShouldReturnTrue() {
        User sender = User.builder().username("sender").password("p").email("s@e.com").contactNumber("1").location("l").role(Role.USER).build();
        User receiver = User.builder().username("receiver").password("p").email("r@e.com").contactNumber("1").location("l").role(Role.USER).build();
        userRepository.save(sender);
        userRepository.save(receiver);

        FriendRequest request = FriendRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .status(FriendshipStatus.PENDING)
                .build();
        friendRequestRepository.save(request);

        boolean exists = friendRequestRepository.existsBySenderUsernameAndReceiverUsernameAndStatus(
                "sender", "receiver", FriendshipStatus.PENDING
        );

        assertTrue(exists);
    }
}
