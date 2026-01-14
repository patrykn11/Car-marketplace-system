package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.Comment;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Test
    void findParents_ShouldReturnTopLevelComments() {
        User user = User.builder().username("u").password("p").email("e@e.com").contactNumber("1").location("l").role(Role.USER).build();
        userRepository.save(user);

        Car car = Car.builder().carBrand("B").carModel("M").carBodyType("BT").productionYear(2020).price(1).mileage(1).fuelType("F").transmission("T").power(1).carColor("C").engineCapacity(1.0).build();
        Advertisement ad = Advertisement.builder().title("T").description("D").location("L").car(car).user(user).build();
        advertisementRepository.save(ad);

        Comment parent = Comment.builder().content("Parent").advertisement(ad).build();
        commentRepository.save(parent);

        Comment child = Comment.builder().content("Child").advertisement(ad).parent(parent).build();
        commentRepository.save(child);

        List<Comment> parents = commentRepository.findParents(ad.getAdvertisementId());

        assertEquals(1, parents.size());
        assertEquals("Parent", parents.get(0).getContent());
    }

    @Test
    void findChildren_ShouldReturnReplies() {
        User user = User.builder().username("u2").password("p").email("e2@e.com").contactNumber("1").location("l").role(Role.USER).build();
        userRepository.save(user);

        Car car = Car.builder().carBrand("B").carModel("M").carBodyType("BT").productionYear(2020).price(1).mileage(1).fuelType("F").transmission("T").power(1).carColor("C").engineCapacity(1.0).build();
        Advertisement ad = Advertisement.builder().title("T").description("D").location("L").car(car).user(user).build();
        advertisementRepository.save(ad);

        Comment parent = Comment.builder().content("Parent").advertisement(ad).build();
        commentRepository.save(parent);

        Comment child = Comment.builder().content("Child").advertisement(ad).parent(parent).build();
        commentRepository.save(child);

        List<Comment> children = commentRepository.findChildren(parent.getId());

        assertEquals(1, children.size());
        assertEquals("Child", children.get(0).getContent());
    }
}
