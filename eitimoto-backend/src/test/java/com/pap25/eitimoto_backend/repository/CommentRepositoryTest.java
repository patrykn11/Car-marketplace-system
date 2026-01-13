package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(com.pap25.eitimoto_backend.TestContainersConfig.class)
@Transactional
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindParentsAndChildren() {
        User user = User.builder()
                .username("commentuser")
                .password("password")
                .email("comment@example.com")
                .contactNumber("999888777")
                .location("Warsaw")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("Fiat")
                .carModel("Panda")
                .carBodyType("Hatchback")
                .productionYear(2010)
                .price(10000)
                .mileage(100000)
                .fuelType("Petrol")
                .transmission("Manual")
                .power(60)
                .carColor("White")
                .engineCapacity(1.2)
                .build();

        Advertisement ad = Advertisement.builder()
                .title("Cheap Panda")
                .description("Good car")
                .location("Warsaw")
                .user(user)
                .car(car)
                .build();
        advertisementRepository.save(ad);

        Comment parentComment = new Comment();
        parentComment.setContent("Is this still available?");
        // parentComment.setUser(user); // Entity does not have User
        parentComment.setAdvertisement(ad);
        commentRepository.save(parentComment);

        Comment childComment = new Comment();
        childComment.setContent("Yes, it is.");
        // childComment.setUser(user); // Entity does not have User
        childComment.setAdvertisement(ad);
        childComment.setParent(parentComment);
        commentRepository.save(childComment);

        List<Comment> parents = commentRepository.findParents(ad.getAdvertisementId());
        assertEquals(1, parents.size());
        assertEquals("Is this still available?", parents.get(0).getContent());

        List<Comment> children = commentRepository.findChildren(parents.get(0).getId());
        assertEquals(1, children.size());
        assertEquals("Yes, it is.", children.get(0).getContent());
    }
}
