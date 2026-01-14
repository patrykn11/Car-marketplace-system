package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class AdvertisementRepositoryTest {

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByUserId_ShouldReturnAds() {
        User user = User.builder()
                .username("aduser")
                .password("pass")
                .email("aduser@example.com")
                .contactNumber("123")
                .location("Loc")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("BMW")
                .carModel("X5")
                .carBodyType("SUV")
                .productionYear(2020)
                .price(50000)
                .mileage(10000)
                .fuelType("Diesel")
                .transmission("Automatic")
                .power(200)
                .carColor("Black")
                .engineCapacity(2.0)
                .build();

        Advertisement ad = Advertisement.builder()
                .title("Test Ad")
                .description("Desc")
                .location("Loc")
                .car(car)
                .user(user)
                .build();

        advertisementRepository.save(ad);

        List<Advertisement> result = advertisementRepository.findByUserId(user.getId());

        assertEquals(1, result.size());
        assertEquals("Test Ad", result.get(0).getTitle());
    }

    @Test
    void findRecommendationsByBrand_ShouldReturnMatchingAds() {
        User user = User.builder()
                .username("recouser")
                .password("pass")
                .email("reco@example.com")
                .contactNumber("123")
                .location("Loc")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("Audi")
                .carModel("A4")
                .carBodyType("Sedan")
                .productionYear(2018)
                .price(30000)
                .mileage(50000)
                .fuelType("Petrol")
                .transmission("Manual")
                .power(150)
                .carColor("White")
                .engineCapacity(1.8)
                .build();

        Advertisement ad = Advertisement.builder()
                .title("Audi Ad")
                .description("Desc")
                .location("Loc")
                .car(car)
                .user(user)
                .build();

        List<Double> embedding = new ArrayList<>(Collections.nCopies(1536, 0.5));
        ad.setEmbedding(embedding);

        advertisementRepository.save(ad);

        List<Advertisement> result = advertisementRepository.findRecommendationsByBrand(
                "Audi", List.of(-1L), Pageable.ofSize(10)
        );

        assertFalse(result.isEmpty());
        assertEquals("Audi Ad", result.get(0).getTitle());
    }
}
